// npm i lodash
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import {deleteDevice} from '../../actions/device'
import {connect} from 'react-redux'
import _ from 'lodash'

import './DeviceTable.css'
import Search from '../shared/Search'

const DeviceTable = ({device, deleteDevice}) => {
  const [title, setTitle] = useState('')
  const [sort, setSort] = useState('asc')
  const [sortField, setsortField] = useState('name')

  useEffect(() => {
    setData(device)
  }, [device])
  const [data, setData] = useState(device)

  const search = (items, term) => {
    if (term.trim().length === 0) {
      return items
    }
    return items.filter((item) => item.name.indexOf(term) > -1)
  }

  const visibleDevices = search(data, title)

  const onSort = (sortField) => {
    const clonedData = data.concat()
    const sortType = sort === 'asc' ? 'desc' : 'asc'

    const orderedData = _.orderBy(clonedData, sortField, sortType)

    setData(orderedData)
    setSort(sortType)
    setsortField(sortField)
  }

  // visibleDevices.sort((a, b) => (a.name - b.name ? 1 : -1));
  // console.log("visibleDevices", visibleDevices);
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const devices = visibleDevices.map((dev) => {
    const classes = ['table']

    if (dev.check[0]) {
      const nextCheck = new Date(dev.check[0].nextCheck).getTime()
      const dateNow = new Date().getTime()

      const period = nextCheck - dateNow

      if (period <= 2592000000 && period > 1) {
        classes.push('yellow')
      }
      if (period < 1) {
        classes.push('red')
      }
    }

    return (
      <tr key={dev._id}>
        <td className={classes.join(' ')}>{dev.name}</td>
        <td>{dev.type}</td>
        <td>{dev.number}</td>
        <td>{dev.period}</td>
        <td>
          {dev.check[0] ? (
            <Moment format="DD.MM.YYYY">{dev.check[0].lastCheck}</Moment>
          ) : (
            'Нет данных'
          )}
        </td>
        <td>
          {dev.check[0] ? (
            <Moment format="DD.MM.YYYY">{dev.check[0].nextCheck}</Moment>
          ) : (
            'Нет данных'
          )}
        </td>
        <td>
          <div
            className="btn-group"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <div className="btn-group" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-light dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-calendar-plus-o" aria-hidden="true">
                  &nbsp;
                </i>
                Поверка
              </button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <Link to={`/check/${dev._id}`} className="dropdown-item">
                  <i className="fa fa-calendar-check-o" aria-hidden="true">
                    &nbsp;
                  </i>
                  Поверено
                </Link>
                <Link to={`/history/${dev._id}`} className="dropdown-item">
                  <i className="fa fa-history" aria-hidden="true">
                    &nbsp;
                  </i>
                  История
                </Link>
              </div>
            </div>
            <Link to={`/update-device/${dev._id}`} className="btn btn-warning">
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Link>
            <button
              onClick={(e) => deleteDevice(dev._id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fa fa-trash" aria-hidden="true">
                &nbsp;
              </i>
            </button>
          </div>
        </td>
      </tr>
    )
  })
  console.log('title', title)
  return (
    <>
      <h2 className="my-2">База данных СИ</h2>
      {/* <input type="text" value={title} onChange={handleTitle} /> */}

      <Search value={title} onChange={handleTitle} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={onSort.bind(null, 'name')} scope="col">
              Наименование
            </th>
            <th onClick={onSort.bind(null, 'type')} scope="col">
              тип
            </th>
            <th onClick={onSort.bind(null, 'number')} scope="col">
              номер
            </th>
            <th onClick={onSort.bind(null, 'period')} scope="col">
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
  )
}

DeviceTable.propTypes = {
  device: PropTypes.array.isRequired,
  deleteDevice: PropTypes.func.isRequired,
}

export default connect(null, {deleteDevice})(DeviceTable)
