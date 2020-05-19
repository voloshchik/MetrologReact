import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDeviceById } from "../../actions/device";

const UpdateDevice = ({
  devices: { device, loading },
  getDeviceById,
  history,
  match,
}) => {
  console.log("device", device);
  console.log("loading", loading);
  useEffect(() => {
    getDeviceById(match.params.id);
    console.log("useEffectUpdateDevice");
    // setFormData({
    //     name: loading || !device.name ? '' : device.name,
    //     period: loading || !device.period ? '' : device.period
    // });
    setFormData({
      name: loading || !device.name ? "!!!" : device.name,
      type: loading || !device.name ? "!!!" : device.type,
      number: loading || !device.name ? "!!!" : device.number,
      period: loading || !device.period ? "!!!" : device.period,
    });
  }, [getDeviceById, device.name, device.period]);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    number: "",
    period: "",
  });

  const { name,type,number, period } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    //addNewDevice(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Редактирование СИ, {device.name}</h1>
      <p className="lead">
        <i class="fa fa-balance-scale" aria-hidden="true"></i> Ввод нового
        средства измерения
      </p>
      <small>* = поля обязательные для заполнения</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="type"
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="number"
            name="name"
            value={number}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="period"
            name="period"
            value={period}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Обновить"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Назад
        </Link>
      </form>
    </Fragment>
  );
};

UpdateDevice.propTypes = {
  getDeviceById: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  devices: state.devices,
});

export default connect(mapStateToProps, { getDeviceById })(
  withRouter(UpdateDevice)
);
