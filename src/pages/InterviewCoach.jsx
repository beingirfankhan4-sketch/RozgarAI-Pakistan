import { useState } from 'react'
import { TextInput, TextArea, Select } from '../components/FormInput'
import { LoadingState } from '../components/LoadingState'
import { ErrorState, DemoModeNotice } from '../components/ErrorState'
import { generateInterviewCoaching } from '../services/geminiService'
import { saveAnalysis } from '../services/storageService'
import { Download, Copy } from 'lucide-react'

function InterviewCoach() {
  const [formData, setFormData] = useState({
    targetRole: '',
    experienceLevel: '',
    skills: ''
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

    if (!formData.targetRole || !formData.experienceLevel) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const coaching = await generateInterviewCoaching(formData)
      setResult(coaching)
      setIsDemo(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

      saveAnalysis({
        type: 'interview-coaching',
        title: `Interview Prep - ${formData.targetRole}`,
        content: coaching,
        metadata: { targetRole: formData.targetRole, experienceLevel: formData.experienceLevel }
      })
    } catch (err) {
      setError('Failed to generate interview coaching. Please try again.')
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
    element.setAttribute('download', `interview_prep_${formData.targetRole.replace(/\s+/g, '_')}_${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Interview Coach</h1>
      <p className="text-slate-600 text-lg mb-8">Prepare for interviews with role-specific questions, sample answers, and expert tips</p>

      {isDemo && <DemoModeNotice />}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Interview Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label="Target Job Role"
              value={formData.targetRole}
              onChange={(value) => handleInputChange('targetRole', value)}
              placeholder="e.g., Frontend Developer, Data Analyst, Product Manager"
              required
            />

            <Select
              label="Experience Level"
              value={formData.experienceLevel}
              onChange={(value) => handleInputChange('experienceLevel', value)}
              options={[
                'Fresher (0-1 years)',
                'Junior (1-3 years)',
                'Mid-Level (3-6 years)',
                'Senior (6+ years)',
                'Lead/Manager'
              ]}
              required
            />

            <TextArea
              label="Your Key Skills"
              value={formData.skills}
              onChange={(value) => handleInputChange('skills', value)}
              placeholder="e.g., JavaScript, React, Node.js, MongoDB, AWS, Problem-solving, Team leadership"
            />

            {error && <ErrorState message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary gradient-hover text-white py-3 rounded-lg font-bold disabled:opacity-50 smooth-transition"
            >
              {loading ? 'Preparing...' : 'Get Interview Questions'}
            </button>

            {/* Quick Tips */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded text-sm text-slate-700">
              <p className="font-semibold text-blue-900 mb-2">💡 Interview Tips</p>
              <ul className="space-y-1 text-xs">
                <li>• Prepare 3-5 success stories using the STAR method</li>
                <li>• Research the company thoroughly before the interview</li>
                <li>• Practice your answers but don't memorize word-for-word</li>
                <li>• Maintain eye contact and good body language</li>
                <li>• Ask thoughtful questions at the end</li>
              </ul>
            </div>
          </form>
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <LoadingState />
          ) : result ? (
            <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Interview Guide</h2>
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
              <p className="text-slate-600 text-lg">Enter your role and experience level to get personalized interview questions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterviewCoach
