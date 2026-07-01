

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import carsApi from '../services/carsApi.jsx'
import '../components/Card.css'
import './CarDetails.css'

const CarDetails = () => {
    const { id } = useParams()
    const [options, setOptions] = useState(null)
    const [car, setCar] = useState(null)
    useEffect(() => {
        const fetchOptions = async () => {

            const carData = await carsApi.getCarById(id);
            setCar(carData)

            const [exterior, roof, wheels, interior] = await Promise.all([
                carsApi.getOptionById(carData.exterior_id),
                carsApi.getOptionById(carData.roof_id),
                carsApi.getOptionById(carData.wheels_id),
                carsApi.getOptionById(carData.interior_id),
            ])
            setOptions({ exterior, roof, wheels, interior })
        }
        fetchOptions()
    }, [id])

    if (!options) return null
    return (
        <div className='detail-contianer'>
            <div className="card">
                <h3>{car.name}</h3>
                <p>Type: {car.convertible ? 'Convertible' : 'Coupe'}</p>
                <p>Exterior: {options.exterior?.name} Price: {options.exterior?.price} </p>
                <p>Roof: {options.roof?.name} Price: ${options.roof?.price}</p>
                <p>Wheels: {options.wheels?.name} Price: ${options.wheels?.price}</p>
                <p>Interior: {options.interior?.name} Price: ${options.interior?.price}</p>
                <p>Total Price: ${car.total_price}</p>
                <Link to={`/edit/${car.id}`}><button className='detail-button'>Edit</button></Link>
                <Link to={'/'}><button onClick={() => carsApi.deleteCar(id)} className='detail-button'>Delete</button></Link>
            </div>
        </div>

    )
}

export default CarDetails