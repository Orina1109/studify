package org.studify.service

import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.ArgumentMatchers.any
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.studify.model.Message
import org.studify.model.User
import org.studify.model.UserRole
import org.studify.repository.MessageRepository
import org.studify.repository.UserRepository
import java.time.LocalDateTime
import java.util.*
import kotlin.test.assertEquals
import kotlin.test.assertNull

@ExtendWith(MockitoExtension::class)
class MessageServiceTest {

    @Mock
    private lateinit var messageRepository: MessageRepository

    @Mock
    private lateinit var userRepository: UserRepository

    private lateinit var messageService: MessageService

    private lateinit var sender: User
    private lateinit var recipient: User
    private lateinit var message: Message

    @BeforeEach
    fun setUp() {
        messageService = MessageService(messageRepository, userRepository)

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
    }

    @Test
    fun `sendMessage should create and save a new message`() {
        runBlocking {
            // Given
            doReturn(Optional.of(sender)).`when`(userRepository).findById(1L)
            doReturn(Optional.of(recipient)).`when`(userRepository).findById(2L)
            doReturn(message).`when`(messageRepository).save(any())

            // When
            val result = messageService.sendMessage(1L, 2L, "Hello")

            // Then
            assertEquals(message, result)
            verify(userRepository).findById(1L)
            verify(userRepository).findById(2L)
            verify(messageRepository).save(any())
        }
    }

    @Test
    fun `sendMessage should return null if sender not found`() {
        runBlocking {
            // Given
            doReturn(Optional.empty<User>()).`when`(userRepository).findById(1L)

            // When
            val result = messageService.sendMessage(1L, 2L, "Hello")

            // Then
            assertNull(result)
            verify(userRepository).findById(1L)
            verify(userRepository, never()).findById(2L)
            verify(messageRepository, never()).save(any())
        }
    }

    @Test
    fun `sendMessage should return null if recipient not found`() {
        runBlocking {
            // Given
            doReturn(Optional.of(sender)).`when`(userRepository).findById(1L)
            doReturn(Optional.empty<User>()).`when`(userRepository).findById(2L)

            // When
            val result = messageService.sendMessage(1L, 2L, "Hello")

            // Then
            assertNull(result)
            verify(userRepository).findById(1L)
            verify(userRepository).findById(2L)
            verify(messageRepository, never()).save(any())
        }
    }

    @Test
    fun `getMessagesBetweenUsers should return messages between users`() {
        runBlocking {
            // Given
            val messages = listOf(message)
            val pageable = PageRequest.of(0, 100, Sort.by(Sort.Direction.DESC, "sentAt"))
            doReturn(messages).`when`(messageRepository).findMessagesBetweenUsers(1L, 2L, pageable)

            // When
            val result = messageService.getMessagesBetweenUsers(1L, 2L)

            // Then
            assertEquals(messages, result)
            verify(messageRepository).findMessagesBetweenUsers(1L, 2L, pageable)
        }
    }
}
