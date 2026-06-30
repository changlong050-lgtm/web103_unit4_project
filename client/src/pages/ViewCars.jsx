import React, { useEffect, useState } from 'react'
import '../App.css'
import '../services/carsApi.jsx'
import { useSearchParams } from 'react-router-dom'
import carsApi from '../services/carsApi.jsx'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    
    useEffect(()=>{
        const fetchData = async()=>{
            const AllCars = await carsApi.getAllCars()
            console.log(AllCars)
        }
        fetchData()
    },[])

    return (
        <div>
            
        </div>
    )
}

export default ViewCars