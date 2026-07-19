import { useState } from 'react'
import { TextArea } from '../components/FormInput'
import { LoadingState } from '../components/LoadingState'
import { ErrorState, DemoModeNotice } from '../components/ErrorState'
import { analyzeJobDescription } from '../services/geminiService'
import { saveAnalysis } from '../services/storageService'
import { Download, Copy } from 'lucide-react'

function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isDemo, setIsDemo] = useState(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!jobDescription.trim()) {
      setError('Please paste a job description')
      return
    }

    setLoading(true)
    try {
      const analysis = await analyzeJobDescription(jobDescription)
      setResult(analysis)
      setIsDemo(!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here')

      saveAnalysis({
        type: 'job-analysis',
        title: 'Job Description Analysis',
        content: analysis,
        metadata: { wordCount: jobDescription.split(' ').length }
      })
    } catch (err) {
      setError('Failed to analyze job description. Please try again.')
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
    element.setAttribute('download', `job_analysis_${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sampleJobs = [
    {
      title: 'Frontend Developer',
      description: 'We are looking for an experienced Frontend Developer with 3+ years of experience in React and JavaScript. You will work with our team to build responsive web applications. Requirements: React, JavaScript, HTML/CSS, REST APIs, Git. Nice to have: TypeScript, Redux, Next.js.'
    },
    {
      title: 'Data Analyst',
      description: 'Join our analytics team as a Data Analyst. Analyze business data using SQL and Python. Create reports and dashboards. Requirements: SQL, Excel, Data Analysis, Communication skills. Preferred: Python, Tableau, Power BI.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Job Description Analyzer</h1>
      <p className="text-slate-600 text-lg mb-8">Paste a job description and get AI-powered insights about requirements, responsibilities, and preparation tips</p>

      {isDemo && <DemoModeNotice />}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Paste Job Description</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextArea
              label="Job Description"
              value={jobDescription}
              onChange={setJobDescription}
              placeholder="Paste the complete job description here. You can copy it from LinkedIn, company website, or job portal."
              rows={10}
              required
            />

            {error && <ErrorState message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary gradient-hover text-white py-3 rounded-lg font-bold disabled:opacity-50 smooth-transition"
            >
              {loading ? 'Analyzing...' : 'Analyze Job Description'}
            </button>

            {/* Sample Jobs */}
            <div className="border-t pt-6 mt-6">
              <p className="text-sm font-semibold text-slate-700 mb-3">Try with sample jobs:</p>
              <div className="space-y-2">
                {sampleJobs.map((job, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setJobDescription(job.description)}
                    className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm smooth-transition"
                  >
                    <span className="font-semibold text-blue-900">{job.title}</span>
                    <p className="text-xs text-blue-700 mt-1">{job.description.substring(0, 80)}...</p>
                  </button>
                ))}
              </div>
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
              <p className="text-slate-600 text-lg">Paste a job description to see detailed analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobAnalyzer
