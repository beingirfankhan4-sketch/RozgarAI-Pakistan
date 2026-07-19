export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="flex gap-2">
        <div className="pulse-loader" style={{animationDelay: '0s'}}></div>
        <div className="pulse-loader" style={{animationDelay: '0.3s'}}></div>
        <div className="pulse-loader" style={{animationDelay: '0.6s'}}></div>
      </div>
      <p className="text-slate-600 font-medium">Analyzing your career...</p>
    </div>
  )
}

export function SmallLoadingState() {
  return (
    <div className="flex items-center gap-2 text-blue-600">
      <div className="pulse-loader" style={{animationDelay: '0s'}}></div>
      <span className="text-sm font-medium">Generating content...</span>
    </div>
  )
}
