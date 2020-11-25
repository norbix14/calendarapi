const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { jwtGen } = require('../helpers/jwt')

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = User.findOne({ email })

		if(!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas. Revisa tus datos'
			})
		}

		const validPass = bcrypt.compareSync(password, user.password)

		if(!validPass) {
			return res.status(400).json({
				ok: false,
				msg: 'Credenciales incorrectas. Revisa tus datos'
			})
		}

		const token = await jwtGen(user.id, user.name)

		return res.status(200).json({
			ok: true,
			token,
			user: {
				uid: user.id,
				name: user.name
			}
		})
	} catch(err) {
		console.log('Error al iniciar sesion')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

const newUser = async (req, res) => {
	try {
		const { email, password } = req.body

		let user = await User.findOne({ email })

		if(user) {
			return res.status(400).json({
				ok: false,
				msg: 'Este email no está disponible. Usa otro'
			})
		}

		user = new User(req.body)

		const salt = bcrypt.genSaltSync()
		user.password = bcrypt.hashSync(password, salt)

		await user.save()

		const token = await jwtGen(user.id, user.name)

		return res.status(201).json({
			ok: true,
			msg: 'Usuario creado',
			token,
			user: {
				uid: user.id,
				name: user.name
			}
		})
	} catch(err) {
		console.log('Error al crear nuevo usuario')
		return res.status(500).json({
			ok: false,
			msg: 'No se pudo crear el usuario'
		})
	}
}

const renewToken = async (req, res) => {
	try {
		const { uid, name } = req

		const token = await jwtGen(uid, name)

		return res.status(200).json({
			ok: true,
			token
		})
	} catch(err) {
		console.log('Error al renovar el token')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

module.exports = {
	login,
	newUser,
	renewToken
}
