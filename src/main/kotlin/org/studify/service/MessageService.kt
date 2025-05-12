package org.studify.service

import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.studify.model.Message
import org.studify.model.User
import org.studify.repository.MessageRepository
import org.studify.repository.UserRepository

@Service
class MessageService(
    private val messageRepository: MessageRepository,
    private val userRepository: UserRepository
) {

    /**
     * Send a message from one user to another
     */
    @Transactional
    suspend fun sendMessage(senderId: Long, recipientId: Long, text: String): Message? {
        val sender = userRepository.findById(senderId).orElse(null) ?: return null
        val recipient = userRepository.findById(recipientId).orElse(null) ?: return null

        val message = Message(
            sender = sender,
            recipient = recipient,
            text = text
        )

        return messageRepository.save(message)
    }

    /**
     * Get the last 100 messages between two users, ordered by sent time (newest first)
     */
    @Transactional(readOnly = true)
    suspend fun getMessagesBetweenUsers(userId1: Long, userId2: Long, limit: Int = 100): List<Message> {
        val pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "sentAt"))
        return messageRepository.findMessagesBetweenUsers(userId1, userId2, pageable)
    }

    /**
     * Get all messages sent by a user
     */
    @Transactional(readOnly = true)
    suspend fun getMessagesSentByUser(userId: Long): List<Message>? {
        val user = userRepository.findById(userId).orElse(null) ?: return null
        return messageRepository.findBySenderOrderBySentAtDesc(user)
    }

    /**
     * Get all messages received by a user
     */
    @Transactional(readOnly = true)
    suspend fun getMessagesReceivedByUser(userId: Long): List<Message>? {
        val user = userRepository.findById(userId).orElse(null) ?: return null
        return messageRepository.findByRecipientOrderBySentAtDesc(user)
    }
}