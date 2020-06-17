import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'

const MyDoc = ({devices: {devices}, getCurrentDevices}) => {
  useEffect(() => {
    getCurrentDevices()
  }, [getCurrentDevices])

  if (!devices.length) {
    return null
  }
  console.log('devices', devices)
  const devicesprepared = devices.map((divice) => {
    const devicesUpdata = {...divice, counter: 1, checkMonths: []}

    return devicesUpdata
  })
  devicesprepared.forEach((divice) => {
    var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const nextData = divice.check.map((d) => {
      return d.nextCheck
    })

    for (var i = 0; i <= 11; i++) {
      nextData.forEach((date) => {
        if (
          new Date(date) > new Date(2020, i, 0) &&
          new Date(date) < new Date(2020, i, 31)
        )
          months[i]++
      })
    }
    divice.checkMonths = months
    console.log('nextData', nextData)
    console.log('months', months)
  })

  console.log('devicesprepared', devicesprepared)
  const test = () => {
    console.log('test')
    let tmpArray = []
    let objArr = []
    console.log('objArr', objArr)
    //  const dates = objArr.filter( date => date > new Date(2020,0,01) && date < new Date(2020,11,31) );
    // console.log('dates', dates)
    function itemCheck(item, index) {
      // console.log('index', index)
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

    console.log(
      'object',
      devicesprepared.forEach((item, index) => {
        itemCheck(item, index)
      })
    )
  }

  return (
    <div>
      <p>Docuemnt Compone</p>
      <button onClick={test} className="btn btn-dark">
        test
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
})
export default connect(mapStateToProps, {getCurrentDevices})(MyDoc)
