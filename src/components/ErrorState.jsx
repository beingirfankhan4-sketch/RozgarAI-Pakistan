import { AlertCircle } from 'lucide-react'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex gap-4">
      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold text-red-900">Error</h3>
        <p className="text-red-700 text-sm mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 smooth-transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export function DemoModeNotice() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-6">
      <div className="text-2xl">⚙️</div>
      <div>
        <p className="font-semibold text-amber-900 text-sm">Demo Mode</p>
        <p className="text-amber-700 text-xs mt-1">API key not configured. Showing demo results. Add VITE_GEMINI_API_KEY to .env to use live AI analysis.</p>
      </div>
    </div>
  )
}
