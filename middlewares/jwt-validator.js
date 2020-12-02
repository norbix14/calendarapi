const { jwtVerify } = require('../helpers/jwt')

const jwtValidator = (req, res, next) => {
	const token = req.header('x-token')

	if(!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token'
		})
	}

	try {
		const { uid, name } = jwtVerify(token)

		req.uid = uid
		req.name = name

		next()
	} catch(err) {
		console.log('El token no es valido')
		return res.status(401).json({
			ok: false,
			msg: 'Token no válido'
		})
	}
}

module.exports = {
	jwtValidator
}
