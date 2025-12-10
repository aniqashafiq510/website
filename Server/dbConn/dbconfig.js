
import mongoose from "mongoose";

 const db_cloud_url = 'mongodb+srv://webcode:09876@webwheel.sljl9r9.mongodb.net/webcode'

// mongodb+srv://webcode:09876@webwheel.sljl9r9.mongodb.net/?appName=webWheel 
// 
 const db_connection = () => {
    mongoose.connect(db_cloud_url)
    .then(conn => console.log(`db is connected at ${conn.connection.host}`) )
    .catch(err => console.log(`db is failed to connect due to ${err.message}`) )
 }

 export default db_connection

