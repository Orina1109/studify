package org.studify.controller

import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.studify.model.Message
import org.studify.model.User
import org.studify.model.UserRole
import org.studify.service.MessageService
import org.studify.service.UserService
import java.time.LocalDateTime
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@ExtendWith(MockitoExtension::class)
class MessageControllerTest {

    @Mock
    private lateinit var messageService: MessageService

    @Mock
    private lateinit var userService: UserService

    @Mock
    private lateinit var authentication: Authentication

    @Mock
    private lateinit var securityContext: SecurityContext

    private lateinit var messageController: MessageController

    private lateinit var sender: User
    private lateinit var recipient: User
    private lateinit var message: Message

    @BeforeEach
    fun setUp() {
        messageController = MessageController(messageService, userService)

        sender = User(
            id = 1L,
            username = "sender",
            passwordHash = "hash",
            role = UserRole.STUDENT,
            email = "sender@example.com"
        )

        recipient = User(
            id = 2L,
            username = "recipient",
            passwordHash = "hash",
            role = UserRole.STUDENT,
            email = "recipient@example.com"
        )

        message = Message(
            id = 1L,
            sender = sender,
            recipient = recipient,
            text = "Hello",
            sentAt = LocalDateTime.now()
        )

        // Setup security context
        `when`(securityContext.authentication).thenReturn(authentication)
        SecurityContextHolder.setContext(securityContext)
        `when`(authentication.name).thenReturn("sender")
    }

    @Test
    fun `sendMessage should return created message`() {
        runBlocking {
            // Given
            val request = MessageController.SendMessageRequest(recipientId = 2L, text = "Hello")
            `when`(userService.getUserByUsername("sender")).thenReturn(sender)
            `when`(messageService.sendMessage(1L, 2L, "Hello")).thenReturn(message)

            // When
            val response = messageController.sendMessage(request)

            // Then
            assertEquals(HttpStatus.CREATED, response.statusCode)
            assertEquals(message, response.body)
            verify(userService).getUserByUsername("sender")
            verify(messageService).sendMessage(1L, 2L, "Hello")
        }
    }

    @Test
    fun `sendMessage should return error when user not authenticated`() {
        runBlocking {
            // Given
            val request = MessageController.SendMessageRequest(recipientId = 2L, text = "Hello")
            `when`(userService.getUserByUsername("sender")).thenReturn(null)

            // When
            val response = messageController.sendMessage(request)

            // Then
            assertEquals(HttpStatus.UNAUTHORIZED, response.statusCode)
            assertTrue(response.body is org.studify.model.ErrorResponse)
            verify(userService).getUserByUsername("sender")
            verify(messageService, never()).sendMessage(anyLong(), anyLong(), anyString())
        }
    }

    @Test
    fun `getMessagesBetweenUsers should return messages`() {
        runBlocking {
            // Given
            val messages = listOf(message)
            `when`(userService.getUserByUsername("sender")).thenReturn(sender)
            `when`(messageService.getMessagesBetweenUsers(1L, 2L)).thenReturn(messages)

            // When
            val response = messageController.getMessagesBetweenUsers(2L)

            // Then
            assertEquals(HttpStatus.OK, response.statusCode)
            assertEquals(messages, response.body)
            verify(userService).getUserByUsername("sender")
            verify(messageService).getMessagesBetweenUsers(1L, 2L)
        }
    }

    @Test
    fun `getMessagesBetweenUsers should return error when user not authenticated`() {
        runBlocking {
            // Given
            `when`(userService.getUserByUsername("sender")).thenReturn(null)

            // When
            val response = messageController.getMessagesBetweenUsers(2L)

            // Then
            assertEquals(HttpStatus.UNAUTHORIZED, response.statusCode)
            assertTrue(response.body is org.studify.model.ErrorResponse)
            verify(userService).getUserByUsername("sender")
            verify(messageService, never()).getMessagesBetweenUsers(anyLong(), anyLong(), anyInt())
        }
    }
}
