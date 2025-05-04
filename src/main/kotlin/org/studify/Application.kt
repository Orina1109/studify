package org.studify

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class StudifyApplication

fun main(args: Array<String>) {
    runApplication<StudifyApplication>(*args)
}