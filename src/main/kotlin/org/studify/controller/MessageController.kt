package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.studify.model.ErrorResponse
import org.studify.model.Message
import org.studify.service.MessageService
import org.studify.service.UserService

@RestController
@RequestMapping("/api/messages")
class MessageController(
    private val messageService: MessageService,
    private val userService: UserService
) {

    data class SendMessageRequest(
        val recipientId: Long,
        val text: String
    )

    /**
     * Send a message to another user
     */
    @PostMapping
    suspend fun sendMessage(@RequestBody request: SendMessageRequest): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val sender = userService.getUserByUsername(username)
            ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ErrorResponse(
                    message = "User not authenticated",
                    code = "USER_NOT_AUTHENTICATED"
                )
            )

        val message = messageService.sendMessage(sender.id!!, request.recipientId, request.text)
            ?: return ResponseEntity.badRequest().body(
                ErrorResponse(
                    message = "Failed to send message. Recipient not found.",
                    code = "RECIPIENT_NOT_FOUND"
                )
            )

        return ResponseEntity.status(HttpStatus.CREATED).body(message)
    }

    /**
     * Get messages between the current user and another user
     */
    @GetMapping("/{userId}")
    suspend fun getMessagesBetweenUsers(@PathVariable userId: Long): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val currentUser = userService.getUserByUsername(username)
            ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ErrorResponse(
                    message = "User not authenticated",
                    code = "USER_NOT_AUTHENTICATED"
                )
            )

        val messages = messageService.getMessagesBetweenUsers(currentUser.id!!, userId)
        return ResponseEntity.ok(messages)
    }
}