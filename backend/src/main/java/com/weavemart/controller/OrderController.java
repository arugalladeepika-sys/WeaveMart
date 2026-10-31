package com.weavemart.controller;

import com.weavemart.model.Order;
import com.weavemart.model.OrderItem;
import com.weavemart.model.OrderStatus;
import com.weavemart.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody CreateOrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cart cannot be empty"));
        }

        String txnId = request.getUpiTransactionId();
        if (txnId == null || txnId.isBlank()) {
            txnId = "UPI-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }

        Order order = Order.builder()
                .customerId(request.getCustomerId())
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .shippingAddress(request.getShippingAddress())
                .totalAmount(request.getTotalAmount())
                .upiTransactionId(txnId)
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "UPI_QR")
                .paymentStatus("SUCCESS")
                .orderStatus(OrderStatus.PLACED)
                .estimatedDeliveryDays("5-7 Days")
                .build();

        for (CreateOrderItem itemReq : request.getItems()) {
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .productId(itemReq.getProductId())
                    .productTitle(itemReq.getProductTitle())
                    .fabricMaterial(itemReq.getFabricMaterial())
                    .imageUrl(itemReq.getImageUrl())
                    .weaverId(itemReq.getWeaverId())
                    .weaverName(itemReq.getWeaverName())
                    .price(itemReq.getPrice())
                    .quantity(itemReq.getQuantity())
                    .build();
            order.getItems().add(item);
        }

        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable Long customerId) {
        List<Order> orders = orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/weaver/{weaverId}")
    public ResponseEntity<List<Order>> getWeaverOrders(@PathVariable Long weaverId) {
        List<Order> orders = orderRepository.findOrdersForWeaver(weaverId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        if (request.getStatus() != null) {
            order.setOrderStatus(OrderStatus.valueOf(request.getStatus().toUpperCase()));
        }
        if (request.getTrackingId() != null) {
            order.setTrackingId(request.getTrackingId());
        }
        if (request.getCourierName() != null) {
            order.setCourierName(request.getCourierName());
        }

        Order updated = orderRepository.save(order);
        return ResponseEntity.ok(updated);
    }

    public static class CreateOrderRequest {
        private Long customerId;
        private String customerName;
        private String customerEmail;
        private String customerPhone;
        private String shippingAddress;
        private BigDecimal totalAmount;
        private String upiTransactionId;
        private String paymentMethod;
        private List<CreateOrderItem> items;

        public Long getCustomerId() { return customerId; }
        public void setCustomerId(Long customerId) { this.customerId = customerId; }

        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }

        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

        public String getCustomerPhone() { return customerPhone; }
        public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

        public String getShippingAddress() { return shippingAddress; }
        public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

        public String getUpiTransactionId() { return upiTransactionId; }
        public void setUpiTransactionId(String upiTransactionId) { this.upiTransactionId = upiTransactionId; }

        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

        public List<CreateOrderItem> getItems() { return items; }
        public void setItems(List<CreateOrderItem> items) { this.items = items; }
    }

    public static class CreateOrderItem {
        private Long productId;
        private String productTitle;
        private String fabricMaterial;
        private String imageUrl;
        private Long weaverId;
        private String weaverName;
        private BigDecimal price;
        private Integer quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public String getProductTitle() { return productTitle; }
        public void setProductTitle(String productTitle) { this.productTitle = productTitle; }

        public String getFabricMaterial() { return fabricMaterial; }
        public void setFabricMaterial(String fabricMaterial) { this.fabricMaterial = fabricMaterial; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

        public Long getWeaverId() { return weaverId; }
        public void setWeaverId(Long weaverId) { this.weaverId = weaverId; }

        public String getWeaverName() { return weaverName; }
        public void setWeaverName(String weaverName) { this.weaverName = weaverName; }

        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class UpdateStatusRequest {
        private String status;
        private String trackingId;
        private String courierName;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getTrackingId() { return trackingId; }
        public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

        public String getCourierName() { return courierName; }
        public void setCourierName(String courierName) { this.courierName = courierName; }
    }
}
