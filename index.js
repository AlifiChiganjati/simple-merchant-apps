require('dotenv').config()
const port = 5000
const {createApp} = require('./app')
const app = createApp()

app.listen(`${port}`, () => {
    console.log(`app listen on port ${port}`)
})