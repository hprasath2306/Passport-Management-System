package com.pms.user_service.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher(AnyRequestMatcher.INSTANCE)
                .authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll())
                .sessionManagement((session) -> session.sessionCreationPolicy(STATELESS))
                .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
