import './index.css'

const Factoids = props => {
  const {factDetails} = props
  const {banner} = factDetails
  return <li className="facts">{banner}</li>
}

export default Factoids
