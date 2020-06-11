import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import {saveAs} from 'file-saver'
import {connect} from 'react-redux'
import {getCurrentDevices} from '../../actions/device'

const PagePdf = ({devices: {devices}, getCurrentDevices}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  })
  const [data, setData] = useState(null)
  console.log('data', data)
  useEffect(() => {
    getCurrentDevices()
  }, [getCurrentDevices])

  if (!devices.length) {
    return null
  }
  const dataPdf = {
    formData,
  }

  const searchDivice = (name = 'test', type = 'panel') => {
    return devices.filter((item) => item.name === name && item.type === type)
  }

  const selectDiviceHandler = () => {
    const divicesSelect = searchDivice()
    setData(divicesSelect)
  }

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
  // if (data) {
  //   const table = data.map((device, index) => {
  //     return <li>device.name</li>
  //   })
  // }

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

        <button className="btn btn-light" onClick={selectDiviceHandler}>
          Информация о приборе
        </button>
        <button className="btn btn-light" onClick={createAndDownloadPdf}>
          Download PDF
        </button>
      </div>
      <hr />
      {data && (
        <table>
          <tbody>
            <tr>
              <th>Название прибора</th>
              <th>Тип прибора </th>
              <th>Период проверки</th>
              <th>проверка проводилась</th>
              <th>Запланираваная проверка</th>
            </tr>
          </tbody>
          {data.map((divice, index) => {
            console.log(
              divice.check.map((check) => {
                return check.lastCheck
              })
            )
            return (
              <tbody key={index}>
                <tr>
                  <td>{divice.name}</td>
                  <td>{divice.type}</td>
                  <td>{divice.period}</td>
                  <td>
                    {divice.check.map((check, index) => {
                      return <p key={index}>{check.lastCheck}</p>
                    })}
                  </td>
                  <td>
                    {divice.check.map((check, index) => {
                      return <p key={index}>{check.nextCheck}</p>
                    })}
                  </td>
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

// const mapDispatchToProps=(dispatch)=>{

// }

export default connect(mapStateToProps, {getCurrentDevices})(PagePdf)
