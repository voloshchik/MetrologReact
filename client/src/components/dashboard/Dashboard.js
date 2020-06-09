import React, {Fragment, useEffect} from 'react'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import {getCurrentDevices} from '../../actions/device'
import {getCurrentCalibrations} from '../../actions/calibrations'
import {connect} from 'react-redux'
import DeviceTable from '../table/DeviceTable'

const Dashboard = ({
  getCurrentDevices,
  getCurrentCalibrations,
  auth: {user},
  devices: {devices},
  calibrations: {calibrations},
}) => {
  useEffect(() => {
    getCurrentDevices()

    getCurrentCalibrations()
  }, [getCurrentDevices, getCurrentCalibrations])

  return !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <p className="lead">
        <i className="fas fa-user">Добро пожаловать, {user.name}</i>
      </p>
      <Fragment>
        <DashboardActions />
        <DeviceTable device={devices} />
      </Fragment>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  devices: state.devices,
  calibrations: state.calibrations,
})

export default connect(mapStateToProps, {
  getCurrentDevices,
  getCurrentCalibrations,
})(Dashboard)
