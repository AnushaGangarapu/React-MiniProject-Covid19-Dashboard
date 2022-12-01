import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-heading">
        COVID19<span className="span-element">INDIA</span>
      </h1>
      <p className="footer-paragraph">
        We stand with everyone fighting on the front lines
      </p>
      <div>
        <VscGithubAlt className="social-icon" />
        <FiInstagram className="social-icon" />
        <FaTwitter className="social-icon" />
      </div>
    </div>
  )
}
