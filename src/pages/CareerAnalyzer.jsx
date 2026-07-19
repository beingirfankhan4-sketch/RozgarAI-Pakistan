import { useState } from 'react'
import { TextInput, TextArea, Select, MultilineInput } from '../components/FormInput'
import { LoadingState, SmallLoadingState } from '../components/LoadingState'
import { ErrorState, DemoModeNotice } from '../components/ErrorState'
import { analyzeCareer } from '../services/geminiService'
import { saveAnalysis } from '../services/storageService'
import { Download, Save, Copy } from 'lucide-react'

function CareerAnalyzer() {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: '',
    experience: '',
    targetRole: '',
    location: '',
    jobDescription: ''
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

    if (!formData.education || !formData.skills || !formData.targetRole) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const analysis = await analyzeCareer(formData)
      setResult(analysis)
      setIsDemo(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

      saveAnalysis({
        type: 'career-analysis',
        title: `${formData.targetRole} Career Analysis`,
        content: analysis,
        metadata: { targetRole: formData.targetRole, location: formData.location }
      })
    } catch (err) {
      setError('Failed to analyze career. Please try again.')
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
    element.setAttribute('download', `career_analysis_${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Career Analyzer</h1>
      <p className="text-slate-600 text-lg mb-8">Get personalized career analysis, interview questions, and a professional cover letter</p>

      {isDemo && <DemoModeNotice />}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label="Full Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              placeholder="Your name"
            />

            <TextArea
              label="Education"
              value={formData.education}
              onChange={(value) => handleInputChange('education', value)}
              placeholder="e.g., Bachelor's in Computer Science from University, 2023"
              required
            />

            <TextArea
              label="Skills"
              value={formData.skills}
              onChange={(value) => handleInputChange('skills', value)}
              placeholder="e.g., JavaScript, React, Node.js, MongoDB, REST APIs"
              required
            />

            <TextArea
              label="Work Experience"
              value={formData.experience}
              onChange={(value) => handleInputChange('experience', value)}
              placeholder="e.g., 2 years as Junior Developer at Company X, worked on web projects"
            />

            <TextInput
              label="Target Job Role"
              value={formData.targetRole}
              onChange={(value) => handleInputChange('targetRole', value)}
              placeholder="e.g., Senior Frontend Developer"
              required
            />

            <Select
              label="Preferred Location"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              options={[
                'Karachi',
                'Lahore',
                'Islamabad',
                'Multan',
                'Peshawar',
                'Quetta',
                'Rawalpindi',
                'Remote',
                'Abroad'
              ]}
            />

            <TextArea
              label="Job Description (Optional)"
              value={formData.jobDescription}
              onChange={(value) => handleInputChange('jobDescription', value)}
              placeholder="Paste the job description you're interested in. AI will match your profile against this."
              rows={6}
            />

            {error && <ErrorState message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary gradient-hover text-white py-3 rounded-lg font-bold disabled:opacity-50 smooth-transition"
            >
              {loading ? 'Analyzing...' : 'Analyze My Career'}
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
                <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
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
              <p className="text-slate-600 text-lg">Fill in your profile and submit to get your personalized analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CareerAnalyzer
