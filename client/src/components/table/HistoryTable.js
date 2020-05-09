import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { getDeviceById } from '../../actions/device';
import { connect } from 'react-redux';
import History from './History';


const HistoryTable = ({ devices: {device, loading}, getDeviceById, match }) => {
    
    useEffect(() => {
        getDeviceById(match.params.id);
        
    }, [match.params.id]);

  return loading ? <Spinner /> : (
    <Fragment>
      <h2 className='my-2'>История поверки СИ: {device.name} </h2>
      <History device={device} />
    </Fragment>  
  );
}

HistoryTable.propTypes = {
    getDeviceById: PropTypes.func.isRequired,
    devices: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    devices: state.devices,
    loading: state.devices
});

export default connect(mapStateToProps, { getDeviceById })(HistoryTable);