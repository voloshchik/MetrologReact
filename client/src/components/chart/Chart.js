import React, { useState } from 'react';
import YearChart from './YearChart';

const Chart = () => {

    var date = new Date(Date.now()).getFullYear();

    const [data, setData] = useState({
        year: date
    });

    const {
        year
    } = data;

    
    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return <div>
        <h2>Количество поверенных СИ в 
        <select name='year' value={year} onChange={e => onChange(e)}>
            <option>{date}</option>
            <option>{date - 1}</option>
            <option>{date - 2}</option>
        </select>
        году</h2>
        <YearChart year={year} />
    </div>
}

export default Chart;