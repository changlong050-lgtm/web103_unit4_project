import React, { useEffect, useState } from 'react'
import '../App.css'
import carsApi from '../services/carsApi.jsx'
import OptionsModal from '../components/OptionsModal.jsx'
import './CreateCar.css'

const BASE_PRICE = 65000

const CreateCar = () => {
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
        const fetchOptions = async () => {
            const data = await carsApi.getOptions()
            setAllOptions(data)
        }
        fetchOptions()
    }, [])

    const handleSelect = (category, option) => {
        setSelected(prev => ({ ...prev, [category]: option }))
    }

    const totalPrice = BASE_PRICE
        + (convertible ? 1000 : 0)
        + (selected.exterior?.price || 0)
        + (selected.roof?.price || 0)
        + (selected.wheels?.price || 0)
        + (selected.interior?.price || 0)

    const handleCreate = async () => {
        const car = {
            name,
            convertible,
            exterior_id: selected.exterior?.id,
            roof_id: selected.roof?.id,
            wheels_id: selected.wheels?.id,
            interior_id: selected.interior?.id,
            total_price: totalPrice,
        }
        await carsApi.createCar(car)
        window.location.reload()
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

                <button onClick={handleCreate}>Create Car</button>
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

export default CreateCar
