import { ArrowRight, Zap, Target, BookOpen, Users, Award, CheckCircle } from 'lucide-react'

function Home({ onNavigate }) {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Career Analysis',
      description: 'Get a realistic match score and personalized recommendations for your target role'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Job Description Breakdown',
      description: 'Understand job requirements, responsibilities, and skills needed'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'CV Builder',
      description: 'Generate professional CV content tailored to your target position'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Interview Coach',
      description: 'Prepare with role-specific questions and expert sample answers'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Cover Letter Generation',
      description: 'Create compelling cover letters for your dream job'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Saved History',
      description: 'Keep track of all your analyses and revisit them anytime'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Your Skills. Your Career. Your Future.
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            RozgarAI Pakistan is your intelligent career companion, helping Pakistani students and job seekers succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('career-analyzer')}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-50 smooth-transition shadow-lg"
            >
              <Target className="w-5 h-5" />
              Analyze My Career
            </button>
            <button
              onClick={() => onNavigate('job-analyzer')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 smooth-transition"
            >
              <BookOpen className="w-5 h-5" />
              Analyze a Job
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Challenge</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Navigating career transitions is challenging. Most job seekers struggle with:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">❌</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Unclear Job Requirements</h3>
                <p className="text-slate-600">Job descriptions use jargon that can be confusing and intimidating</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">❌</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Self-Assessment Confusion</h3>
                <p className="text-slate-600">Not knowing if you're actually qualified for the role you want</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">❌</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Skill Gap Identification</h3>
                <p className="text-slate-600">Uncertainty about what skills to develop next for career growth</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">❌</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Application Quality</h3>
                <p className="text-slate-600">Struggling to write compelling CVs, cover letters, and prepare for interviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Solution</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              RozgarAI Pakistan uses advanced AI to provide personalized career guidance:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Clear Analysis</h3>
                <p className="text-slate-600">Break down complex job descriptions into understandable requirements</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Match Assessment</h3>
                <p className="text-slate-600">Get an honest match score with your target role based on AI analysis</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Growth Roadmap</h3>
                <p className="text-slate-600">Receive prioritized recommendations for skill development</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Ready-to-Use Content</h3>
                <p className="text-slate-600">Get professional CV content, cover letters, and interview preparation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Our Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card-glow p-6 bg-white rounded-lg">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Who Is This For?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Students</h3>
              <p className="text-slate-600">Explore career options and understand job market requirements before graduation</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Fresh Graduates</h3>
              <p className="text-slate-600">Land your first job with AI-guided preparation and personalized guidance</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Job Seekers</h3>
              <p className="text-slate-600">Make informed career transitions with skill gap analysis and growth plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8">Start your AI-powered career journey today</p>
          <button
            onClick={() => onNavigate('career-analyzer')}
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-blue-50 smooth-transition shadow-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
