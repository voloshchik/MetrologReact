ejs.renderFile(
  path.join(__dirname, './views/', 'report-      template.ejs'),
  {students: students},
  (err, data) => {
    if (err) {
      res.send(err)
    } else {
      let options = {
        height: '11.25in',
        width: '8.5in',
        header: {
          height: '20mm',
        },
        footer: {
          height: '20mm',
        },
      }
      pdf.create(data, options).toFile('report.pdf', function (err, data) {
        if (err) {
          res.send(err)
        } else {
          res.send('File created successfully')
        }
      })
    }
  }
)
