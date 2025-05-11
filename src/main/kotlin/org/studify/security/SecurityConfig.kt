package org.studify.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig(private val jwtAuthenticationFilter: JwtAuthenticationFilter) {

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*") // Allow all origins
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("*") // Allow all headers
        configuration.allowCredentials = false // Must be false if allowedOrigins contains "*"

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            // Disable CSRF for REST API
            .csrf { it.disable() }

            // Enable CORS
            .cors { it.configurationSource(corsConfigurationSource()) }

            // Configure session management to stateless
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }

            // Configure authorization rules
            .authorizeHttpRequests { authorize ->
                authorize
                    // Public endpoints
                    .requestMatchers("/api/auth/login").permitAll()
                    .requestMatchers("/api/auth/register").permitAll()
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                    // Admin-only endpoints
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")

                    // Teacher endpoints
                    .requestMatchers("/api/teachers/**").hasAnyRole("TEACHER", "ADMIN")

                    // Student endpoints
                    .requestMatchers("/api/students/**").hasAnyRole("STUDENT", "TEACHER", "ADMIN")

                    // All other endpoints require authentication
                    .anyRequest().authenticated()
            }

            // Add JWT filter before UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
}
