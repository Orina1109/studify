package org.studify.security.admin

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.test.util.ReflectionTestUtils
import org.studify.model.AdminToken
import org.studify.repository.AdminTokenRepository
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

@ExtendWith(MockitoExtension::class)
class AdminTokenValidatorImplTest {

    @Mock
    private lateinit var adminTokenRepository: AdminTokenRepository

    private lateinit var adminTokenValidator: AdminTokenValidatorImpl

    @BeforeEach
    fun setUp() {
        adminTokenValidator = AdminTokenValidatorImpl(adminTokenRepository)
    }

    @Test
    fun `validateToken should return true when token exists in database and is not used`() {
        // Given
        val validToken = "valid-token"
        val adminToken = AdminToken(token = validToken, used = false)
        `when`(adminTokenRepository.findByToken(validToken)).thenReturn(adminToken)

        // When
        val result = adminTokenValidator.validateToken(validToken)

        // Then
        assertTrue(result)
        verify(adminTokenRepository).findByToken(validToken)
    }

    @Test
    fun `validateToken should return false when token does not exist in database`() {
        // Given
        val invalidToken = "invalid-token"
        `when`(adminTokenRepository.findByToken(invalidToken)).thenReturn(null)

        // When
        val result = adminTokenValidator.validateToken(invalidToken)

        // Then
        assertFalse(result)
        verify(adminTokenRepository).findByToken(invalidToken)
    }

    @Test
    fun `validateToken should return false when token exists but has been used`() {
        // Given
        val usedToken = "used-token"
        val adminToken = AdminToken(token = usedToken, used = true)
        `when`(adminTokenRepository.findByToken(usedToken)).thenReturn(adminToken)

        // When
        val result = adminTokenValidator.validateToken(usedToken)

        // Then
        assertFalse(result)
        verify(adminTokenRepository).findByToken(usedToken)
    }

    @Test
    fun `isTokenUsed should return false when token not found`() {
        // Given
        `when`(adminTokenRepository.findByToken(anyString())).thenReturn(null)

        // When
        val result = adminTokenValidator.isTokenUsed("non-existent-token")

        // Then
        assertFalse(result)
        verify(adminTokenRepository).findByToken("non-existent-token")
    }

    @Test
    fun `isTokenUsed should return true when token is used`() {
        // Given
        val token = AdminToken(token = "used-token", used = true)
        `when`(adminTokenRepository.findByToken("used-token")).thenReturn(token)

        // When
        val result = adminTokenValidator.isTokenUsed("used-token")

        // Then
        assertTrue(result)
        verify(adminTokenRepository).findByToken("used-token")
    }

    @Test
    fun `isTokenUsed should return false when token is not used`() {
        // Given
        val token = AdminToken(token = "unused-token", used = false)
        `when`(adminTokenRepository.findByToken("unused-token")).thenReturn(token)

        // When
        val result = adminTokenValidator.isTokenUsed("unused-token")

        // Then
        assertFalse(result)
        verify(adminTokenRepository).findByToken("unused-token")
    }

    @Test
    fun `markTokenAsUsed should create new token when token doesn't exist`() {
        // Given
        val tokenValue = "new-token"
        `when`(adminTokenRepository.findByToken(tokenValue)).thenReturn(null)

        // When
        adminTokenValidator.markTokenAsUsed(tokenValue)

        // Then
        verify(adminTokenRepository).findByToken(tokenValue)
        verify(adminTokenRepository).save(argThat<AdminToken> { 
            it.token == tokenValue && it.used 
        })
    }

    @Test
    fun `markTokenAsUsed should update token when token exists but not used`() {
        // Given
        val tokenValue = "existing-token"
        val existingToken = AdminToken(token = tokenValue, used = false)
        `when`(adminTokenRepository.findByToken(tokenValue)).thenReturn(existingToken)

        // When
        adminTokenValidator.markTokenAsUsed(tokenValue)

        // Then
        verify(adminTokenRepository).findByToken(tokenValue)
        verify(adminTokenRepository).save(argThat<AdminToken> { 
            it.token == tokenValue && it.used 
        })
    }

    @Test
    fun `markTokenAsUsed should do nothing when token exists and is already used`() {
        // Given
        val tokenValue = "used-token"
        val existingToken = AdminToken(token = tokenValue, used = true)
        `when`(adminTokenRepository.findByToken(tokenValue)).thenReturn(existingToken)

        // When
        adminTokenValidator.markTokenAsUsed(tokenValue)

        // Then
        verify(adminTokenRepository).findByToken(tokenValue)
        verify(adminTokenRepository, never()).save(any())
    }
}
