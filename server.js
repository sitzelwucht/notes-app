const express = require('express')
const app = express();

app.use(express.static('client'))

const port = 5000;

app.listen(port, () => {
    console.log(`running on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile('src/index.html')
})