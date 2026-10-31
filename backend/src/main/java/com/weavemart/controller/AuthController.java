package com.weavemart.controller;

import com.weavemart.model.Role;
import com.weavemart.model.User;
import com.weavemart.repository.UserRepository;
import com.weavemart.security.JwtUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    private final Path idProofStorageLocation = Paths.get("uploads/id_proofs").toAbsolutePath().normalize();

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        try {
            Files.createDirectories(this.idProofStorageLocation);
        } catch (Exception e) {
            System.err.println("Could not create ID proof directory: " + e.getMessage());
        }
    }

    @PostMapping("/upload-id-proof")
    public ResponseEntity<?> uploadIdProof(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Please select a valid ID proof document image."));
        }

        try {
            String uploadedFileName = file.getOriginalFilename();
            String originalFileName = StringUtils.cleanPath(uploadedFileName != null ? uploadedFileName : "id_proof.jpg");
            String fileExtension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i > 0) {
                fileExtension = originalFileName.substring(i);
            }
            String newFileName = "ID_" + UUID.randomUUID().toString() + fileExtension;

            Path targetLocation = this.idProofStorageLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/api/auth/id-proofs/" + newFileName;
            return ResponseEntity.ok(Map.of("documentUrl", fileUrl, "message", "Weaver ID Proof uploaded successfully"));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to store ID proof: " + e.getMessage()));
        }
    }

    @GetMapping("/id-proofs/{filename:.+}")
    public ResponseEntity<Resource> getIdProofDocument(@PathVariable String filename) {
        try {
            Path filePath = this.idProofStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri().toString());

            if (resource.exists() || resource.isReadable()) {
                String contentType = "image/jpeg";
                if (filename.endsWith(".png")) contentType = "image/png";
                if (filename.endsWith(".webp")) contentType = "image/webp";
                if (filename.endsWith(".pdf")) contentType = "application/pdf";

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required!"));
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is required!"));
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already registered!"));
        }

        Role userRole = Role.CUSTOMER;
        if (request.getRole() != null) {
            try {
                userRole = Role.valueOf(request.getRole().toUpperCase());
            } catch (Exception ignored) {}
        }

        // Validate Weaver ID Proof requirement
        if (userRole == Role.WEAVER) {
            if (request.getArtisanId() == null || request.getArtisanId().trim().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Artisan ID / Government Weaver Pehchan Card Number is required to validate weaver profile!"));
            }
        }

        String verificationStatus = (userRole == Role.WEAVER) ? "PENDING_VERIFICATION" : "VERIFIED";

        User user = User.builder()
                .email(normalizedEmail)
                .password(passwordEncoder.encode(request.getPassword().trim()))
                .fullName(request.getFullName() != null ? request.getFullName().trim() : "")
                .phone(request.getPhone() != null ? request.getPhone().trim() : "")
                .role(userRole)
                .artisanId(request.getArtisanId() != null ? request.getArtisanId().trim() : null)
                .loomType(request.getLoomType())
                .craftRegion(request.getCraftRegion())
                .biography(request.getBiography())
                .idProofType(request.getIdProofType() != null && !request.getIdProofType().isBlank() ? request.getIdProofType() : "Government Pehchan Card")
                .idProofDocumentUrl(request.getIdProofDocumentUrl())
                .verificationStatus(verificationStatus)
                .address(request.getAddress())
                .preferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "en")
                .build();

        user = userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name(), user.getId(), user.getFullName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required!"));
        }

        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail).orElse(null);
        if (user == null || !passwordEncoder.matches(request.getPassword().trim(), user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid email or password!"));
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name(), user.getId(), user.getFullName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String fullName;
        private String phone;
        private String role;
        private String artisanId;
        private String loomType;
        private String craftRegion;
        private String biography;
        private String idProofType;
        private String idProofDocumentUrl;
        private String address;
        private String preferredLanguage;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public String getArtisanId() { return artisanId; }
        public void setArtisanId(String artisanId) { this.artisanId = artisanId; }

        public String getLoomType() { return loomType; }
        public void setLoomType(String loomType) { this.loomType = loomType; }

        public String getCraftRegion() { return craftRegion; }
        public void setCraftRegion(String craftRegion) { this.craftRegion = craftRegion; }

        public String getBiography() { return biography; }
        public void setBiography(String biography) { this.biography = biography; }

        public String getIdProofType() { return idProofType; }
        public void setIdProofType(String idProofType) { this.idProofType = idProofType; }

        public String getIdProofDocumentUrl() { return idProofDocumentUrl; }
        public void setIdProofDocumentUrl(String idProofDocumentUrl) { this.idProofDocumentUrl = idProofDocumentUrl; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getPreferredLanguage() { return preferredLanguage; }
        public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
