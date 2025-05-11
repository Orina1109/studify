package org.studify.service

import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.studify.model.User
import org.studify.model.UserRole
import org.studify.repository.UserRepository
import java.time.LocalDateTime

@Service
class UserService(private val userRepository: UserRepository) {

    @PostConstruct
    fun initializeUsers() {
        if (userRepository.count() > 0) {
            return
        }

        val student = User(
            username = "student",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            role = UserRole.STUDENT,
            firstName = "John",
            lastName = "Doe",
            email = "john.doe@example.com"
        )

        val teacher = User(
            username = "teacher",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            role = UserRole.TEACHER,
            firstName = "Jane",
            lastName = "Smith",
            email = "jane.smith@example.com"
        )

        val admin = User(
            username = "admin",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            role = UserRole.ADMIN,
            firstName = "Admin",
            lastName = "User",
            email = "admin@example.com"
        )

        userRepository.save(student)
        userRepository.save(teacher)
        userRepository.save(admin)
    }

    @Transactional(readOnly = true)
    suspend fun getAllUsers(): List<User> = userRepository.findAll()

    @Transactional(readOnly = true)
    suspend fun getUserById(id: Long): User? = userRepository.findById(id).orElse(null)

    @Transactional(readOnly = true)
    suspend fun getUserByUsername(username: String): User? = userRepository.findByUsername(username)

    @Transactional
    suspend fun addUser(user: User): User {
        if (userRepository.existsByUsername(user.username)) {
            throw IllegalArgumentException("Username ${user.username} already exists")
        }

        return userRepository.save(user)
    }

    @Transactional
    suspend fun updateUser(id: Long, user: User): User? {
        val existingUser = userRepository.findById(id).orElse(null) ?: return null

        if (existingUser.username != user.username && userRepository.existsByUsername(user.username)) {
            throw IllegalArgumentException("Username ${user.username} already exists")
        }

        val updatedUser = user.copy(id = id)
        return userRepository.save(updatedUser)
    }

    @Transactional
    suspend fun updateLastLogin(id: Long): User? {
        val user = userRepository.findById(id).orElse(null) ?: return null
        val updatedUser = user.copy(lastLogin = LocalDateTime.now())
        return userRepository.save(updatedUser)
    }

    @Transactional
    suspend fun deleteUser(id: Long): Boolean {
        if (!userRepository.existsById(id)) {
            return false
        }
        userRepository.deleteById(id)
        return true
    }

    @Transactional
    suspend fun updateFilledQuestionsStatus(id: Long, filledQuestions: Boolean): User? {
        val user = userRepository.findById(id).orElse(null) ?: return null
        val updatedUser = user.copy(filledQuestions = filledQuestions)
        return userRepository.save(updatedUser)
    }
}
