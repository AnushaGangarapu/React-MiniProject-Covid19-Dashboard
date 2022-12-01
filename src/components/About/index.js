import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Faq from '../Faq'
import Factoids from '../Factoids'
import Footer from '../Footer'

import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqs: [],
    factoids: [],
  }

  componentDidMount() {
    this.getAboutInfo()
  }

  renderLoader = () => (
    <>
      <div className="loader-container">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  getAboutInfo = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const setFactoidsData = data.factoids.map(each => ({
        banner: each.banner,
        id: each.id,
      }))
      const setFaqsData = data.faq.map(faq => ({
        answer: faq.answer,
        category: faq.category,
        qno: faq.qno,
        question: faq.question,
      }))

      this.setState({
        faqs: setFaqsData,
        factoids: setFactoidsData,
        isLoading: false,
      })
    }
  }

  renderLoading = () => (
    <>
      <div className="loading" /* testid="aboutRouteLoader" */>
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </>
  )

  renderAboutInfo = () => {
    const {faqs, factoids} = this.state

    return (
      <>
        <ul /* testid="faqsUnorderedList" */ className="faqs">
          {faqs.map(eachFaq => (
            <Faq faqDetails={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <h1 className="factoids-heading">Factoids</h1>
        <ul className="factoids">
          {factoids.map(eachFact => (
            <Factoids factDetails={eachFact} key={eachFact.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="about-bg-container">
          {isLoading ? (
            this.renderLoading()
          ) : (
            <div className="about-main-container">
              <h1 className="about-heading">About</h1>
              <p className="about-info">Last update on December 25th 2021.</p>
              <p className="about-paragraph">
                COVID-19 vaccines be ready for distribution
              </p>
              <div className="fact-list">{this.renderAboutInfo()}</div>
            </div>
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default About
