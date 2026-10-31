package com.weavemart.service;

import com.weavemart.model.*;
import com.weavemart.repository.OrderRepository;
import com.weavemart.repository.ProductRepository;
import com.weavemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return;
        }

        System.out.println(">>> Seeding initial WeaveMart data (Users, Weaver Products & Orders)...");

        // 1. Create Weaver Accounts
        User weaver1 = User.builder()
                .email("weaver@weavemart.com")
                .password(passwordEncoder.encode("weaver123"))
                .fullName("Rameshwar Chinta")
                .phone("+91 98480 12345")
                .role(Role.WEAVER)
                .artisanId("ART-TS-10492")
                .loomType("Frame Loom & Pit Loom")
                .craftRegion("Pochampally (Telangana)")
                .biography("Award-winning 3rd generation Pochampally Ikat master weaver from Boodhan Pochampally village.")
                .idProofType("Government Pehchan Card")
                .idProofDocumentUrl("https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80")
                .verificationStatus("VERIFIED")
                .address("H.No 4-12, Weaver Street, Boodhan Pochampally, Yadadri Bhuvanagiri Dist, Telangana")
                .preferredLanguage("te")
                .build();
        weaver1 = userRepository.save(weaver1);

        User weaver2 = User.builder()
                .email("shanmugam@weavemart.com")
                .password(passwordEncoder.encode("weaver123"))
                .fullName("Shanmugam Mudaliar")
                .phone("+91 94432 56789")
                .role(Role.WEAVER)
                .artisanId("ART-TN-88301")
                .loomType("Traditional Pit Loom")
                .craftRegion("Kanchipuram (Tamil Nadu)")
                .biography("Heritage weaver crafting authentic pure mulberry silk sarees with tested silver-gold zari borders.")
                .idProofType("National Handloom Artisan Identity Card")
                .idProofDocumentUrl("https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80")
                .verificationStatus("VERIFIED")
                .address("14 Temple Road, Weaver Colony, Kanchipuram, Tamil Nadu")
                .preferredLanguage("ta")
                .build();
        weaver2 = userRepository.save(weaver2);

        // 2. Create Customer Account
        User customer1 = User.builder()
                .email("customer@weavemart.com")
                .password(passwordEncoder.encode("customer123"))
                .fullName("Ananya Sharma")
                .phone("+91 98112 34567")
                .role(Role.CUSTOMER)
                .verificationStatus("VERIFIED")
                .address("Flat 402, Royal Palms Apartments, Madhapur, Hyderabad, Telangana - 500081")
                .preferredLanguage("en")
                .build();
        customer1 = userRepository.save(customer1);

        // 3. Create Sample Handloom Products
        Product p1 = Product.builder()
                .title("Royal Blue Handcrafted Pochampally Double Ikat Silk Saree")
                .description("Hand-woven Double Ikat Mulberry Silk Saree featuring traditional geometric maze patterns. Craftsmanship takes over 24 days per piece on a traditional frame loom.")
                .price(new BigDecimal("9850"))
                .fabricMaterial("Pure Mulberry Silk")
                .weavePattern("Double Ikat")
                .loomType("Frame Loom")
                .craftRegion("Pochampally (Telangana)")
                .threadCount(120)
                .careInstructions("Dry Clean Only. Store wrapped in pure cotton fabric.")
                .stockQuantity(4)
                .imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80")
                .weaverId(weaver1.getId())
                .weaverName(weaver1.getFullName())
                .weaverLocation(weaver1.getCraftRegion())
                .build();

        Product p2 = Product.builder()
                .title("Heritage Kanjeevaram Temple Border Pure Gold Zari Silk Saree")
                .description("Authentic Kanchipuram silk saree handwoven with heavy Korvai contrast border and pure silver-gold zari weave work.")
                .price(new BigDecimal("18500"))
                .fabricMaterial("Pure Mulberry Silk with Gold Zari")
                .weavePattern("Korvai Weave / Temple Border")
                .loomType("Traditional Pit Loom")
                .craftRegion("Kanchipuram (Tamil Nadu)")
                .threadCount(140)
                .careInstructions("Dry Clean Only")
                .stockQuantity(2)
                .imageUrl("https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80")
                .weaverId(weaver2.getId())
                .weaverName(weaver2.getFullName())
                .weaverLocation(weaver2.getCraftRegion())
                .build();

        Product p3 = Product.builder()
                .title("Banarasi Kadwa Woven Brocade Silk Dupatta")
                .description("Exquisite Handloom Banarasi Silk Dupatta adorned with Kadwa floral booties woven painstakingly thread by thread.")
                .price(new BigDecimal("4900"))
                .fabricMaterial("Pure Silk")
                .weavePattern("Kadwa Brocade")
                .loomType("Jacquard Handloom")
                .craftRegion("Varanasi (UP)")
                .threadCount(110)
                .careInstructions("Dry Clean Only")
                .stockQuantity(6)
                .imageUrl("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80")
                .weaverId(weaver1.getId())
                .weaverName(weaver1.getFullName())
                .weaverLocation("Varanasi (UP)")
                .build();

        Product p4 = Product.builder()
                .title("Organic Bengal Handloom Cotton Jamdani Saree")
                .description("Lightweight, breathable pure organic cotton Jamdani woven using traditional bone shuttles in Bengal villages.")
                .price(new BigDecimal("3450"))
                .fabricMaterial("100% Organic Cotton")
                .weavePattern("Jamdani Motif")
                .loomType("Pit Loom")
                .craftRegion("Fulia (West Bengal)")
                .threadCount(100)
                .careInstructions("Hand wash in cold water with gentle liquid detergent.")
                .stockQuantity(8)
                .imageUrl("https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80")
                .weaverId(weaver2.getId())
                .weaverName(weaver2.getFullName())
                .weaverLocation("Fulia (West Bengal)")
                .build();

        Product p5 = Product.builder()
                .title("Chanderi Tissue Silk Cotton Saree with Zari Mukkais")
                .description("Elegant Chanderi silk cotton saree with glossy sheen, sheer texture and hand-finished zari border.")
                .price(new BigDecimal("6200"))
                .fabricMaterial("Chanderi Silk-Cotton")
                .weavePattern("Zari Mukkais")
                .loomType("Fly Shuttle Loom")
                .craftRegion("Chanderi (MP)")
                .threadCount(120)
                .careInstructions("Gentle Hand Wash or Dry Clean")
                .stockQuantity(5)
                .imageUrl("https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80")
                .weaverId(weaver1.getId())
                .weaverName(weaver1.getFullName())
                .weaverLocation("Chanderi (MP)")
                .build();

        productRepository.saveAll(List.of(p1, p2, p3, p4, p5));

        // 4. Create Initial Sample Order for Customer
        Order sampleOrder = Order.builder()
                .customerId(customer1.getId())
                .customerName(customer1.getFullName())
                .customerEmail(customer1.getEmail())
                .customerPhone(customer1.getPhone())
                .shippingAddress(customer1.getAddress())
                .totalAmount(new BigDecimal("9850"))
                .upiTransactionId("UPI-884920419")
                .paymentMethod("UPI_QR")
                .paymentStatus("SUCCESS")
                .orderStatus(OrderStatus.IN_PRODUCTION)
                .trackingId("TRK-WEAVE-9921")
                .courierName("Indian SpeedPost Artisian Express")
                .estimatedDeliveryDays("4-6 Days")
                .build();

        OrderItem sampleItem = OrderItem.builder()
                .order(sampleOrder)
                .productId(p1.getId())
                .productTitle(p1.getTitle())
                .fabricMaterial(p1.getFabricMaterial())
                .imageUrl(p1.getImageUrl())
                .weaverId(p1.getWeaverId())
                .weaverName(p1.getWeaverName())
                .price(p1.getPrice())
                .quantity(1)
                .build();
        sampleOrder.getItems().add(sampleItem);

        orderRepository.save(sampleOrder);

        System.out.println(">>> WeaveMart data initialization completed successfully!");
    }
}
