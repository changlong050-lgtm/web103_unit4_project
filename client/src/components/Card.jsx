import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import carsApi from '../services/carsApi.jsx'

const Card = ({ car }) => {
    const [exterior, setExterior] = useState(null)
    const [roof, setRoof] = useState(null)
    const [wheels, setWheels] = useState(null)
    const [interior, setInterior] = useState(null)

    useEffect(() => {
        const fetchOptions = async () => {
            const [ext, rf, wh, int] = await Promise.all([
                carsApi.getOptionById(car.exterior_id),
                carsApi.getOptionById(car.roof_id),
                carsApi.getOptionById(car.wheels_id),
                carsApi.getOptionById(car.interior_id),
            ])
            setExterior(ext)
            setRoof(rf)
            setWheels(wh)
            setInterior(int)
        }
        fetchOptions()
    }, [car])

    return (
        <div className="card">
            <h3>{car.name}</h3>
            <p>Type: {car.convertible ? 'Convertible' : 'Coupe'}</p>
            <p>Exterior: {exterior?.name}</p>
            <p>Roof: {roof?.name}</p>
            <p>Wheels: {wheels?.name}</p>
            <p>Interior: {interior?.name}</p>
            <p>Total Price: ${car.total_price}</p>
            <Link to={`/customcars/${car.id}`}><button>Detail</button></Link>
        </div>
    )
}

export default Card
