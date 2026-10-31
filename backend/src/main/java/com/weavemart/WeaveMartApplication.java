package com.weavemart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WeaveMartApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeaveMartApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  WeaveMart - The Online Marketplace Started!");
        System.out.println("  Backend URL: http://localhost:8080");
        System.out.println("  H2 Console:  http://localhost:8080/h2-console");
        System.out.println("=================================================");
    }
}
