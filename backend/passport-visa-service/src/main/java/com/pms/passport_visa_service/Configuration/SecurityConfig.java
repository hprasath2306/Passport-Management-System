package com.pms.passport_visa_service.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private HeaderRoleAuthenticationFilter headerRoleAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(headerRoleAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .securityMatcher(AnyRequestMatcher.INSTANCE)
                .authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll())
                .sessionManagement((session) -> session.sessionCreationPolicy(STATELESS))
                .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
