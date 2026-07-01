import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import carsApi from '../services/carsApi.jsx'
import './Card.css'

const Card = ({ car }) => {
    const [options, setOptions] = useState(null)

    useEffect(() => {
        const fetchOptions = async () => {
            const [exterior, roof, wheels, interior] = await Promise.all([
                carsApi.getOptionById(car.exterior_id),
                carsApi.getOptionById(car.roof_id),
                carsApi.getOptionById(car.wheels_id),
                carsApi.getOptionById(car.interior_id),
            ])
            setOptions({ exterior, roof, wheels, interior })
        }
        fetchOptions()
    }, [car])

    if (!options) return null

    return (
        <div className="card">
            <h3>{car.name}</h3>
            <p>Type: {car.convertible ? 'Convertible' : 'Coupe'}</p>
            <p>Exterior: {options.exterior?.name} </p>
            <p>Roof: {options.roof?.name}</p>
            <p>Wheels: {options.wheels?.name}</p>
            <p>Interior: {options.interior?.name}</p>
            <p>Total Price: ${car.total_price}</p>
            <Link to={`/customcars/${car.id}`}><button>Detail</button></Link>
        </div>
    )
}

export default Card
