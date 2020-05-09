import React, { useState } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";

export const PagePdf = () => {
  
  const [name, setName] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPprice2] = useState(0);
  console.log("name", name);

  const body = {
    name,
    receiptId,
    price1,
    price2,
  };

  const createAndDownloadPdf = () => {
    Axios.post("/create-pdf", body)
      .then(() => Axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  // const handleChange = ({ target: { value, name } }) =>
  //   setState({ [name]: value });

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeReceiptID = (e) => {
    setReceiptId(e.target.value);
  };

  const handleChangePrice1 = (e) => {
    setPrice1(e.target.value);
  };

  const handleChangePrice2 = (e) => {
    setPprice2(e.target.value);
  };

  return (
    <div>
      <div className="App">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChangeName}
        />
        <input
          type="number"
          placeholder="Receipt ID"
          name="receiptId"
          onChange={handleChangeReceiptID}
        />
        <input
          type="number"
          placeholder="Price 1"
          name="price1"
          onChange={handleChangePrice1}
        />
        <input
          type="number"
          placeholder="Price 2"
          name="price2"
          onChange={handleChangePrice2}
        />
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    </div>
  );
};
