const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URL_REMOTE,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			}
		)
		console.log('Conectado a MongoDB')
	} catch(err) {
		console.log('Error al conectar a MongoDB')
		throw new Error('Error al conectar a MongoDB')
	}
}

module.exports = {
	connectDB
}
