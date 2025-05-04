package org.studify.service

import org.springframework.stereotype.Service
import org.studify.model.Student
import java.time.LocalDate
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

@Service
class StudentService {
    private val students = ConcurrentHashMap<Long, Student>()
    private val idGenerator = AtomicLong(1)

    // Initialize with some sample data
    init {
        addStudent(Student(
            firstName = "John",
            lastName = "Doe",
            email = "john.doe@example.com",
            birthDate = LocalDate.of(2000, 1, 1)
        ))
        addStudent(Student(
            firstName = "Jane",
            lastName = "Smith",
            email = "jane.smith@example.com",
            birthDate = LocalDate.of(2001, 2, 15)
        ))
    }

    fun getAllStudents(): List<Student> = students.values.toList()

    fun getStudentById(id: Long): Student? = students[id]

    fun addStudent(student: Student): Student {
        val id = student.id ?: idGenerator.getAndIncrement()
        val newStudent = student.copy(id = id)
        students[id] = newStudent
        return newStudent
    }

    fun updateStudent(id: Long, student: Student): Student? {
        if (!students.containsKey(id)) return null
        val updatedStudent = student.copy(id = id)
        students[id] = updatedStudent
        return updatedStudent
    }

    fun deleteStudent(id: Long): Boolean {
        return students.remove(id) != null
    }
}