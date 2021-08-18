const app = require('./src/app')
require('dotenv').config()

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})