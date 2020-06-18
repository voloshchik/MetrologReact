import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'

const MyDoc = ({devices: {devices}, getCurrentDevices}) => {
  var date = new Date(Date.now()).getFullYear()

  const [data, setData] = useState({
    year: date,
  })
  const [devicesData, setDivicesData] = useState(null)
  const {year} = data

  useEffect(() => {
    getCurrentDevices()
  }, [getCurrentDevices, data])
  console.log('year', year)
  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  if (!devices.length) {
    return null
  }

  // const filterDivices=(divices)=>{

  // }
  console.log('devices', devices)
  const filterDivicesYear = devices.map((d) => {
    const check = d.check
    console.log('check', check)
    const filterCheck = check.filter((check) => {
      return (
        new Date(check.nextCheck) > new Date(year, 0, 0) &&
        new Date(check.nextCheck) < new Date(year, 11, 31)
      )
    })
    // d.check = filterCheck
    return {...d, check: filterCheck, counter: 1, checkMonths: []}
  })
  console.log('filterDivicesYear', filterDivicesYear)

  filterDivicesYear.forEach((divice) => {
    var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const nextData = divice.check.map((d) => {
      return d.nextCheck
    })

    for (var i = 0; i <= 11; i++) {
      nextData.forEach((date) => {
        if (
          new Date(date) > new Date(year, i, 0) &&
          new Date(date) < new Date(year, i, 31)
        )
          months[i]++
      })
    }
    divice.checkMonths = months
  })

  const test = () => {
    let tmpArray = []
    let objArr = []

    console.log('objArr', objArr)

    function itemCheck(item, index) {
      if (tmpArray.indexOf(item.name) === -1) {
        tmpArray.push(item.name)
        objArr.push(item)
        return
      }
      const check = item.check
      const updatedevice = objArr.find((obj) => obj.name === item.name)
      updatedevice.counter = updatedevice.counter + 1
      updatedevice.check = [...updatedevice.check, ...check]
    }
    filterDivicesYear.forEach((item, index) => {
      itemCheck(item, index)
    })
    setDivicesData(objArr)
  }

  return (
    <div>
      <p>Docuemnt Compone</p>
      <button onClick={test} className="btn btn-dark">
        test
      </button>
      <hr />
      <select name="year" value={year} onChange={(e) => onChange(e)}>
        <option>{date}</option>
        <option>{date - 1}</option>
        <option>{date - 2}</option>
      </select>
      <hr />
      {devicesData && (
        <table>
          <tbody>
            <tr>
              <th rowspan="2">№</th>
              <th rowspan="2">Название прибора</th>
              <th rowspan="2">Тип прибора </th>
              <th rowspan="2">Год поверки</th>
              <th rowspan="2">К-во сред.</th>
              <th>К-во поверок по месяцам</th>
            </tr>
            <tr>
              <th>За</th>
            </tr>
          </tbody>
          {devicesData.map((divice, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{divice.name}</td>
                  <td>{divice.type}</td>
                  <td>{year}</td>
                  <td>{divice.counter}</td>
                  <td>{divice.counter}</td>
                </tr>
              </tbody>
            )
          })}
        </table>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
})
export default connect(mapStateToProps, {getCurrentDevices})(MyDoc)
