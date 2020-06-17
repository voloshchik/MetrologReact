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

  const test = () => {
    console.log('test')
    let tmpArray = []
    let objArr = []
    console.log('objArr', objArr)
    function itemCheck(item, index) {
      // console.log('index', index)
      if (tmpArray.indexOf(item.name) === -1) {
        tmpArray.push(item.name)
        objArr.push(item)
        return
      }
      const check = item.check
      const updatedevice = objArr.find((obj) => obj.name === item.name)
      updatedevice.check = [...updatedevice.check, ...check]
      console.log('updatedevice.check', updatedevice.check)
      console.log('check', check)
    }

    console.log(
      'object',
      devices.forEach((item, index) => {
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
