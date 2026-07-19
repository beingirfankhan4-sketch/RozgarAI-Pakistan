import { useState, useEffect } from 'react'
import Home from './pages/Home'
import CareerAnalyzer from './pages/CareerAnalyzer'
import JobAnalyzer from './pages/JobAnalyzer'
import CVBuilder from './pages/CVBuilder'
import InterviewCoach from './pages/InterviewCoach'
import SavedHistory from './pages/SavedHistory'
import Navigation from './components/Navigation'
import { Menu, X } from 'lucide-react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigateTo = (page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentPage={currentPage} onNavigate={navigateTo} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="pt-20">
        {currentPage === 'home' && <Home onNavigate={navigateTo} />}
        {currentPage === 'career-analyzer' && <CareerAnalyzer />}
        {currentPage === 'job-analyzer' && <JobAnalyzer />}
        {currentPage === 'cv-builder' && <CVBuilder />}
        {currentPage === 'interview-coach' && <InterviewCoach />}
        {currentPage === 'saved-history' && <SavedHistory />}
      </main>
      
      <footer className="bg-slate-900 text-white text-center py-8 mt-20">
        <p className="text-sm">© 2024 RozgarAI Pakistan. Your Skills. Your Career. Your Future.</p>
        <p className="text-xs text-slate-400 mt-2">RozgarAI Pakistan provides AI-generated career preparation assistance. Results do not guarantee employment or job selection.</p>
      </footer>
    </div>
  )
}

export default App
