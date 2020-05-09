import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewCalibration, getDeviceById } from '../../actions/device';

const AddCalibration = ({ devices: {device}, addNewCalibration, getDeviceById, history, match }) => {

    useEffect(() => {
        getDeviceById(match.params.id);
    }, [getDeviceById]);

    const [formData, setFormData] = useState({
        lastCheck: ''
    });

    const {
        lastCheck
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addNewCalibration(match.params.id, formData, history);
    }

    return (
        <Fragment>
            
            <p className="lead">
            <i class="fa fa-step-backward" aria-hidden="true"></i> Ввод последней поверки СИ ({device.name})
            </p>
            <small>*Введите дату последней поверки</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="date" placeholder="Дата последней поверки" name="lastCheck" value={lastCheck} onChange={e => onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Добавить" />
                <Link className="btn btn-light my-1" to="/dashboard">Отмена</Link>
            </form>
        </Fragment>
    )
}

AddCalibration.propTypes = {
    addNewCalibration: PropTypes.func.isRequired,
    getDeviceById: PropTypes.func.isRequired,
    devices: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    devices: state.devices
});

export default connect(mapStateToProps, { addNewCalibration, getDeviceById })(withRouter(AddCalibration));