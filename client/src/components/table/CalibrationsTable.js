import React from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';

const CalibrationsTable = ({ calibrations }) => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Device', field: 'device.name' },
      { title: 'Last Calibration', field: 'lastCalib' },
      { title: 'Next Calibration', field: 'nextCalib' }
    ],
    data: calibrations
  });

  return (
    <MaterialTable
      title="Поверки"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: () => {
          alert('Hello');
        },
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}

export default connect() (CalibrationsTable);
