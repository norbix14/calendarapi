const { Schema, model } = require('mongoose')

const EventSchema = Schema({
	title: {
		type: String,
		required: true
	},
	notes: {
		type: String
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	user: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

/*
// formatear respuesta que devuelve Mongo
// __v y _id devolveria v y id
EventSchema.method('toJSON', function() {
	const { __v, _id, ...object } = this.toObject()
	object.id = _id
	return object
})
*/

module.exports = model('Event', EventSchema)
