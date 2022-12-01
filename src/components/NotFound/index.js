import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-main-container">
      <img
        src="https://res.cloudinary.com/dft0aaxyb/image/upload/v1668488116/NotFound_jz9wuy.png"
        alt="not-found-pic"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found
      </p>

      <Link to="/">
        <button type="button" className="button-container">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
