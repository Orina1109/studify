package org.studify.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.studify.model.Token
import java.time.LocalDateTime

@Repository
interface TokenRepository : JpaRepository<Token, String> {
    fun findByToken(token: String): Token?
    
    fun findByUserId(userId: Long): List<Token>
    
    @Modifying
    @Query("DELETE FROM Token t WHERE t.userId = :userId")
    fun deleteAllByUserId(userId: Long)
    
    @Modifying
    @Query("DELETE FROM Token t WHERE t.expiresAt < :now")
    fun deleteAllExpired(now: LocalDateTime)
}