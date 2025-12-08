import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
