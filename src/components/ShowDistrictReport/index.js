import './index.css'

const ShowDistrictReport = props => {
  const {nameOfDistrict, casesCount} = props

  return (
    <li className="district-list-container">
      <p className="district-count">{casesCount}</p>
      <p className="district-name">{nameOfDistrict}</p>
    </li>
  )
}

export default ShowDistrictReport
