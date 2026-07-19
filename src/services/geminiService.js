import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

let client = null
let model = null

if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  try {
    client = new GoogleGenerativeAI(API_KEY)
    model = client.getGenerativeModel({ model: 'gemini-pro' })
  } catch (error) {
    console.error('Failed to initialize Gemini:', error)
  }
}

const SYSTEM_PROMPT = `You are RozgarAI Pakistan, a professional AI career assistant designed for Pakistani students, fresh graduates, and job seekers.

Analyze the user's education, skills, experience, target role, location, and job description carefully.

Your responsibilities:

1. Give honest and realistic career analysis.
2. Never guarantee employment or job selection.
3. Clearly separate existing strengths from missing skills.
4. Recommend practical improvement priorities.
5. Generate professional and truthful CV content.
6. Never invent experience, qualifications, companies, certificates, or achievements.
7. Tailor recommendations to the user's target role and the Pakistani job market when relevant.
8. Use clear professional English unless the user requests another language.
9. Keep responses structured and easy to understand.
10. For job matching, provide a score from 0 to 100 and explain the reasoning.
11. For cover letters, use only information provided by the user.
12. For interview coaching, provide realistic questions and strong sample answers.
13. If information is missing, clearly say what is missing instead of inventing it.

Return structured results with clear headings. You are an assistant for career preparation, not an employment guarantee service.`

export async function analyzeCareer(careerData) {
  if (!client || !model) {
    return getDemoCareerAnalysis(careerData)
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

Please analyze the following candidate's profile for their target role:

Education: ${careerData.education}
Skills: ${careerData.skills}
Work Experience: ${careerData.experience}
Target Role: ${careerData.targetRole}
Preferred Location: ${careerData.location}

Job Description:
${careerData.jobDescription}

Provide a detailed analysis including:
1. Job Match Score (0-100)
2. Candidate Strengths (3-5 bullet points)
3. Missing Skills (3-5 bullet points)
4. Priority Improvement Areas (3 bullet points)
5. Career Analysis (2-3 paragraphs)
6. 5 Role-Specific Interview Questions with Strong Sample Answers
7. A Professional Cover Letter tailored to this role

Format the response with clear headings for each section.`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('API Error:', error)
    return getDemoCareerAnalysis(careerData)
  }
}

export async function analyzeJobDescription(jobDescription) {
  if (!client || !model) {
    return getDemoJobAnalysis(jobDescription)
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

Please analyze the following job description:

${jobDescription}

Extract and provide:
1. Job Title
2. Key Responsibilities (bullet points)
3. Required Skills
4. Preferred Skills
5. Experience Requirements
6. Important Keywords
7. Simple Explanation of the Job (for beginners)
8. Preparation Suggestions for candidates

Format with clear headings for each section.`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('API Error:', error)
    return getDemoJobAnalysis(jobDescription)
  }
}

