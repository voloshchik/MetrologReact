import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNewDevice } from "../../actions/device";

const AddDevice = ({ addNewDevice, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    number: "",
    period: "",
  });

  const { name, type, number, period } = formData;
console.log('formData', formData)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addNewDevice(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Добавление СИ</h1>
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
            name="number"
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
          value="Добавить"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Назад
        </Link>
      </form>
    </Fragment>
  );
};

addNewDevice.PropTypes = {
  addNewDevice: PropTypes.func.isRequired,
};

export default connect(null, { addNewDevice })(withRouter(AddDevice));
