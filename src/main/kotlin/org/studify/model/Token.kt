package org.studify.model

import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * Entity representing an authentication token in the database.
 */
@Entity
@Table(name = "tokens")
data class Token(
    @Id
    @Column(length = 500)
    val token: String,
    
    @Column(nullable = false)
    val userId: Long,
    
    @Column(nullable = false)
    val expiresAt: LocalDateTime,
    
    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)