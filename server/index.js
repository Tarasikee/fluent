require('dotenv').config()
const app = require('./app')
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`))
