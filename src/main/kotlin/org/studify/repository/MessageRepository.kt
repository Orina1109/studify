package org.studify.repository

import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.studify.model.Message
import org.studify.model.User

@Repository
interface MessageRepository : JpaRepository<Message, Long> {
    
    /**
     * Find messages between two users, ordered by sent time (newest first)
     */
    @Query("SELECT m FROM Message m WHERE (m.sender.id = :userId1 AND m.recipient.id = :userId2) OR (m.sender.id = :userId2 AND m.recipient.id = :userId1) ORDER BY m.sentAt DESC")
    fun findMessagesBetweenUsers(
        @Param("userId1") userId1: Long,
        @Param("userId2") userId2: Long,
        pageable: Pageable
    ): List<Message>
    
    /**
     * Find messages sent by a user
     */
    fun findBySenderOrderBySentAtDesc(sender: User): List<Message>
    
    /**
     * Find messages received by a user
     */
    fun findByRecipientOrderBySentAtDesc(recipient: User): List<Message>
}