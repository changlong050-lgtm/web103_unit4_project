import express from 'express'
import { getCars, getCarById, createCar, updateCar, deleteCar, getOptions } from '../controllers/carsController.js'

const router = express.Router()

router.get('/', getCars)
router.get('/options', getOptions)
router.get('/:carId', getCarById)
router.post('/', createCar)
router.put('/:id', updateCar)
router.delete('/:id', deleteCar)

export default router
