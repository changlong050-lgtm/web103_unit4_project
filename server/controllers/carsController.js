import {pool} from '../config/database.js'

const getCars = async(req,res) =>{
    try{
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getCarById = async(req,res)=>{
    try{
        const selectQuery = `SELECT * FROM cars WHERE id = $1`
        const carId = parseInt(req.params.carId)

        const results = await pool.query(selectQuery,[carId])
        if (!results.rows[0]) return res.status(404).json({ error: 'car not found' })
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}


const createCar = async(req,res)=>{
    try {
        const { name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price } = req.body

        const result = await pool.query(`
            INSERT INTO cars (name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price])

        res.status(201).json(result.rows[0])

    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCar = async (req, res) =>{
    try{
        const id = parseInt(req.params.id)
        const { name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price } = req.body

        const results = await pool.query(`
            UPDATE cars
            SET name=$1, convertible=$2, exterior_id=$3, roof_id=$4, wheels_id=$5, interior_id=$6, total_price=$7
            WHERE id=$8
            RETURNING *
            `, [name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price, id])
        if (!results.rows.length) return res.status(404).json({ error: 'car not found' })
        res.status(200).json(results.rows[0])
        }
    catch (error){
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteCar = async(req,res)=>{
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query(`DELETE FROM cars WHERE id = $1 RETURNING *`, [id])
        if (!results.rows.length) return res.status(404).json({error:'car not found'})
        
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getOptions = async(req,res)=>{
    try{
        const results = await pool.query(`SELECT * FROM options ORDER BY id ASC`)
        res.status(200).json(results.rows)

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const getOptionById = async(req,res)=>{
    try{
        const id = parseInt(req.params.id)
        const result = await pool.query(`SELECT * FROM options WHERE id = $1`,[id])
        if (!result.rows[0]) return res.status(404).json({ error: 'option not found' })
        res.status(200).json(result.rows[0])
    }
    catch(error){
        res.status(500).json({ error: error.message })
    }
}
export { getCars, getCarById, createCar, updateCar, deleteCar, getOptions, getOptionById }