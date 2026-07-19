const STORAGE_KEY = 'rozgarai_history'

export function saveAnalysis(analysis) {
  const history = getHistory()
  const newAnalysis = {
    id: Date.now().toString(),
    type: analysis.type,
    title: analysis.title,
    timestamp: new Date().toISOString(),
    content: analysis.content,
    metadata: analysis.metadata || {}
  }
  history.unshift(newAnalysis)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20))) // Keep last 20
}

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading history:', error)
    return []
  }
}

export function deleteAnalysis(id) {
  const history = getHistory()
  const filtered = history.filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getAnalysisById(id) {
  const history = getHistory()
  return history.find(item => item.id === id)
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}

export function exportAnalysis(analysis) {
  const content = `${analysis.title}\n\n${analysis.content}\n\nGenerated: ${analysis.timestamp}`
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  element.setAttribute('download', `${analysis.title.replace(/\s+/g, '_')}_${Date.now()}.txt`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
