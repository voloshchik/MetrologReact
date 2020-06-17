import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'

const MyDoc = ({devices: {devices}, getCurrentDevices}) => {
  useEffect(() => {
    getCurrentDevices()
  }, [getCurrentDevices])

  var date = new Date(Date.now()).getFullYear()

  const [data, setData] = useState({
    year: date,
  })

  const {year} = data
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
  devices.forEach((d) => {
    const check = d.check
    console.log('check', check)
    const filterCheck = check.filter((check) => {
      return (
        new Date(check.nextCheck) > new Date(year, 0, 0) &&
        new Date(check.nextCheck) < new Date(year, 11, 31)
      )
    })
    d.check = filterCheck
    console.log('filterCheck', filterCheck)
  })
  console.log('devices', devices)
  const devicesPrepared = devices.map((divice) => {
    const devicesUpdata = {...divice, counter: 1, checkMonths: []}

    return devicesUpdata
  })
  devicesPrepared.forEach((divice) => {
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
    devicesPrepared.forEach((item, index) => {
      itemCheck(item, index)
    })
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
})
export default connect(mapStateToProps, {getCurrentDevices})(MyDoc)
