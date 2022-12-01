import {Component} from 'react'
import {Link} from 'react-router-dom'
import {ImMenu2} from 'react-icons/im'
import {MdOutlineCancel} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {displayingMenu: false}

  toggleMenuIcon = () => {
    this.setState(prevState => ({displayingMenu: !prevState.displayingMenu}))
  }

  displayOptionsOff = () => {
    this.setState({displayingMenu: false})
  }

  displayOptions = () => (
    <div className="menu-options-container">
      <ul className="menu-options">
        <div className="route-options">
          <Link to="/" className="menu-option">
            <li>
              <button type="button" className="button route">
                Home
              </button>
            </li>
          </Link>
          <Link to="/about" className="menu-option">
            <li>
              <button type="button" className="button route">
                About
              </button>
            </li>
          </Link>
        </div>

        <li>
          <button
            type="button"
            className="cancel-button"
            onClick={this.displayOptionsOff}
          >
            <MdOutlineCancel className="cancel-icon" />
          </button>
        </li>
      </ul>
    </div>
  )

  render() {
    const {displayingMenu} = this.state
    return (
      <>
        <div className="navbar-large-devices">
          <Link to="/" className="link">
            <span className="covid-heading">COVID19 </span>
            <span className="india">INDIA</span>
          </Link>

          <ul className="nav-items">
            <Link to="/" className="nav-item">
              <li>
                <button type="button" className="button route">
                  Home
                </button>
              </li>
            </Link>

            <Link to="/about" className="nav-item">
              <li>
                <button type="button" className="button route">
                  About
                </button>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mobile-devices-navbar">
          <Link to="/" className="link">
            <li>
              <span className="mobile-device-heading">COVID19 </span>
              <span className="INDIA">INDIA</span>
            </li>
          </Link>
          <button
            type="button"
            className="button"
            onClick={this.toggleMenuIcon}
          >
            <ImMenu2 className="menuIcon" alt="menu" />
          </button>
        </div>
        <div>{displayingMenu ? this.displayOptions() : ''}</div>
      </>
    )
  }
}

export default Header
