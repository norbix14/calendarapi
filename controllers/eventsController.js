const Event = require('../models/Event')

const getEvents = async (req, res) => {
	try {
		const events = await Event.find().populate('user', 'name')

		return res.status(200).json({
			ok: true,
			msg: 'Eventos obtenidos',
			events
		})
	} catch(err) {
		console.log('Error al obtener eventos')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

const createEvent = async (req, res) => {
	try {
		const event = new Event(req.body)
		event.user = req.uid

		const savedEvent = await event.save()
		
		return res.status(200).json({
			ok: true,
			msg: 'Evento creado',
			event: savedEvent
		})
	} catch(err) {
		console.log('Error al crear evento')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

const updateEvent = async (req, res) => {
	try {
		const { uid: userId } = req
		const { id: eventId } = req.params

		const event = await Event.findById(eventId)

		if(!event) {
			return res.status(404).json({
				ok: false,
				msg: 'El evento no existe'
			})
		}

		if(userId.toString() !== event.user.toString()) {
			return res.status(401).json({
				ok: false,
				msg: 'No tienes los privilegios para editar'
			})
		}

		const newEvent = {
			...req.body,
			user: userId
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			eventId,
			newEvent,
			{
				new: true
			}
		)

		return res.status(200).json({
			ok: true,
			msg: 'Evento actualizado',
			event: updatedEvent
		})
	} catch(err) {
		console.log('Error al acualizar evento')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

const deleteEvent = async (req, res) => {
	try {
		const { uid: userId } = req
		const { id: eventId } = req.params

		const event = await Event.findById(eventId)

		if(!event) {
			return res.status(404).json({
				ok: false,
				msg: 'El evento no existe'
			})
		}

		if(userId.toString() !== event.user.toString()) {
			return res.status(401).json({
				ok: false,
				msg: 'No tienes los privilegios para eliminar'
			})
		}

		await Event.findByIdAndDelete(eventId)

		return res.status(200).json({
			ok: true,
			msg: 'Evento eliminado'
		})
	} catch(err) {
		console.log('Error al eliminar evento')
		return res.status(500).json({
			ok: false,
			msg: 'Ha ocurrido un error'
		})
	}
}

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent
}
