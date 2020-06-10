module.exports = ({lastCheckData}) => {
  console.log('lastCheckData', lastCheckData)
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
             ${lastCheckData}
          </div>
       </body>
    </html>
    `
}
