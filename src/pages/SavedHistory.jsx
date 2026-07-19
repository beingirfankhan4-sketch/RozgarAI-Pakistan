import { useState, useEffect } from 'react'
import { getHistory, deleteAnalysis, exportAnalysis } from '../services/storageService'
import { Trash2, Download, Calendar, FileText } from 'lucide-react'

function SavedHistory() {
  const [history, setHistory] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    setHistory(getHistory())
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(id)
      loadHistory()
    }
  }

  const handleExport = (analysis) => {
    exportAnalysis(analysis)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-PK', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeIcon = (type) => {
    const icons = {
      'career-analysis': '🎯',
      'job-analysis': '📋',
      'cv-profile': '📄',
      'interview-coaching': '💬'
    }
    return icons[type] || '📝'
  }

  const getTypeBadgeColor = (type) => {
    const colors = {
      'career-analysis': 'bg-blue-100 text-blue-800',
      'job-analysis': 'bg-green-100 text-green-800',
      'cv-profile': 'bg-purple-100 text-purple-800',
      'interview-coaching': 'bg-orange-100 text-orange-800'
    }
    return colors[type] || 'bg-slate-100 text-slate-800'
  }

  const selectedAnalysis = history.find(item => item.id === selectedId)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Saved History</h1>
      <p className="text-slate-600 text-lg mb-8">View and manage your previous analyses</p>

      {history.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Analyses Yet</h3>
          <p className="text-slate-600">Your saved analyses will appear here. Start by analyzing your career, a job description, or building your CV.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden card-glow">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <h2 className="font-bold text-lg">Analyses ({history.length})</h2>
            </div>
            <div className="divide-y max-h-screen overflow-y-auto">
              {history.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 hover:bg-slate-50 smooth-transition border-l-4 ${
                    selectedId === item.id 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'border-transparent hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{getTypeIcon(item.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${getTypeBadgeColor(item.type)}`}>
                          {item.type.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-2">
            {selectedAnalysis ? (
              <div className="bg-white rounded-lg shadow-lg p-8 card-glow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{getTypeIcon(selectedAnalysis.type)}</span>
                      <h2 className="text-3xl font-bold text-slate-900">{selectedAnalysis.title}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(selectedAnalysis.type)}`}>
                        {selectedAnalysis.type.replace('-', ' ')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedAnalysis.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExport(selectedAnalysis)}
                      className="p-3 hover:bg-slate-100 rounded-lg smooth-transition text-slate-600"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedAnalysis.id)
                        setSelectedId(null)
                      }}
                      className="p-3 hover:bg-red-50 rounded-lg smooth-transition text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Content</h3>
                  <div className="bg-slate-50 p-6 rounded-lg max-h-96 overflow-y-auto text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {selectedAnalysis.content}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-12 text-center h-full flex flex-col items-center justify-center">
                <FileText className="w-16 h-16 text-blue-400 mb-4" />
                <p className="text-slate-600 text-lg">Select an analysis to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedHistory
