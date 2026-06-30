const getAllCars = async ()=>{
    const response = await fetch(`cars/`)
    return await response.json()

}

const getCarById = async(id)=>{
    const response = await fetch(`cars/${id}`)
    return await response.json()
}

const createCar = async(car)=>{
    const options= {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(car)
    }
    const response = await fetch('/cars',options)
    return response.json()
}
const updateCarById=async(car,id)=>{
    const options= {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    }
    const response = await fetch(`/cars/${id}`,options)
    return response.json()
}
const deleteCar = async(id)=>{
    const options = {
        method: 'DELETE',

    }
    const response = await fetch(`/cars/${id}`,options)
    return response.json()
}



 

const getOptions = async () => {
    const response = await fetch('/cars/options')
    return response.json()
}

const getOptionById = async (id) => {
    const response = await fetch(`/cars/option/${id}`)
    return response.json()
}

export default{getAllCars, getCarById, createCar, updateCarById, deleteCar, getOptions, getOptionById}