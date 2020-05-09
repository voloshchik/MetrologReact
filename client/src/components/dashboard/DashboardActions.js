import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div class="dash-buttons">
      <Link to="/checktable" class="btn btn-light">
        <i class="fa fa-user-circle text-primary"></i> Результаты поверки
      </Link>
      <Link to="/add-device" class="btn btn-light">
        <i class="fa fa-plus-circle text-primary"></i> Добавить СИ
      </Link>
      <Link to="/chart" class="btn btn-light">
        <i class="fa fa-bar-chart text-primary"></i> Диаграммы поверок
      </Link>
      <Link to="/document" class="btn btn-light">
        <i class="fa fa-file-word-o text-primary"></i> План-график
      </Link>
      <Link to="/pdf" class="btn btn-light">
        <i class="fa fa-file-word-o text-primary"></i> Test-pdf
      </Link>
    </div>
  );
};

export default DashboardActions;
