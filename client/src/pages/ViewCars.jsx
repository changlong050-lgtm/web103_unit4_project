import React, { useEffect, useState } from 'react'
import '../App.css'
import carsApi from '../services/carsApi.jsx'
import Card from '../components/Card.jsx'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    
    useEffect(()=>{
        const fetchData = async()=>{
            const AllCars = await carsApi.getAllCars()
            setCars(AllCars)
        }
        fetchData()
    },[])

    return (
        <div className='cards-container'>
            {
                cars && cars.length>0?
                cars.map((car) =>
                    <Card key={car.id} car={car} />
                
                
                ) : <h3 className="noResults">{'No Cars Yet 😞'}</h3>

                

            }
        </div>
    )
}

export default ViewCars