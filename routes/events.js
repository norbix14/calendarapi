/*
	Routes: /, /:id
	Host: /api/events
*/

const { Router } = require('express')
const { check } = require('express-validator')
const {
	jwtValidator
} = require('../middlewares/jwt-validator')
const {
	fieldValidator
} = require('../middlewares/field-validator')
const {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent
} = require('../controllers/eventsController')
const { isDate } = require('../helpers/isDate')

const router = Router()

router.use(jwtValidator)

router.get('/', getEvents)

router.post('/', 
  [
  	check('title', 'Título inválido').not().isEmpty(),
  	check('start', 'Fecha inicial inválida').custom(isDate),
  	check('end', 'Fecha final inválida').custom(isDate),
  	fieldValidator
  ],
	createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router
