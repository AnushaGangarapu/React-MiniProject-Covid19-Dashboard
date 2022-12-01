import './index.css'

const Faq = props => {
  const {faqDetails} = props
  const {question, answer} = faqDetails
  return (
    <li>
      <h1 className="question">{question}</h1>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default Faq
