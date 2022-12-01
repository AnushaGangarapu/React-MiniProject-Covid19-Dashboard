import {Component} from 'react'
import './index.css'

class StateCasesData extends Component {
  state = {
    casesConfirmed: {},
    casesActive: {},
    casesRecovered: {},
    casesDeceased: {},
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    const {stateTotalCases} = this.props
    const {confirmed, deceased, recovered} = stateTotalCases
    const active = confirmed - (recovered + deceased)

    const casesConfirmed = {
      category: 'Confirmed',
      imageUrl:
        'https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487468/confirmed_hre6fp.png',
      alt: 'state specific confirmed cases pic',
      count: confirmed,
    }

    const casesActive = {
      category: 'Active',
      imageUrl:
        'https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487692/protection_vnx7hk.png',
      alt: 'state specific active cases pic',
      count: active,
    }

    const casesRecovered = {
      category: 'Recovered',
      imageUrl:
        'https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487728/recovered_uloqty.png',
      alt: 'state specific recovered cases pic',
      count: recovered,
    }
    const casesDeceased = {
      category: 'Deceased',
      imageUrl:
        'https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487650/breathing_gelhzj.png',
      alt: 'state specific deceased cases pic',
      count: deceased,
    }

    this.setState({
      casesConfirmed,
      casesActive,
      casesRecovered,
      casesDeceased,
    })
  }

  selectedTab = value => {
    const {updateCategory} = this.props
    updateCategory(value)
  }

  render() {
    const {
      casesConfirmed,
      casesActive,
      casesDeceased,
      casesRecovered,
    } = this.state
    const {active} = this.props

    const activeTabAfterRender = active ? 'firstActiveTab' : ''

    return (
      <>
        <ul className="state-total-data">
          <li
            className={` list-items  confirmed-container ${activeTabAfterRender}`}
            key={casesConfirmed.category}
            onClick={() => this.selectedTab(casesConfirmed.category)}
          >
            <div
              /* testid="stateSpecificConfirmedCasesContainer" */
              className="confirm"
            >
              <p className="list-item-paragraph">{casesConfirmed.category}</p>
              <img
                src={casesConfirmed.imageUrl}
                alt={casesConfirmed.alt}
                className="list-item-icon"
              />
              <p className="list-item-count">{casesConfirmed.count}</p>
            </div>
          </li>
          <li
            className="list-items active-container"
            key={casesActive.category}
            onClick={() => this.selectedTab(casesActive.category)}
          >
            <div
              /* testid="stateSpecificActiveCasesContainer" */ className="active"
            >
              <p className="list-item-paragraph">{casesActive.category}</p>
              <img
                src={casesActive.imageUrl}
                alt={casesActive.alt}
                className="list-item-icon"
              />
              <p className="list-item-count">{casesActive.count}</p>
            </div>
          </li>
          <li
            className="list-items recovered-container"
            key={casesRecovered.category}
            onClick={() => this.selectedTab(casesRecovered.category)}
          >
            <div
              /* testid="stateSpecificRecoveredCasesContainer" */
              className="recovered"
            >
              <p className="list-item-paragraph">{casesRecovered.category}</p>
              <img
                src={casesRecovered.imageUrl}
                alt={casesRecovered.alt}
                className="list-item-icon"
              />
              <p className="list-item-count">{casesRecovered.count}</p>
            </div>
          </li>
          <li
            className="list-items deceased-container"
            key={casesDeceased.category}
            onClick={() => this.selectedTab(casesDeceased.category)}
          >
            <div
              /*  testid="stateSpecificDeceasedCasesContainer" */
              className="deceased"
            >
              <p className="list-item-paragraph">{casesDeceased.category}</p>
              <img
                src={casesDeceased.imageUrl}
                alt={casesDeceased.alt}
                className="list-item-icon"
              />
              <p className="list-item-count">{casesDeceased.count}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateCasesData
