import {pool} from './database.js'
import './dotenv.js'
import { optionsData, carsData } from '../data/carsData.js'

const createTable = async()=>{
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;
        DROP TABLE IF EXISTS options;
        
        CREATE TABLE IF NOT EXISTS options (
            id SERIAL PRIMARY KEY,
            category VARCHAR(50) NOT NULL,
            name VARCHAR(100) NOT NULL,
            price INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cars(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            convertible BOOLEAN NOT NULL,
            exterior_id INT REFERENCES options(id),
            roof_id INT REFERENCES options(id),
            wheels_id INT REFERENCES options(id),
            interior_id INT REFERENCES options(id),
            total_price INT NOT NULL
        );
    `
    try{
        const res = await pool.query(createTableQuery)
        console.log('\n options table and cars table created successfully\n')

    }
    catch(error){
        console.log('error creating options table', error)
    }


}



const seedOptions = async () => {
    for (const option of optionsData) {
        const insertQuery = `
            INSERT INTO options (category, name, price)
            VALUES ($1, $2, $3)
        `
        const values = [option.category, option.name, option.price]
        try {
            await pool.query(insertQuery, values)
            console.log(`[OK] ${option.name} added successfully`)
        } catch (error) {
            console.error('error inserting option', error)
        }
    }
}

const seedCars = async () => {
    for (const car of carsData) {
        const insertQuery = `
            INSERT INTO cars (name, convertible, exterior_id, roof_id, wheels_id, interior_id, total_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `
        const values = [car.name, car.convertible, car.exterior_id, car.roof_id, car.wheels_id, car.interior_id, car.total_price]
        try {
            await pool.query(insertQuery, values)
            console.log(`[OK] ${car.name} added successfully`)
        } catch (error) {
            console.error('error inserting car', error)
        }
    }
}

const reset = async () => {
    await createTable()
    await seedOptions()
    console.log('\n finsh seeding the option table\n')
    await seedCars()
    console.log('\n finsh seeding the cars table\n')
}

reset()