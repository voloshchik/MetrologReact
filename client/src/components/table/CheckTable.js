import React from 'react';
import MaterialTable from 'material-table';
import { getCurrentDevices } from '../../actions/device';
import { connect } from 'react-redux';

const CheckTable = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Period', field: 'period' }
    ],
    data: [{
        title: 'Алкотест', period: 3
    }]
  });

  return (
    <MaterialTable
      title="Оборудования"
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

export default connect() (CheckTable);
