const {Router} = require('express')
const pdf = require('html-pdf')
const pdfTemplate = require('../../documentTest')
const path = require('path')
const router = Router()

router.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject())
    }
    console.log('path', path.join(__dirname, '..', '..', 'result.pdf'))
    res.send(Promise.resolve())
  })
})

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'result.pdf'))
})

module.exports = router
console.log('path', path.join(__dirname, '..', '..', 'result.pdf'))
