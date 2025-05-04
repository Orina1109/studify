package org.studify.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import kotlinx.coroutines.runBlocking
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.studify.model.User

@Component
class JwtAuthenticationFilter(private val authService: AuthService) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            // Extract token from Authorization header
            val authHeader = request.getHeader(HttpHeaders.AUTHORIZATION)
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response)
                return
            }

            val token = authHeader.substring(7) // Remove "Bearer " prefix

            // Validate token and get user
            val user = runBlocking { authService.validateTokenAndGetUser(token) }

            if (user != null) {
                // Create authentication object
                val authorities = listOf(SimpleGrantedAuthority("ROLE_${user.role.name}"))
                val authentication = UsernamePasswordAuthenticationToken(
                    user.username,
                    null, // credentials (not needed after authentication)
                    authorities
                )

                // Set authentication in context
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: Exception) {
            // In case of any error, clear security context
            SecurityContextHolder.clearContext()
        }

        // Continue filter chain
        filterChain.doFilter(request, response)
    }
}
