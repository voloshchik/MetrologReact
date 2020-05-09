import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const History = ({device}) => {


    
var check = device.check.map(check => (
    <tr>
        <td><Moment format='DD.MM.YYYY'>{check.lastCheck}</Moment></td>
        <td><Moment format='DD.MM.YYYY'>{check.nextCheck}</Moment></td>
    </tr>
));
    return <Fragment>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">Предыдущая поверка</th>
                <th scope="col">Следующая поверка</th>
            </tr>
            </thead>
            <tbody>{check}</tbody>
        </table>
    </Fragment>
}

History.propTypes = {
    devices: PropTypes.array.isRequired
}

export default History;