package com.bookmyvenue.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

//@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//      1.disable csrf
        http.csrf(csrf -> csrf.disable());
//    	1.2 enable cors
        http.cors(cors -> {});
//    	2.retain basic auth scheme(disable form based auth filter-i.e UsernamePasswordAuthenticationFilter)
//    	http.formLogin(form -> form.disable());
        http.httpBasic(Customizer.withDefaults());

//    	3.disable HttpSession( tell spring not to create HttpSession object to store Security Context(which holds Authentication object)

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

//    	4.Add a rule -all endpoints are secured (requires authentication)
        http.authorizeHttpRequests(request ->
                //public endpoints swagger , sign in , sign up

                request.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/signin", "/api/auth/signup","/venue/**").permitAll()
//                         only customer should be able to book venue
                         . requestMatchers(HttpMethod.GET, "/api/auth/users/**").hasAuthority("CUSTOMER")
                        // Only Admin should be able to approve or reject venue listed by venue owner status - COMPLETE
//                        .requestMatchers(HttpMethod.PATCH, "/{appId}").hasRole("ADMIN")
                        // Only venue owner should be able to do the listing of venues
//                        .requestMatchers(HttpMethod.GET, "/").hasRole("Venue Owner")
                        //all remaining end points need can be accessed by authenticated users
                        .anyRequest().authenticated());
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}