export async function buildCVProfile(cvData) {
  if (!client || !model) {
    return getDemoCVProfile(cvData)
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

Please generate professional CV content based on this profile:

Name: ${cvData.name}
Education: ${cvData.education}
Skills: ${cvData.skills}
Experience: ${cvData.experience}
Projects: ${cvData.projects}
Achievements: ${cvData.achievements}
Target Job: ${cvData.targetJob}

Generate:
1. Professional Profile Summary (2-3 sentences)
2. Career Objective (1-2 sentences)
3. Achievement-Focused CV Bullet Points (5-7 bullets for experience section)
4. Relevant Skills Section (organized by category)

Format with clear headings. Only use information provided by the user.`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('API Error:', error)
    return getDemoCVProfile(cvData)
  }
}

export async function generateInterviewCoaching(coachingData) {
  if (!client || !model) {
    return getDemoInterviewCoaching(coachingData)
  }

  try {
    const prompt = `${SYSTEM_PROMPT}

Please generate interview coaching content for:

Target Role: ${coachingData.targetRole}
Experience Level: ${coachingData.experienceLevel}
Skills: ${coachingData.skills}

Generate:
1. 8-10 Common Interview Questions for this role
2. Strong Sample Answers for each question
3. 3-4 Technical Questions (if applicable to the role)
4. 3-4 HR and Behavioral Questions
5. Preparation Tips (5-7 tips)
6. Common Mistakes to Avoid (5 points)

Format with clear headings and make answers realistic and professional.`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('API Error:', error)
    return getDemoInterviewCoaching(coachingData)
  }
}

// Demo functions for fallback
function getDemoCareerAnalysis(data) {
  return `# Career Analysis Report

## Job Match Score
**75/100** - Strong fit with some growth opportunities

## Candidate Strengths
- Relevant technical skills in core requirements
- Solid educational background
- Progressive career growth
- Problem-solving abilities
- Team collaboration experience

## Missing Skills
- Advanced proficiency in specific tool (e.g., Cloud platforms)
- Leadership experience
- Project management certification
- Industry-specific certifications

## Priority Improvement Areas
1. Develop cloud computing skills (AWS/Azure/GCP)
2. Pursue relevant industry certifications
3. Build leadership experience through team projects

## Career Analysis
Based on your background in ${data.skills}, you show strong potential for the ${data.targetRole} role. Your experience demonstrates consistent growth and the ability to handle increasing complexity. To improve your match score further, focus on the identified skill gaps and seek opportunities that provide broader exposure to modern tools and methodologies.

## Interview Questions & Sample Answers

### Question 1: Tell us about your most challenging project and how you overcame it.
**Strong Answer:** Describe a specific project, the challenges faced, your approach to solving it, and the measurable results. Highlight problem-solving and resilience.

### Question 2: What attracted you to this role?
**Strong Answer:** Show genuine interest in the role and company. Connect your skills to their needs. Mention specific aspects of their work or culture.

### Question 3: How do you handle working with difficult team members?
**Strong Answer:** Share a specific example demonstrating empathy, communication skills, and ability to find common ground.

### Question 4: Where do you see yourself in 5 years?
**Strong Answer:** Discuss career growth aligned with the role and company. Be realistic and show ambition.

### Question 5: Describe a situation where you had to learn something quickly.
**Strong Answer:** Highlight learning ability and adaptability with a concrete example.

## Cover Letter

Dear Hiring Manager,

I am writing to express my strong interest in the ${data.targetRole} position at your esteemed organization in ${data.location}. With my background in ${data.education} and practical experience in ${data.skills}, I am confident in my ability to contribute meaningfully to your team.

Throughout my career, I have demonstrated consistent ability to deliver results and grow professionally. My experience in ${data.experience} has equipped me with the technical and interpersonal skills necessary for success in this role.

I am particularly excited about this opportunity as it aligns perfectly with my career goals and offers the chance to work with innovative technologies and talented professionals. I am eager to bring my problem-solving skills, technical knowledge, and strong work ethic to your organization.

Thank you for considering my application. I look forward to discussing how I can contribute to your team.

Best regards,
${data.name || 'Your Name'}`
}

function getDemoJobAnalysis(jobDescription) {
  return `# Job Description Analysis

## Job Title
Software Developer / Engineer (Based on provided description)

## Key Responsibilities
- Develop and maintain software applications
- Collaborate with cross-functional teams
- Debug and troubleshoot code
- Write clean and efficient code
- Participate in code reviews
- Contribute to technical documentation

## Required Skills
- Programming languages (Java, Python, JavaScript, or C++)
- Problem-solving abilities
- Understanding of software development lifecycle
- Version control (Git)
- Basic database knowledge
- Communication skills

## Preferred Skills
- Experience with cloud platforms (AWS, GCP, Azure)
- Knowledge of microservices architecture
- Familiarity with containerization (Docker, Kubernetes)
- Agile/Scrum experience
- CI/CD pipeline experience

## Experience Requirements
- 2-5 years of relevant experience (typically)
- Proven track record of successful projects
- Team collaboration experience

## Important Keywords
Software development, programming, coding, debugging, testing, deployment, Git, REST APIs, databases, agile, DevOps

## Simple Explanation
This job involves writing computer code to create and improve software applications. You'll work with other developers, fix problems when they arise, and make sure the code is clean and efficient. It's a role that requires both technical skills and the ability to work well with others.

## Preparation Suggestions
1. Review fundamental programming concepts
2. Prepare examples of past projects you've worked on
3. Practice coding problems
4. Learn about the company's tech stack
5. Be ready to discuss how you handle debugging and problem-solving
6. Familiarize yourself with version control systems
7. Research recent technologies in the field`
}

function getDemoCVProfile(data) {
  return `# CV Content Generator

## Professional Profile Summary
${data.name} is a dedicated professional with ${data.education} and hands-on experience in ${data.skills}. Known for delivering quality results and adapting to new challenges, bringing a strong combination of technical expertise and problem-solving abilities to every project.

## Career Objective
Seeking a challenging ${data.targetJob} position where I can leverage my technical skills and experience to contribute to organizational growth while continuing to develop my professional expertise.

## Achievement-Focused Bullet Points
- Successfully delivered ${data.projects || 'multiple projects'} demonstrating technical proficiency and attention to detail
- Collaborated with cross-functional teams to achieve ${data.achievements || 'project objectives'}} improving efficiency by X%
- Implemented solutions that resulted in measurable improvements in performance or user experience
- Mentored junior team members contributing to team growth and knowledge sharing
- Consistently met deadlines while maintaining high quality standards
- Demonstrated adaptability and quick learning of new technologies and methodologies
- Took ownership of challenging problems and delivered innovative solutions

## Relevant Skills

**Technical Skills**
${data.skills.split(',').slice(0, 3).join(', ')}

**Professional Skills**
- Problem-solving and analytical thinking
- Team collaboration and communication
- Project management
- Time management
- Attention to detail

**Tools & Technologies**
${data.skills}`
}

function getDemoInterviewCoaching(data) {
  return `# Interview Coaching Guide

## Interview Questions for ${data.targetRole}

### Question 1: Tell me about yourself.
**Sample Answer:** Start with your professional background, highlight relevant experiences, mention your key skills, and explain why you're interested in the role.

### Question 2: What are your key strengths?
**Sample Answer:** Choose 2-3 strengths relevant to the role with examples. For a ${data.targetRole} role, emphasize: ${data.skills}

### Question 3: Describe a challenging situation and how you resolved it.
**Sample Answer:** Use the STAR method (Situation, Task, Action, Result). Show problem-solving abilities and resilience.

### Question 4: Why do you want this job?
**Sample Answer:** Show genuine interest, connect your skills to their needs, mention specific aspects of the company.

### Question 5: What is your greatest weakness?
**Sample Answer:** Choose a real weakness, explain how you're working to improve it, and show self-awareness.

### Question 6: Tell us about a time you worked in a team.
**Sample Answer:** Highlight collaboration, communication, and your role in team success.

### Question 7: Where do you see yourself in 5 years?
**Sample Answer:** Discuss career growth aligned with the role, be realistic and show ambition.

### Question 8: Do you have any questions for us?
**Sample Answer:** Ask insightful questions about the role, team, or company culture.

## Technical Questions

### Question 1: Describe your experience with ${data.skills}.
**Sample Answer:** Provide specific projects where you've used these skills, measurable outcomes, and lessons learned.

### Question 2: How do you approach learning new technologies?
**Sample Answer:** Show self-learning initiative, mention resources you use, give examples of technologies you've mastered.

## Preparation Tips
1. **Research the Company** - Know their mission, values, recent news, and culture
2. **Practice Common Questions** - Prepare responses using the STAR method
3. **Prepare Examples** - Have 4-5 stories ready that highlight your strengths
4. **Mock Interviews** - Practice with friends or mentors
5. **Know Your CV** - Be ready to elaborate on any point in your CV
6. **Dress Appropriately** - Research company culture and dress one level above
7. **Arrive Early** - Plan your journey to arrive 10-15 minutes early

## Common Mistakes to Avoid
1. Speaking negatively about previous employers
2. Not preparing questions to ask the interviewer
3. Being late or disorganized
4. Over-sharing personal information
5. Appearing disinterested or unmotivated`
}
