package com.weavemart.repository;

import com.weavemart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByWeaverId(Long weaverId);

    @Query("SELECT p FROM Product p WHERE " +
           "(:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.craftRegion) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:material IS NULL OR LOWER(p.fabricMaterial) = LOWER(:material)) AND " +
           "(:region IS NULL OR LOWER(p.craftRegion) = LOWER(:region))")
    List<Product> searchProducts(@Param("search") String search, 
                                @Param("material") String material, 
                                @Param("region") String region);
}
