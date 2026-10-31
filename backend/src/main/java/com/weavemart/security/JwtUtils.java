package com.weavemart.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret:${JWT_SECRET:9a2f8c4e1b7d5a3f6e8c0b2d4f6a8c1e3b5d7f9a2c4e6b8d0a2f4c6e8b0a2f4c}}")
    private String jwtSecret;

    @Value("${jwt.expirationMs:86400000}")
    private int jwtExpirationMs;

    private Key getSigningKey() {
        String key = (jwtSecret != null) ? jwtSecret.trim() : "";
        // HS256 requires at least 256 bits (32 bytes). If provided key is shorter, pad with default secure seed.
        if (key.length() < 32) {
            key = key + "9a2f8c4e1b7d5a3f6e8c0b2d4f6a8c1e3b5d7f9a2c4e6b8d";
        }
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, String role, Long userId, String fullName) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role != null ? role : "CUSTOMER")
                .claim("userId", userId != null ? userId : 1L)
                .claim("fullName", fullName != null ? fullName : "")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getRoleFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
