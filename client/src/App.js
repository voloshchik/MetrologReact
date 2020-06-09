import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CheckTable from './components/table/CheckTable'
import AddDevice from './components/device-forms/AddDevice'
import UpdateDevice from './components/device-forms/UpdateDevice'
import PutCalibration from './components/device-forms/PutCalibration'
import CheckHistory from './components/table/HistoryTable'
import Chart from './components/chart/Chart'
import Document from './components/document/Document'
//Redux
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './utils/setAuthToken'

import './App.css'
import './components/pagePdf/pagePdf.css'
import PagePdf from './components/pagePdf/pagePdf'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/check/:id"
                component={PutCalibration}
              />
              <PrivateRoute
                exact
                path="/history/:id"
                component={CheckHistory}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/checktable" component={CheckTable} />
              <PrivateRoute exact path="/add-device" component={AddDevice} />
              <PrivateRoute
                exact
                path="/update-device/:id"
                component={UpdateDevice}
              />
              <PrivateRoute exact path="/chart" component={Chart} />
              <PrivateRoute exact path="/document" component={Document} />
              <PrivateRoute exact path="/pdf" component={PagePdf} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
