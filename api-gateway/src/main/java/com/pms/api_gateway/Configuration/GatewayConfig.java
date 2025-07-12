package com.pms.api_gateway.Configuration;

import com.pms.api_gateway.Filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Route for authentication endpoints (no JWT required)
                .route("user-service-auth", r -> r
                        .path("/api/auth/**")
                        .uri("lb://user-service"))
                
                // Catch-all route for any other user service endpoints (JWT required)
                .route("user-service-all", r -> r
                        .path("/api/**")
                        .filters(f -> f.filter(jwtAuthenticationFilter.apply(new JwtAuthenticationFilter.Config())))
                        .uri("lb://user-service"))

                .build();
    }
}