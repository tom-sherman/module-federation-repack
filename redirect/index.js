const express = require('express')
const url = require('url')

const app = express()
const port = 3000

app.get('/:slug', (req, res) => {
    res.redirect(url.format({
        pathname: `http://10.0.2.2:9000/${req.params.slug}`,
        query: req.query
    }));
})

app.listen(port, () => {
  console.log(`Redirect app listening on port ${port}`)
}) 
