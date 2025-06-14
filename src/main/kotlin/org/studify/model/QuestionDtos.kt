package org.studify.model

data class ChooseResultRequest(
    val teacherId: Long,
    val picked: Boolean
)

data class TeacherLookupResponse(
    val id: Long?,
    val userId: Long,
    val name: String,
    val age: String,
    val photoData: String? = null,
    val gender: Gender,
    val language: Language,
    val languageLevel: TeacherLanguageLevel,
    val timezone: String,
    val teachingGoals: List<Goal>,
    val minStudentLevel: StudentLanguageLevel,
    val maxStudentLevel: StudentLanguageLevel,
    val interests: List<Interest>,
    val teachingFrequency: TeachingFrequency,
    val lessonDuration: LessonDuration,
    val preferredTime: PreferredTime,
    val lessonPrice: Budget,
    val teachingStyle: TeachingStyle,
    val feedbackStyle: FeedbackStyle,
    val teachingMethod: TeachingMethod,
    val explanationStyle: ExplanationStyle,
    val homeworkApproach: HomeworkApproach,
    val createdAt: String,
    val compatibilityScore: Double
)

data class TeacherQuestionRequest(
    val name: String,
    val age: String,
    val photoData: String? = null,
    val gender: Gender,
    val language: Language,
    val languageLevel: TeacherLanguageLevel,
    val timezone: String,
    val teachingGoals: List<Goal>,
    val minStudentLevel: StudentLanguageLevel,
    val maxStudentLevel: StudentLanguageLevel,
    val interests: List<Interest>,
    val teachingFrequency: TeachingFrequency,
    val lessonDuration: LessonDuration,
    val preferredTime: PreferredTime,
    val lessonPrice: Budget,
    val teachingStyle: TeachingStyle,
    val feedbackStyle: FeedbackStyle,
    val teachingMethod: TeachingMethod,
    val explanationStyle: ExplanationStyle,
    val homeworkApproach: HomeworkApproach
)

data class TeacherQuestionResponse(
    val id: Long?,
    val userId: Long,
    val name: String,
    val age: String,
    val photoData: String? = null,
    val gender: Gender,
    val language: Language,
    val languageLevel: TeacherLanguageLevel,
    val timezone: String,
    val teachingGoals: List<Goal>,
    val minStudentLevel: StudentLanguageLevel,
    val maxStudentLevel: StudentLanguageLevel,
    val interests: List<Interest>,
    val teachingFrequency: TeachingFrequency,
    val lessonDuration: LessonDuration,
    val preferredTime: PreferredTime,
    val lessonPrice: Budget,
    val teachingStyle: TeachingStyle,
    val feedbackStyle: FeedbackStyle,
    val teachingMethod: TeachingMethod,
    val explanationStyle: ExplanationStyle,
    val homeworkApproach: HomeworkApproach,
    val createdAt: String
)

data class StudentQuestionRequest(
    val name: String,
    val age: String,
    val photoData: String? = null,
    val gender: Gender,
    val language: Language,
    val level: StudentLanguageLevel,
    val goals: List<Goal>,
    val frequency: Frequency,
    val duration: LessonDuration,
    val timezone: String,
    val preferredTime: PreferredTime,
    val budget: Budget,
    val communicationStyle: CommunicationStyle,
    val feedbackPreference: FeedbackPreference,
    val criticismResponse: CriticismResponse,
    val lessonFormat: LessonFormat,
    val interests: List<Interest>,
    val learningStyle: LearningStyle,
    val homeworkAttitude: HomeworkAttitude
)

data class StudentQuestionResponse(
    val id: Long?,
    val userId: Long,
    val name: String,
    val age: String,
    val photoData: String? = null,
    val gender: Gender,
    val language: Language,
    val level: StudentLanguageLevel,
    val goals: List<Goal>,
    val frequency: Frequency,
    val duration: LessonDuration,
    val timezone: String,
    val preferredTime: PreferredTime,
    val budget: Budget,
    val communicationStyle: CommunicationStyle,
    val feedbackPreference: FeedbackPreference,
    val criticismResponse: CriticismResponse,
    val lessonFormat: LessonFormat,
    val interests: List<Interest>,
    val learningStyle: LearningStyle,
    val homeworkAttitude: HomeworkAttitude,
    val createdAt: String
)
