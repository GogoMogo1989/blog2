const { MongoClient } = require('mongodb')

let dbConnection
let uri ="mongodb+srv://GogogMogo1989:12345@cluster0.buibtei.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}