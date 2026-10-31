package com.weavemart.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    private String fullName;
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Weaver specific attributes
    private String artisanId;
    private String loomType; // e.g. Pit Loom, Frame Loom, Jacquard Handloom
    private String craftRegion; // e.g. Pochampally, Kanchipuram, Varanasi, Bengal
    private String biography;

    // Weaver ID Proof Validation attributes
    private String idProofType; // e.g. Govt Pehchan Card, National Handloom Artisan ID, Cooperative Society ID, Aadhaar Card
    private String idProofDocumentUrl; // Path / URL to uploaded physical ID proof document
    private String verificationStatus; // VERIFIED, PENDING_VERIFICATION, REJECTED

    // Customer & General profile attributes
    private String address;
    private String preferredLanguage; // en, hi, te, ta, bn, kn, mr

    public User() {}

    public User(Long id, String email, String password, String fullName, String phone, Role role,
                String artisanId, String loomType, String craftRegion, String biography,
                String idProofType, String idProofDocumentUrl, String verificationStatus,
                String address, String preferredLanguage) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
        this.artisanId = artisanId;
        this.loomType = loomType;
        this.craftRegion = craftRegion;
        this.biography = biography;
        this.idProofType = idProofType;
        this.idProofDocumentUrl = idProofDocumentUrl;
        this.verificationStatus = verificationStatus;
        this.address = address;
        this.preferredLanguage = preferredLanguage;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String password;
        private String fullName;
        private String phone;
        private Role role;
        private String artisanId;
        private String loomType;
        private String craftRegion;
        private String biography;
        private String idProofType;
        private String idProofDocumentUrl;
        private String verificationStatus;
        private String address;
        private String preferredLanguage;

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder phone(String phone) { this.phone = phone; return this; }
        public UserBuilder role(Role role) { this.role = role; return this; }
        public UserBuilder artisanId(String artisanId) { this.artisanId = artisanId; return this; }
        public UserBuilder loomType(String loomType) { this.loomType = loomType; return this; }
        public UserBuilder craftRegion(String craftRegion) { this.craftRegion = craftRegion; return this; }
        public UserBuilder biography(String biography) { this.biography = biography; return this; }
        public UserBuilder idProofType(String idProofType) { this.idProofType = idProofType; return this; }
        public UserBuilder idProofDocumentUrl(String idProofDocumentUrl) { this.idProofDocumentUrl = idProofDocumentUrl; return this; }
        public UserBuilder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public UserBuilder address(String address) { this.address = address; return this; }
        public UserBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }

        public User build() {
            return new User(id, email, password, fullName, phone, role, artisanId, loomType, craftRegion, biography, idProofType, idProofDocumentUrl, verificationStatus, address, preferredLanguage);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

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

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
}
