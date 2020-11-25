const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGen = (uid, name) => {
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

module.exports = {
	jwtGen
}
