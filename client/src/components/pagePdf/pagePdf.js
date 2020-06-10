import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {saveAs} from 'file-saver'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'

const PagePdf = ({devices: {devices}, getCurrentDevices}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price1: '',
    price2: '',
  })
  const [lastCheckData, setLastCheckData] = useState('')
  useEffect(() => {
    getCurrentDevices()
  }, [getCurrentDevices])

  if (!devices.length) {
    return null
  }
  const dataPdf = {
    formData,
    lastCheckData,
  }

  const searchDivice = (name = 'test', type = 'panel') => {
    return devices.filter((item) => item.name === name && item.type === type)
  }

  const selectDiviceHandler = () => {
    const selectDevice = searchDivice()
    console.log('selectDevice', selectDevice[0].check)
    const lastCheck = selectDevice[0].check.map((d) => {
      return `<p> ${d.lastCheck}</p>`
    })

    const nextCheck = selectDevice[0].check.map((d) => {
      return `<p>${d.nextCheck}</p>`
    })
    console.log('lastCheck', lastCheck.join(''))
    setLastCheckData(lastCheck.join(''))
  }
  console.log('lastCheckData', lastCheckData)
  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value})

  const createAndDownloadPdf = () => {
    Axios.post('/create-pdf', dataPdf)
      .then(() => Axios.get('fetch-pdf', {responseType: 'blob'}))
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }

  return (
    <div>
      <div className="App">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          placeholder="type"
          name="type"
          onChange={(e) => onChange(e)}
        />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          onChange={(e) => onChange(e)}
        />
        <input
          type="number"
          placeholder="Price 2"
          name="price2"
          onChange={(e) => onChange(e)}
        />
        <button onClick={selectDiviceHandler}>Просмотр прибора</button>
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
})

// const mapDispatchToProps=(dispatch)=>{

// }

export default connect(mapStateToProps, {getCurrentDevices})(PagePdf)
