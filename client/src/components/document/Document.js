import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'
import Axios from 'axios'
import {saveAs} from 'file-saver'

const MyDoc = ({devices: {devices}, getCurrentDevices}) => {
  var date = new Date(Date.now()).getFullYear()

  const [data, setData] = useState({
    year: date,
  })
  const [devicesData, setDivicesData] = useState(null)
  const {year} = data
  const [devicesServer, setDevicesServer] = useState(null)
  useEffect(() => {
    console.log('useefect!!!!')
    getCurrentDevices()
  }, [])
  useEffect(() => {
    setDevicesServer(devices)
  }, [devices])

  console.log('devicesServer', devicesServer)
  console.log('devices', devices)
  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  if (!devices.length) {
    return null
  }

  const filterDivicesYear = devices.map((d) => {
    const check = d.check

    const filterCheck = check.filter((check) => {
      return (
        new Date(check.nextCheck) > new Date(year, 0, 0) &&
        new Date(check.nextCheck) < new Date(year, 11, 31)
      )
    })

    return {
      ...d,
      check: filterCheck,
      counter: 1,
      checkMonths: [],
    }
  })

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

  function test() {
    let tmpArray = []
    let objArr = []
    const dataPDF = {
      devicesData,
      data,
    }
    console.log('object', dataPDF)
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

  const createAndDownloadPdf = () => {
    const dataPDF = {devicesData, data}
    console.log('dataPDF', dataPDF)
    Axios.post('/create-pdf', dataPDF)
      .then(() => Axios.get('fetch-pdf', {responseType: 'blob'}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }

  return (
    <div>
      <div
      // className="myForm"
      >
        <button onClick={test} className="btn btn-dark"></button>
        <button className="btn btn-light" onClick={createAndDownloadPdf}>
          Download PDF
        </button>
        <hr />
        <select name="year" value={year} onChange={(e) => onChange(e)}>
          <option>{date}</option>
          <option>{date - 1}</option>
          <option>{date - 2}</option>
        </select>
        <hr />
      </div>

      {devicesData && (
        <div>
          <h1 style={{textAlign: ' center'}}>ПЛАН ГРАФИК</h1>
          <h2 style={{textAlign: ' center'}}>
            Переодической проверки средств измерения на {year} год.
          </h2>
          <table>
            <tbody>
              <tr>
                <th rowspan="2">№</th>
                <th rowspan="2">Название прибора</th>
                <th rowspan="2">Тип прибора </th>
                <th rowspan="2">Год поверки</th>
                <th rowspan="2">К-во сред.</th>
                <th colspan="12">К-во поверок по месяцам</th>
              </tr>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
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

                    <td>{divice.checkMonths[0]}</td>
                    <td>{divice.checkMonths[1]}</td>
                    <td>{divice.checkMonths[2]}</td>
                    <td>{divice.checkMonths[3]}</td>
                    <td>{divice.checkMonths[4]}</td>
                    <td>{divice.checkMonths[5]}</td>
                    <td>{divice.checkMonths[6]}</td>
                    <td>{divice.checkMonths[7]}</td>
                    <td>{divice.checkMonths[8]}</td>
                    <td>{divice.checkMonths[9]}</td>
                    <td>{divice.checkMonths[10]}</td>
                    <td>{divice.checkMonths[11]}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>
          <div
            style={{
              display: ' flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <p>Инженер-инженер метролог</p>
            <p>Владислав</p>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
})
export default connect(mapStateToProps, {getCurrentDevices})(MyDoc)
