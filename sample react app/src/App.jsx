import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [deployTime] = useState(new Date().toLocaleString())
  const [uptime, setUptime] = useState(0)
  
  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(uptimeInterval)
  }, [])
  
  return (
    <div className="dashboard">
      <div className="content-center">
        <div className="logo">⚡ FastDeploy</div>
        
        <div className="success-message">
          <h1>Test React Vite Project</h1>
          <p>Successfully Deployed!</p>
        </div>
        
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-value">{uptime}s</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{deployTime}</div>
            <div className="stat-label">Deployed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App