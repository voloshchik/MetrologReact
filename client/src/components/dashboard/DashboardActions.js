import React from 'react'
import {Link} from 'react-router-dom'

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/checktable" className="btn btn-light">
        <i className="fa fa-user-circle text-primary"></i> Результаты поверки
      </Link>
      <Link to="/add-device" className="btn btn-light">
        <i className="fa fa-plus-circle text-primary"></i> Добавить СИ
      </Link>
      <Link to="/chart" className="btn btn-light">
        <i className="fa fa-bar-chart text-primary"></i> Диаграммы поверок
      </Link>
      <Link to="/document" className="btn btn-light">
        <i className="fa fa-file-word-o text-primary"></i> План-график
      </Link>
      <Link to="/pdf" className="btn btn-light">
        <i className="fa fa-file-word-o text-primary"></i> Test-pdf
      </Link>
    </div>
  )
}

export default DashboardActions
