import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'

import StateSpecific from './components/StateSpecific'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateId" component={StateSpecific} />
    <Route component={NotFound} />
  </Switch>
)

export default App
