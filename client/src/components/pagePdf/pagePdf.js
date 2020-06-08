import React, {useState} from 'react'
import Axios from 'axios'
import {saveAs} from 'file-saver'

export const PagePdf = () => {
  const [formData, setFormData] = useState({
    name: '',
    receiptId: '',
    price1: '',
    price2: '',
  })

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value})

  const createAndDownloadPdf = () => {
    Axios.post('/create-pdf', formData)
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
          type="number"
          placeholder="Receipt ID"
          name="receiptId"
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
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    </div>
  )
}
