import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Payout Dashboard</h1>
        <div className="header-actions">
          <button>Settings</button>
          <button>Logout</button>
        </div>
      </div>
    </header>
  )
}
