import { useState } from 'react'
import { TextInput, TextArea } from '../components/FormInput'
import { LoadingState } from '../components/LoadingState'
import { ErrorState, DemoModeNotice } from '../components/ErrorState'
import { buildCVProfile } from '../services/geminiService'
import { saveAnalysis } from '../services/storageService'
import { Download, Copy } from 'lucide-react'

function CVBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: '',
    experience: '',
    projects: '',
    achievements: '',
    targetJob: ''
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isDemo, setIsDemo] = useState(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.education || !formData.targetJob) {
      setError('Please fill in Name, Education, and Target Job')
      return
    }

    setLoading(true)
    try {
      const content = await buildCVProfile(formData)
      setResult(content)
      setIsDemo(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

      saveAnalysis({
        type: 'cv-profile',
        title: `CV Profile - ${formData.targetJob}`,
        content: content,
        metadata: { name: formData.name, targetJob: formData.targetJob }
      })
    } catch (err) {
      setError('Failed to generate CV content. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
    element.setAttribute('download', `cv_profile_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">AI CV Builder</h1>
      <p className="text-slate-600 text-lg mb-8">Generate professional CV content with profile summary, career objective, and achievement-focused bullet points</p>

      {isDemo && <DemoModeNotice />}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label="Full Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              placeholder="Your full name"
              required
            />

            <TextArea
              label="Education"
              value={formData.education}
              onChange={(value) => handleInputChange('education', value)}
              placeholder="e.g., Bachelor's in Computer Science from University X, 2023\nRelevant Coursework: Data Structures, Web Development, Database Systems"
              required
            />

            <TextArea
              label="Skills"
              value={formData.skills}
              onChange={(value) => handleInputChange('skills', value)}
              placeholder="e.g., JavaScript, React, Node.js, MongoDB, SQL, REST APIs, Git"
            />

            <TextArea
              label="Work Experience"
              value={formData.experience}
              onChange={(value) => handleInputChange('experience', value)}
              placeholder="e.g., Intern at Company X (Jan-Jun 2023)\nWorked on React projects, improved performance by 20%\n\nFreelance Developer (2022-Present)\nBuilt 5+ web applications for clients"
            />

            <TextArea
              label="Projects"
              value={formData.projects}
              onChange={(value) => handleInputChange('projects', value)}
              placeholder="e.g., E-Commerce Platform: Full-stack app using React, Node.js, MongoDB\nTask Manager App: Built with React and Firebase"
            />

            <TextArea
              label="Achievements"
              value={formData.achievements}
              onChange={(value) => handleInputChange('achievements', value)}
              placeholder="e.g., Won 3rd place in Code Competition 2023\nMaintain 3.8 CGPA\nContributor to open source projects"
            />

            <TextInput
              label="Target Job Role"
              value={formData.targetJob}
              onChange={(value) => handleInputChange('targetJob', value)}
              placeholder="e.g., Senior Frontend Developer"
              required
            />

            {error && <ErrorState message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary gradient-hover text-white py-3 rounded-lg font-bold disabled:opacity-50 smooth-transition"
            >
              {loading ? 'Generating...' : 'Generate CV Content'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <LoadingState />
          ) : result ? (
            <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">CV Content</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-slate-100 rounded-lg smooth-transition"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-slate-100 rounded-lg smooth-transition"
                    title="Download as text file"
                  >
                    <Download className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
              {copied && <p className="text-green-600 text-sm mb-4">✓ Copied to clipboard</p>}
              <div className="bg-slate-50 p-6 rounded-lg max-h-96 overflow-y-auto text-sm text-slate-700 whitespace-pre-wrap font-mono">
                {result}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
              <p className="text-slate-600 text-lg">Fill in your information to generate professional CV content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CVBuilder
