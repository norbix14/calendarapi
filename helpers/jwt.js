const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerate = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name }
		jwt.sign(
			payload, 
			process.env.JWT_SECRET, 
			{
				expiresIn: '2h'
			}, 
			(err, token) => {
				if(err) {
					reject('Error al generar token')
				}
				resolve(token)
			}
		)
	})
}

const jwtVerify = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
	jwtGenerate,
	jwtVerify
}
