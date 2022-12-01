import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class ReCharts extends Component {
  state = {
    chartsData: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getChartDetails()
  }

  getChartDetails = async () => {
    const {stateId} = this.props

    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const dates = Object.keys(data[stateId].dates)

      const specificState = dates.map(date => ({
        date,
        confirmed: data[stateId].dates[date].total.confirmed,
        deceased: data[stateId].dates[date].total.deceased,
        recovered: data[stateId].dates[date].total.recovered,
        tested: data[stateId].dates[date].total.tested,
        active:
          data[stateId].dates[date].total.confirmed -
          (data[stateId].dates[date].total.deceased +
            data[stateId].dates[date].total.recovered),
      }))

      this.setState({
        chartsData: specificState,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div /* testid="timelinesDataLoader" */ className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  barGraph = () => {
    const {chartsData} = this.state
    const {category} = this.props
    const selectedBarGraph = category.toLowerCase()

    const barGraphLength = chartsData.slice(Math.max(chartsData.length - 10, 0))

    let color = '#9A0E31'
    if (selectedBarGraph === 'confirmed') {
      color = '#9A0E31'
    } else if (selectedBarGraph === 'active') {
      color = '#0A4FA0'
    } else if (selectedBarGraph === 'recovered') {
      color = '#216837'
    } else if (selectedBarGraph === 'deceased') {
      color = '#474C57'
    }

    return (
      <div className="barChart">
        <BarChart width={700} height={450} data={barGraphLength} barSize={45}>
          <XAxis
            dataKey="date"
            stroke={`${color}`}
            interval={0}
            axisLine={false}
            fontSize={10}
            tickLine={0}
            strokeWidth={1}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={`${selectedBarGraph}`}
            fill={`${color}`}
            label={{position: 'top', fill: '#fff'}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  lineChart = (category, color) => {
    const {chartsData} = this.state

    return (
      <div>
        <LineChart
          width={800}
          height={250}
          data={chartsData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={category} stroke={color} />
        </LineChart>
      </div>
    )
  }

  Charts = () => (
    <>
      <div>{this.barGraph()}</div>

      <h1 className="daily-trends">Daily Spread Trends</h1>
      <div /* testid="lineChartsContainer" */>
        <div className="lineChart confirmed-bg">
          {this.lineChart('confirmed', '#FF073A')}
        </div>
        <div className="lineChart active-bg">
          {this.lineChart('active', '#007BFF')}
        </div>
        <div className="lineChart recovered-bg">
          {this.lineChart('recovered', '#27A243')}
        </div>
        <div className="lineChart deceased-bg">
          {this.lineChart('deceased', '#6C757D')}
        </div>
        <div className="lineChart tested-bg">
          {this.lineChart('tested', '#9673B9')}
        </div>
      </div>
    </>
  )

  render() {
    const {isLoading} = this.state

    return <div>{isLoading ? this.renderLoadingView() : this.Charts()}</div>
  }
}

export default ReCharts
