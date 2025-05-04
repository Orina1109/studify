package org.studify.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.studify.model.Student
import org.studify.service.StudentService

@RestController
@RequestMapping("/api/students")
class StudentController(private val studentService: StudentService) {

    @GetMapping
    fun getAllStudents(): List<Student> = studentService.getAllStudents()

    @GetMapping("/{id}")
    fun getStudentById(@PathVariable id: Long): ResponseEntity<Student> {
        val student = studentService.getStudentById(id)
        return if (student != null) {
            ResponseEntity.ok(student)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createStudent(@RequestBody student: Student): Student {
        return studentService.addStudent(student)
    }

    @PutMapping("/{id}")
    fun updateStudent(
        @PathVariable id: Long,
        @RequestBody student: Student
    ): ResponseEntity<Student> {
        val updatedStudent = studentService.updateStudent(id, student)
        return if (updatedStudent != null) {
            ResponseEntity.ok(updatedStudent)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteStudent(@PathVariable id: Long): ResponseEntity<Unit> {
        val deleted = studentService.deleteStudent(id)
        return if (deleted) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}