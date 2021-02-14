import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const Header = () => (
  <header className="header">
    <Link to="/leagues" className="logo">SoccerStats</Link>

    <div>
      <Link to="/leagues" className="header-item">Leagues</Link>
      <Link to="/teams" className="header-item">Teams</Link>
    </div>
  </header>
)

export default Header