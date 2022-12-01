import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchResults = props => {
  const {stateDetails} = props
  const {stateName, stateCode} = stateDetails
  return (
    <Link to={`/state/${stateCode}`} className="nav-link">
      <li className="list-item">
        <h1 className="stateName">{stateName}</h1>
        <div className="button-style">
          <p className="stateCode">{stateCode}</p>
          <button type="button" className="right-click-icon-container">
            <BiChevronRightSquare className="right-click-icon" />
          </button>
        </div>
      </li>
    </Link>
  )
}

export default SearchResults
