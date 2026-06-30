import express from 'express'
import { getOptionById,getCars, getCarById, createCar, updateCar, deleteCar, getOptions } from '../controllers/carsController.js'

const router = express.Router()

router.get('/', getCars)
router.get('/options', getOptions)
router.get('/option/:id',getOptionById)
router.get('/:carId', getCarById)
router.post('/', createCar)
router.patch('/:id', updateCar)
router.delete('/:id', deleteCar)


export default router
