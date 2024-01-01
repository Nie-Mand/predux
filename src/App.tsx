import Home from './pages/Home'
import Profile from './pages/Profile'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { Routes, Route } from 'react-router-dom'
import store, { history } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
