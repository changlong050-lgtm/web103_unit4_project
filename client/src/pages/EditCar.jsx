import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import carsApi from '../services/carsApi.jsx'
import OptionsModal from '../components/OptionsModal.jsx'
import './CreateCar.css'

const BASE_PRICE = 65000

const EditCar = () => {
    const { id } = useParams()
    const [allOptions, setAllOptions] = useState([])
    const [activeModal, setActiveModal] = useState(null)
    const [name, setName] = useState('')
    const [convertible, setConvertible] = useState(false)
    const [selected, setSelected] = useState({
        exterior: null,
        roof: null,
        wheels: null,
        interior: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            const [optionsData, carData] = await Promise.all([
                carsApi.getOptions(),
                carsApi.getCarById(id),
            ])
            setAllOptions(optionsData)
            setName(carData.name)
            setConvertible(carData.convertible)
            setSelected({
                exterior: optionsData.find(o => o.id === carData.exterior_id) || null,
                roof:     optionsData.find(o => o.id === carData.roof_id)     || null,
                wheels:   optionsData.find(o => o.id === carData.wheels_id)   || null,
                interior: optionsData.find(o => o.id === carData.interior_id) || null,
            })
        }
        fetchData()
    }, [id])

    const handleSelect = (category, option) => {
        setSelected(prev => ({ ...prev, [category]: option }))
    }

    const totalPrice = BASE_PRICE
        + (convertible ? 1000 : 0)
        + (selected.exterior?.price || 0)
        + (selected.roof?.price || 0)
        + (selected.wheels?.price || 0)
        + (selected.interior?.price || 0)

    const handleUpdate = async () => {
        const car = {
            name,
            convertible,
            exterior_id: selected.exterior?.id,
            roof_id: selected.roof?.id,
            wheels_id: selected.wheels?.id,
            interior_id: selected.interior?.id,
            total_price: totalPrice,
        }
        await carsApi.updateCarById(car, id)
        window.location.href = `/customcars/${id}`
    }

    return (
        <div>
            <div className='create-page-top-container'>
                <label>
                    <input
                        type="checkbox"
                        checked={convertible}
                        onChange={e => setConvertible(e.target.checked)}
                    />
                    <div className='input-text'>Convertible (+$1000)</div>
                </label>

                <button onClick={() => setActiveModal('exterior')}>
                    Exterior {selected.exterior ? `— ${selected.exterior.name}` : ''}
                </button>
                <button onClick={() => setActiveModal('roof')}>
                    Roof {selected.roof ? `— ${selected.roof.name}` : ''}
                </button>
                <button onClick={() => setActiveModal('wheels')}>
                    Wheels {selected.wheels ? `— ${selected.wheels.name}` : ''}
                </button>
                <button onClick={() => setActiveModal('interior')}>
                    Interior {selected.interior ? `— ${selected.interior.name}` : ''}
                </button>

                <input
                    type="text"
                    placeholder="Car name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <button onClick={handleUpdate}>Save Changes</button>
            </div>

            <div className='price-box'>
                <p>Total Price: ${totalPrice.toLocaleString()}</p>
            </div>

            {activeModal && (
                <OptionsModal
                    category={activeModal}
                    options={allOptions}
                    onSelect={(opt) => handleSelect(activeModal, opt)}
                    onClose={() => setActiveModal(null)}
                    disabledNames={
                        activeModal === 'roof'
                            ? convertible
                                ? allOptions.filter(o => o.category === 'roof' && o.name !== 'Dual Roof' && o.name !== 'Transparent Roof').map(o => o.name)
                                : ['Dual Roof', 'Transparent Roof']
                            : []
                    }
                    disabledMessage={
                        activeModal === 'roof'
                            ? convertible
                                ? 'Convertible cars can only use Dual Roof or Transparent Roof.'
                                : 'Dual Roof and Transparent Roof are only available for convertible cars.'
                            : ''
                    }
                />
            )}
        </div>
    )
}

export default EditCar
