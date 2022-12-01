import {Link} from 'react-router-dom'

import './index.css'

const StateDetails = props => {
  const {stateInfo} = props
  const {
    stateName,
    stateCode,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = stateInfo
  return (
    <li className="detail-container">
      <Link to={`/state/${stateCode}`} className="state-name">
        <p className="name">{stateName}</p>
      </Link>
      <div className="state-count">
        <p className="state-details-count red">{confirmed}</p>
      </div>
      <div className="state-count">
        <p className="state-details-count blue">{active}</p>
      </div>
      <div className="state-count">
        <p className="state-details-count green">{recovered}</p>
      </div>
      <div className="state-count">
        <p className="state-details-count ash">{deceased}</p>
      </div>
      <div className="state-count">
        <p className="state-details-count ash">{population}</p>
      </div>
    </li>
  )
}

export default StateDetails
