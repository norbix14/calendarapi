const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtValidator = (req, res, next) => {
	const token = req.header('x-token')

	if(!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token'
		})
	}

	try {
		const { uid, name } = jwt.verify(
			token,
			process.env.JWT_SECRET
		)

		req.uid = uid
		req.name = name
		
		next()
	} catch(err) {
		// console.log(err)
		return res.status(401).json({
			ok: false,
			msg: 'Token no válido'
		})
	}
}

module.exports = {
	jwtValidator
}