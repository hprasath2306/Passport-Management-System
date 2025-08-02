package com.pms.api_gateway.Filter;

import com.pms.api_gateway.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public JwtAuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String path = request.getPath().toString();
            if (path.contains("/auth")) {
                return chain.filter(exchange);
            }

            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return handleUnauthorized(exchange);
            }

            String token = authHeader.substring(7);

            if (!jwtUtil.validateToken(token)) {
                return handleUnauthorized(exchange);
            }

            String customerId = jwtUtil.getCustomerIdFromToken(token);
            String userId = jwtUtil.getUserIdFromToken(token);

            ServerHttpRequest modifiedRequest = request.mutate()
                    .header("X-Customer-Id", customerId)
                    .header("X-User-Id", userId)
                    .build();

            return chain.filter(exchange
                    .mutate().request(modifiedRequest).build());
        };
    }

    private Mono<Void> handleUnauthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add("Content-Type", "application/json");

        String body = "{\"error\": \"Unauthorized\", \"message\": \"Invalid or missing JWT token\"}";
        return response.writeWith(Mono.just(response.bufferFactory().wrap(body.getBytes())));
    }

    public static class Config {
        // Configuration properties
    }
}