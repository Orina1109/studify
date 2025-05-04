package org.studify.service

import org.springframework.stereotype.Service
import org.studify.model.User
import org.studify.model.UserRole
import java.time.LocalDateTime
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

@Service
class UserService {
    private val users = ConcurrentHashMap<Long, User>()
    private val usernameToIdMap = ConcurrentHashMap<String, Long>()
    private val idGenerator = AtomicLong(1)

    // Initialize with some sample users
    init {
        initializeUsers()
    }

    private fun initializeUsers() {
        val student = User(
            username = "student",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // "password" hashed with SHA-256
            role = UserRole.STUDENT,
            firstName = "John",
            lastName = "Doe",
            email = "john.doe@example.com"
        )

        val teacher = User(
            username = "teacher",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // "password" hashed with SHA-256
            role = UserRole.TEACHER,
            firstName = "Jane",
            lastName = "Smith",
            email = "jane.smith@example.com"
        )

        val admin = User(
            username = "admin",
            passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // "password" hashed with SHA-256
            role = UserRole.ADMIN,
            firstName = "Admin",
            lastName = "User",
            email = "admin@example.com"
        )

        // Add users using non-suspend method
        addUserInternal(student)
        addUserInternal(teacher)
        addUserInternal(admin)
    }

    suspend fun getAllUsers(): List<User> = users.values.toList()

    suspend fun getUserById(id: Long): User? = users[id]

    suspend fun getUserByUsername(username: String): User? {
        val userId = usernameToIdMap[username] ?: return null
        return users[userId]
    }

    suspend fun addUser(user: User): User {
        // Check if username already exists
        if (usernameToIdMap.containsKey(user.username)) {
            throw IllegalArgumentException("Username ${user.username} already exists")
        }

        val id = user.id ?: idGenerator.getAndIncrement()
        val newUser = user.copy(id = id)
        users[id] = newUser
        usernameToIdMap[user.username] = id
        return newUser
    }

    suspend fun updateUser(id: Long, user: User): User? {
        if (!users.containsKey(id)) return null

        // If username is changing, update the username map
        val currentUser = users[id]
        if (currentUser != null && currentUser.username != user.username) {
            // Check if the new username already exists for another user
            if (usernameToIdMap.containsKey(user.username) && usernameToIdMap[user.username] != id) {
                throw IllegalArgumentException("Username ${user.username} already exists")
            }
            usernameToIdMap.remove(currentUser.username)
            usernameToIdMap[user.username] = id
        }

        val updatedUser = user.copy(id = id)
        users[id] = updatedUser
        return updatedUser
    }

    suspend fun updateLastLogin(id: Long): User? {
        val user = users[id] ?: return null
        val updatedUser = user.copy(lastLogin = LocalDateTime.now())
        users[id] = updatedUser
        return updatedUser
    }

    suspend fun deleteUser(id: Long): Boolean {
        val user = users[id] ?: return false
        usernameToIdMap.remove(user.username)
        return users.remove(id) != null
    }

    /**
     * Internal non-suspend version of addUser for initialization
     */
    private fun addUserInternal(user: User): User {
        // Check if username already exists
        if (usernameToIdMap.containsKey(user.username)) {
            throw IllegalArgumentException("Username ${user.username} already exists")
        }

        val id = user.id ?: idGenerator.getAndIncrement()
        val newUser = user.copy(id = id)
        users[id] = newUser
        usernameToIdMap[user.username] = id
        return newUser
    }
}
