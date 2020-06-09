module.exports = ({lastCheck, nextCheck, price2, receiptId}) => {
  const today = new Date()
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
           
          </style>
       </head>
       <body>
          <div class="">
             <h1>Проверка проводилась</h1>
          </div>
       </body>
    </html>
    `
}
