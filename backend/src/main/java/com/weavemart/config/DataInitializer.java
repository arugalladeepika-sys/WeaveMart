package com.weavemart.config;

import com.weavemart.model.Product;
import com.weavemart.model.Role;
import com.weavemart.model.User;
import com.weavemart.repository.ProductRepository;
import com.weavemart.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Demo Weaver
        if (!userRepository.existsByEmail("weaver@weavemart.com")) {
            User demoWeaver = User.builder()
                    .email("weaver@weavemart.com")
                    .password(passwordEncoder.encode("weaver123"))
                    .fullName("Rameshwar Chinta")
                    .phone("+91 98765 43210")
                    .role(Role.WEAVER)
                    .artisanId("IND-WEAVER-7890")
                    .loomType("Frame Loom")
                    .craftRegion("Pochampally (Telangana)")
                    .biography("Master artisan with 28 years of experience weaving Double Ikat silk fabrics.")
                    .idProofType("Government Pehchan Card (Ministry of Textiles)")
                    .idProofDocumentUrl("/api/auth/id-proofs/demo_pehchan.jpg")
                    .verificationStatus("VERIFIED")
                    .address("Weavers Colony, Bhoodan Pochampally, Yadadri Bhuvanagiri, Telangana - 508284")
                    .preferredLanguage("en")
                    .build();
            userRepository.save(demoWeaver);
        }

        // 2. Seed Demo Customer
        if (!userRepository.existsByEmail("customer@weavemart.com")) {
            User demoCustomer = User.builder()
                    .email("customer@weavemart.com")
                    .password(passwordEncoder.encode("customer123"))
                    .fullName("Ananya Sharma")
                    .phone("+91 98123 45678")
                    .role(Role.CUSTOMER)
                    .address("Flat 402, Lotus Towers, Madhapur, Hyderabad, Telangana - 500081")
                    .preferredLanguage("en")
                    .build();
            userRepository.save(demoCustomer);
        }

        // 3. Seed Sample Handloom Products if empty
        if (productRepository.count() == 0) {
            Product p1 = Product.builder()
                    .title("Pochampally Double Ikat Pure Mulberry Silk Saree")
                    .description("Authentic Telia Rumal geometric pattern handcrafted by master weavers in Telangana. Dyed using natural mineral and plant extracts.")
                    .price(new BigDecimal("12450.00"))
                    .fabricMaterial("Pure Mulberry Silk")
                    .weavePattern("Double Ikat")
                    .loomType("Traditional Pit Loom")
                    .craftRegion("Pochampally (Telangana)")
                    .threadCount(120)
                    .careInstructions("Dry Clean Only. Store wrapped in pure muslin cloth.")
                    .stockQuantity(8)
                    .imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80")
                    .weaverId(1L)
                    .weaverName("Rameshwar Chinta")
                    .weaverLocation("Pochampally (Telangana)")
                    .createdAt(LocalDateTime.now())
                    .build();

            Product p2 = Product.builder()
                    .title("Kanchipuram Pure Zari Bridal Silk Fabric")
                    .description("Woven with 3-ply twisted silk yarn and tested silver electroplated zari border. Heavy Korvai interlock technique.")
                    .price(new BigDecimal("18900.00"))
                    .fabricMaterial("Pure Silk")
                    .weavePattern("Korvai Temple Border")
                    .loomType("Jacquard Handloom")
                    .craftRegion("Kanchipuram (Tamil Nadu)")
                    .threadCount(140)
                    .careInstructions("Strictly Dry Clean. Do not iron directly on zari.")
                    .stockQuantity(5)
                    .imageUrl("https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80")
                    .weaverId(1L)
                    .weaverName("Rameshwar Chinta")
                    .weaverLocation("Kanchipuram (Tamil Nadu)")
                    .createdAt(LocalDateTime.now())
                    .build();

            Product p3 = Product.builder()
                    .title("Varanasi Kadwa Katan Brocade Handloom Stole")
                    .description("Extremely fine handloom stole featuring exquisite Kadwa floral motifs where each bootie is engraved individually by hand.")
                    .price(new BigDecimal("6750.00"))
                    .fabricMaterial("Chanderi Silk-Cotton")
                    .weavePattern("Kadwa Floral Jaal")
                    .loomType("Frame Loom")
                    .craftRegion("Varanasi (UP)")
                    .threadCount(100)
                    .careInstructions("Gentle dry clean recommended.")
                    .stockQuantity(12)
                    .imageUrl("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80")
                    .weaverId(1L)
                    .weaverName("Rameshwar Chinta")
                    .weaverLocation("Varanasi (UP)")
                    .createdAt(LocalDateTime.now())
                    .build();

            productRepository.saveAll(List.of(p1, p2, p3));
        }
    }
}
