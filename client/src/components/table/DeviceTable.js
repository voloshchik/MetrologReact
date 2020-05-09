// npm i lodash
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { deleteDevice } from "../../actions/device";
import { connect } from "react-redux";
import _ from "lodash";
import PutCalibration from "../device-forms/PutCalibration";

const DeviceTable = ({ device, deleteDevice }) => {
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("asc");
  const [sortField, setsortField] = useState("name");
  useEffect(() => {
    setData(device);
  }, [device]);
  const [data, setData] = useState(device);
  console.log("data", data);
  const search = (items, term) => {
    if (term.trim().length === 0) {
      return items;
    }
    return items.filter((item) => item.name.indexOf(term) > -1);
  };

  const visibleDevices = search(data, title);
console.log('visibleDevices', visibleDevices)
  const onSort = (sortField) => {
    const clonedData = data.concat();
    const sortType = sort === "asc" ? "desc" : "asc";
    console.log("object", clonedData);
    const orderedData = _.orderBy(clonedData, sortField, sortType);
    console.log("orderedData", orderedData);
    setData(orderedData);
    setSort(sortType);
    setsortField(sortField);
  };

  // visibleDevices.sort((a, b) => (a.name - b.name ? 1 : -1));
  // console.log("visibleDevices", visibleDevices);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const devices = visibleDevices.map((dev) => (
   
    <tr key={dev._id}>
      <td>{dev.name}</td>
      <td>{dev.period}</td>
      <td>
        {dev.check[0] ? (
          <Moment format="DD.MM.YYYY">{dev.check[0].lastCheck}</Moment>
        ) : (
          "Нет данных"
        )}
      </td>
      <td>
        {dev.check[0] ? (
          <Moment format="DD.MM.YYYY">{dev.check[0].nextCheck}</Moment>
        ) : (
          "Нет данных"
        )}
      </td>
      <td>
        <div
          class="btn-group"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <div class="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-light dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-calendar-plus-o" aria-hidden="true">
                &nbsp;
              </i>
              Поверка
            </button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <Link to={`/check/${dev._id}`} className="dropdown-item">
                <i class="fa fa-calendar-check-o" aria-hidden="true">
                  &nbsp;
                </i>
                Поверено
              </Link>
              <Link to={`/history/${dev._id}`} className="dropdown-item">
                <i class="fa fa-history" aria-hidden="true">
                  &nbsp;
                </i>
                История
              </Link>
            </div>
          </div>
          <Link to={`/update-device/${dev._id}`} className="btn btn-warning">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </Link>
          <button
            onClick={(e) => deleteDevice(dev._id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fa fa-trash" aria-hidden="true">
              &nbsp;
            </i>
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">База данных СИ</h2>
      <input type="text" value={title} onChange={handleTitle} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={onSort.bind(null, "name")} scope="col">
              Наименование
            </th>
            <th onClick={onSort.bind(null, "period")} scope="col">
              Период поверки
            </th>
            <th scope="col">Предыдущая поверка</th>
            <th scope="col">Следующая поверка</th>
            <th scope="col">Опции</th>
          </tr>
        </thead>
        <tbody>{devices}</tbody>
      </table>
    </>
  );
};

DeviceTable.propTypes = {
  device: PropTypes.array.isRequired,
  deleteDevice: PropTypes.func.isRequired,
};

export default connect(null, { deleteDevice })(DeviceTable);
