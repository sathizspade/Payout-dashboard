import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <a href="#payouts">Payouts</a>
          </li>
          <li>
            <a href="#reports">Reports</a>
          </li>
          <li>
            <a href="#transactions">Transactions</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
