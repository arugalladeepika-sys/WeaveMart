package com.weavemart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private Long productId;
    private String productTitle;
    private String fabricMaterial;
    private String imageUrl;
    private Long weaverId;
    private String weaverName;

    private BigDecimal price;
    private Integer quantity;

    public OrderItem() {}

    public OrderItem(Long id, Order order, Long productId, String productTitle, String fabricMaterial,
                     String imageUrl, Long weaverId, String weaverName, BigDecimal price, Integer quantity) {
        this.id = id;
        this.order = order;
        this.productId = productId;
        this.productTitle = productTitle;
        this.fabricMaterial = fabricMaterial;
        this.imageUrl = imageUrl;
        this.weaverId = weaverId;
        this.weaverName = weaverName;
        this.price = price;
        this.quantity = quantity;
    }

    public static OrderItemBuilder builder() {
        return new OrderItemBuilder();
    }

    public static class OrderItemBuilder {
        private Long id;
        private Order order;
        private Long productId;
        private String productTitle;
        private String fabricMaterial;
        private String imageUrl;
        private Long weaverId;
        private String weaverName;
        private BigDecimal price;
        private Integer quantity;

        public OrderItemBuilder id(Long id) { this.id = id; return this; }
        public OrderItemBuilder order(Order order) { this.order = order; return this; }
        public OrderItemBuilder productId(Long productId) { this.productId = productId; return this; }
        public OrderItemBuilder productTitle(String productTitle) { this.productTitle = productTitle; return this; }
        public OrderItemBuilder fabricMaterial(String fabricMaterial) { this.fabricMaterial = fabricMaterial; return this; }
        public OrderItemBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public OrderItemBuilder weaverId(Long weaverId) { this.weaverId = weaverId; return this; }
        public OrderItemBuilder weaverName(String weaverName) { this.weaverName = weaverName; return this; }
        public OrderItemBuilder price(BigDecimal price) { this.price = price; return this; }
        public OrderItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }

        public OrderItem build() {
            return new OrderItem(id, order, productId, productTitle, fabricMaterial, imageUrl, weaverId, weaverName, price, quantity);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

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
