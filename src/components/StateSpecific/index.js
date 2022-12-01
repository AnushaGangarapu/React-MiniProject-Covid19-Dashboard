import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import StateCasesData from '../StateCasesData'
import ShowDistrictReport from '../ShowDistrictReport'
import ReCharts from '../ReCharts'

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

class StateDetailedData extends Component {
  state = {
    isLoading: true,

    stateTotalCases: [],
    stateName: '',
    testedCount: 0,
    lastUpdated: '',
    category: 'Confirmed',
    activeCard: true,
    stateId: '',
    totalData: [],
  }

  componentDidMount() {
    this.getStateRelatedData()
  }

  getStateRelatedData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateId} = params
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data/`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const testedCount = data[stateId].total.tested
      const stateObject = statesList.filter(each => each.state_code === stateId)
      const stateTotalInfo = data[stateId].total

      const stateName = stateObject[0].state_name
      const lastUpdated = new Date(data[stateId].meta.last_updated)
      this.setState({
        isLoading: false,
        stateTotalCases: stateTotalInfo,
        testedCount,
        stateName,
        lastUpdated,
        stateId,
        totalData: data,
      })
    } else {
      console.log('Retry')
    }
  }

  updateCategory = activeCategory => {
    this.setState({category: activeCategory, activeCard: false})
  }

  renderLoading = () => (
    <>
      <div className="loading" /* testid="stateDetailsLoader" */>
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  getDistrictsData = () => {
    const {category, stateId, totalData} = this.state
    const stateDistricts = totalData[stateId].districts

    const districts = Object.keys(stateDistricts)

    const selectedCategory = category.toLowerCase()

    const selectedCategoryData = districts.map(eachDistrict => ({
      nameOfDistrict: eachDistrict,
      casesCount: stateDistricts[eachDistrict].total[selectedCategory]
        ? stateDistricts[eachDistrict].total[selectedCategory]
        : 0,
    }))

    selectedCategoryData.sort((a, b) => b.casesCount - a.casesCount)

    const reportedActiveCases = districts.map(eachDistrict => ({
      nameOfDistrict: eachDistrict,
      casesCount:
        stateDistricts[eachDistrict].total.confirmed -
        (stateDistricts[eachDistrict].total.recovered +
          stateDistricts[eachDistrict].total.deceased)
          ? stateDistricts[eachDistrict].total.confirmed -
            (stateDistricts[eachDistrict].total.recovered +
              stateDistricts[eachDistrict].total.deceased)
          : 0,
    }))
    reportedActiveCases.sort((a, b) => b.casesCount - a.casesCount)

    if (selectedCategory === 'active') {
      return reportedActiveCases
    }
    return selectedCategoryData
  }

  renderStateDetailedInfo = () => {
    const {
      testedCount,
      stateTotalCases,
      stateName,
      lastUpdated,
      category,
      stateId,
      activeCard,
    } = this.state
    const districtCases = this.getDistrictsData()

    return (
      <div className="specific-route-container">
        <div className="state-info">
          <h1 className="states-heading">{stateName}</h1>
          <div>
            <p className="tested">Tested</p>
            <p className="tested-count">{testedCount}</p>
          </div>
        </div>

        <p className="update">{`last update on ${lastUpdated}`}</p>

        <div className="state-cases-data">
          <StateCasesData
            updateCategory={this.updateCategory}
            stateTotalCases={stateTotalCases}
            active={activeCard}
          />
        </div>

        <div>
          <h1 className={` top-district  ${category}-select`}>Top Districts</h1>
          <div>
            <div>
              <ul
                /* testid="topDistrictsUnorderedList" */ className="districts-list"
              >
                {districtCases.map(dist => (
                  <ShowDistrictReport
                    key={dist.nameOfDistrict}
                    nameOfDistrict={dist.nameOfDistrict}
                    casesCount={dist.casesCount}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div /* testid="lineChartsContainer" */>
          <ReCharts stateId={stateId} category={category} />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />

        <div className="state-specific">
          {isLoading ? this.renderLoading() : this.renderStateDetailedInfo()}
        </div>

        <Footer />
      </>
    )
  }
}

export default StateDetailedData
