const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_COMPASS_CONNECTION,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			}
		)
		console.log('BBDD conectada')
	} catch(err) {
		console.log('Error al conectar BBDD')
		throw new Error('Error al conectar BBDD')
	}
}

module.exports = {
	connectDB
}
