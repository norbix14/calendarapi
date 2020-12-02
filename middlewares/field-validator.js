const { validationResult } = require('express-validator')

const fieldValidator = (req, res, next) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			msg: 'Revisa los campos. Algo es inválido',
			errors: errors.mapped()
		})
	}
	
	next()
}

module.exports = {
	fieldValidator
}
