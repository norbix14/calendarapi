/*
	Routes: /, /new, /renew
	Host: /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const {
	login,
	newUser,
	renewToken
} = require('../controllers/authController')
const {
	fieldValidator
} = require('../middlewares/field-validator')
const {
	jwtValidator
} = require('../middlewares/jwt-validator')

const router = Router()

router.post('/', 
	[
		check('email', 'Email inválido').isEmail(),
		check('password', 'Contraseña inválida o menor a 6 caracteres')
		.not()
		.isEmpty()
		.isLength({ min: 6 }),
		fieldValidator
	],
	login
)

router.post('/new', 
	[
		check('name', 'Nombre inválido').not().isEmpty(),
		check('email', 'Email inválido').isEmail(),
		check('password', 'Contraseña inválida o menor a 6 caracteres')
		.not()
		.isEmpty()
		.isLength({ min: 6 }),
		fieldValidator
	],
	newUser
)

router.get('/renew',
  jwtValidator,
	renewToken
)

module.exports = router
