import React from 'react'
import Link  from 'next/link'


const Header = () => {
  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg top-0  fixed-top navbar-custom navbar-light sticky menu_dropdown nav-sticky"
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          <span className="flex justify-center items-center space-x-4">
            <span className="w-10">
              <img src="/assets/img/apple-touch-icon.png" alt="logo" />
            </span>
            Cryptonomize
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-align-justify"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul id="navbar-navlist" className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/feature">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pricing">
                Plans
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/team">
                Team
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item items-center justify-center">
              <Link className="btn_one" href="/login">
                login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
