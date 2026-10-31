package com.weavemart.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String fabricMaterial;
    private String weavePattern;
    private String loomType;
    private String craftRegion;
    private Integer threadCount;
    private String careInstructions;

    private Integer stockQuantity;
    private String imageUrl;

    private Long weaverId;
    private String weaverName;
    private String weaverLocation;

    private LocalDateTime createdAt;

    public Product() {}

    public Product(Long id, String title, String description, BigDecimal price, String fabricMaterial,
                   String weavePattern, String loomType, String craftRegion, Integer threadCount,
                   String careInstructions, Integer stockQuantity, String imageUrl, Long weaverId,
                   String weaverName, String weaverLocation, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.fabricMaterial = fabricMaterial;
        this.weavePattern = weavePattern;
        this.loomType = loomType;
        this.craftRegion = craftRegion;
        this.threadCount = threadCount;
        this.careInstructions = careInstructions;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.weaverId = weaverId;
        this.weaverName = weaverName;
        this.weaverLocation = weaverLocation;
        this.createdAt = createdAt;
    }

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public static ProductBuilder builder() {
        return new ProductBuilder();
    }

    public static class ProductBuilder {
        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private String fabricMaterial;
        private String weavePattern;
        private String loomType;
        private String craftRegion;
        private Integer threadCount;
        private String careInstructions;
        private Integer stockQuantity;
        private String imageUrl;
        private Long weaverId;
        private String weaverName;
        private String weaverLocation;
        private LocalDateTime createdAt;

        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder title(String title) { this.title = title; return this; }
        public ProductBuilder description(String description) { this.description = description; return this; }
        public ProductBuilder price(BigDecimal price) { this.price = price; return this; }
        public ProductBuilder fabricMaterial(String fabricMaterial) { this.fabricMaterial = fabricMaterial; return this; }
        public ProductBuilder weavePattern(String weavePattern) { this.weavePattern = weavePattern; return this; }
        public ProductBuilder loomType(String loomType) { this.loomType = loomType; return this; }
        public ProductBuilder craftRegion(String craftRegion) { this.craftRegion = craftRegion; return this; }
        public ProductBuilder threadCount(Integer threadCount) { this.threadCount = threadCount; return this; }
        public ProductBuilder careInstructions(String careInstructions) { this.careInstructions = careInstructions; return this; }
        public ProductBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ProductBuilder weaverId(Long weaverId) { this.weaverId = weaverId; return this; }
        public ProductBuilder weaverName(String weaverName) { this.weaverName = weaverName; return this; }
        public ProductBuilder weaverLocation(String weaverLocation) { this.weaverLocation = weaverLocation; return this; }
        public ProductBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Product build() {
            return new Product(id, title, description, price, fabricMaterial, weavePattern, loomType, craftRegion, threadCount, careInstructions, stockQuantity, imageUrl, weaverId, weaverName, weaverLocation, createdAt);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getFabricMaterial() { return fabricMaterial; }
    public void setFabricMaterial(String fabricMaterial) { this.fabricMaterial = fabricMaterial; }

    public String getWeavePattern() { return weavePattern; }
    public void setWeavePattern(String weavePattern) { this.weavePattern = weavePattern; }

    public String getLoomType() { return loomType; }
    public void setLoomType(String loomType) { this.loomType = loomType; }

    public String getCraftRegion() { return craftRegion; }
    public void setCraftRegion(String craftRegion) { this.craftRegion = craftRegion; }

    public Integer getThreadCount() { return threadCount; }
    public void setThreadCount(Integer threadCount) { this.threadCount = threadCount; }

    public String getCareInstructions() { return careInstructions; }
    public void setCareInstructions(String careInstructions) { this.careInstructions = careInstructions; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getWeaverId() { return weaverId; }
    public void setWeaverId(Long weaverId) { this.weaverId = weaverId; }

    public String getWeaverName() { return weaverName; }
    public void setWeaverName(String weaverName) { this.weaverName = weaverName; }

    public String getWeaverLocation() { return weaverLocation; }
    public void setWeaverLocation(String weaverLocation) { this.weaverLocation = weaverLocation; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
