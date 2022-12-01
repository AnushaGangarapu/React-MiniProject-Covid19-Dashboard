import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SearchResults from '../SearchResults'
import StateDetails from '../StateDetails'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    search: '',
    searchResultsList: [],
    confirmedCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    activeCases: 0,
    stateDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getDataInfo()
  }

  getDataInfo = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    let confirmedCases = 0
    let recoveredCases = 0
    let deceasedCases = 0

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      statesList.forEach(state => {
        const {total} = data[state.state_code]
        confirmedCases += total.confirmed
        recoveredCases += total.recovered
        deceasedCases += total.deceased
      })
      const activeCases = confirmedCases - (recoveredCases + deceasedCases)
      const stateDetails = statesList.map(state => {
        const {total, meta} = data[state.state_code]
        return {
          stateName: state.state_name,
          stateCode: state.state_code,
          confirmed: total.confirmed,
          active: total.confirmed - (total.recovered + total.deceased),
          recovered: total.recovered,
          deceased: total.deceased,
          population: meta.population,
        }
      })
      this.setState({
        activeCases,
        confirmedCases,
        recoveredCases,
        deceasedCases,
        stateDetails,
        isLoading: false,
      })
    }
  }

  searching = event => {
    this.setState({search: event.target.value}, this.searchResults())
  }

  searchResults = () => {
    const {search} = this.state
    const searchResult = statesList.filter(state =>
      state.state_name.toLowerCase().includes(search.toLowerCase()),
    )
    this.setState({searchResultsList: searchResult})
  }

  searchResultsObjectToResponse = searchResult =>
    searchResult.map(results => ({
      stateName: results.state_name,
      stateCode: results.state_code,
    }))

  searchResultsContainer = searchResultsResponse => (
    <ul
      className="search-results-container"
      /* testid="searchResultsUnorderedList" */
    >
      {searchResultsResponse.map(eachState => (
        <SearchResults key={eachState.stateCode} stateDetails={eachState} />
      ))}
    </ul>
  )

  renderLoading = () => (
    <>
      <div className="loading" /* testid="homeRouteLoader" */>
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  searchResultsInfo = () => {
    const {search, searchResultsList} = this.state
    const searchResultsResponse = this.searchResultsObjectToResponse(
      searchResultsList,
    )
    let searchResultsMoreThanZeroAndNotEmpty = false
    if (searchResultsResponse.length > 0 && search !== '') {
      searchResultsMoreThanZeroAndNotEmpty = true
    }
    return (
      <div className="search-bar">
        <div className="search-container">
          <div className="search">
            <BsSearch className="search-icon" />
            <input
              type="search"
              placeholder="Enter the State"
              value={search}
              onChange={this.searching}
              className="input"
            />
          </div>
        </div>

        {searchResultsMoreThanZeroAndNotEmpty
          ? this.searchResultsContainer(searchResultsResponse)
          : ''}
      </div>
    )
  }

  covidCasesInfo = () => {
    const {
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
    } = this.state
    return (
      <div className="all-cases-container">
        <div
          className="cases-container" /* testid="countryWideConfirmedCases" */
        >
          <p className="cases-paragraph red">Confirmed</p>
          <img
            className="cases-image"
            src="https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487468/confirmed_hre6fp.png"
            alt="country wide confirmed cases pic"
          />
          <p className="cases-count red">{confirmedCases}</p>
        </div>
        <div /* testid="countryWideActiveCases" */ className="cases-container">
          <p className="cases-paragraph blue">Active</p>
          <img
            className="cases-image"
            src="https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487692/protection_vnx7hk.png"
            alt="country wide active cases pic"
          />
          <p className="cases-count blue">{activeCases}</p>
        </div>
        <div
          /* testid="countryWideRecoveredCases" */ className="cases-container"
        >
          <p className="cases-paragraph green">Recovered</p>
          <img
            className="cases-image"
            src="https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487728/recovered_uloqty.png"
            alt="country wide recovered cases pic"
          />
          <p className="cases-count green">{recoveredCases}</p>
        </div>
        <div
          /* testid="countryWideDeceasedCases" */ className="cases-container"
        >
          <p className="cases-paragraph ash">Deceased</p>
          <img
            className="cases-image"
            src="https://res.cloudinary.com/dft0aaxyb/image/upload/v1668487650/breathing_gelhzj.png"
            alt="country wide deceased cases pic"
          />
          <p className="cases-count ash">{deceasedCases}</p>
        </div>
      </div>
    )
  }

  setAscendingOrder = () => {
    const {stateDetails} = this.state
    const ascList = stateDetails.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })

    this.setState({stateDetails: ascList})
  }

  setDescendingOrder = () => {
    const {stateDetails} = this.state
    const descList = stateDetails.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })

    this.setState({stateDetails: descList})
  }

  table = () => {
    const {stateDetails} = this.state

    return (
      <div className="table-container" /* testid="stateWiseCovidDataTable" */>
        <div className="table">
          <div className="header-container">
            <div className="states-header">
              <p className="state-heading">States/UT</p>
              <button
                className="icon-container"
                type="button"
                onClick={this.setAscendingOrder}
                /* testid="ascendingSort" */
              >
                <FcGenericSortingAsc className="icon" />
              </button>

              <button
                type="button"
                className="icon-container"
                onClick={this.setDescendingOrder}
                /* testid="descendingSort" */
              >
                <FcGenericSortingDesc className="icon" />
              </button>
            </div>

            <p className=" row-heading">Confirmed</p>

            <p className="row-heading">Active</p>

            <p className="row-heading">Recovered</p>

            <p className="row-heading">Deceased</p>

            <p className="row-heading">Population</p>
          </div>
          <ul className="details-container">
            {stateDetails.map(eachState => (
              <StateDetails key={eachState.stateCode} stateInfo={eachState} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  covidDetails = () => (
    <div className="body-container">
      <div className="body">
        {this.searchResultsInfo()}
        {this.covidCasesInfo()}
        {this.table()}
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />

        {isLoading ? this.renderLoading() : this.covidDetails()}

        <Footer />
      </>
    )
  }
}

export default Home
