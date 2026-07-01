import React, { useState } from 'react'
import './OptionsModal.css'

const exteriorColors = {
    'Hypersonic Gray':     '#6b6b6b',
    'Accelerate Yellow':   '#f5c400',
    'Torch Red':           '#cc1a1a',
    'Arctic White':        '#f0f0f0',
    'Sebring Orange':      '#e8621a',
    'Rapid Blue':          '#1a5fb4',
    'Shadow Gray':         '#4a4a4a',
    'Blaze Orange':        '#ff4500',
    'Elkhart Lake Blue':   '#0d3b6e',
    'Carbon Flash Black':  '#1a1a1a',
}

const OptionsModal = ({ category, options, onSelect, onClose, disabledNames = [], disabledMessage = '' }) => {
    const filtered = options.filter(opt => opt.category === category)
    const [hoveredId, setHoveredId] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')

    const getHoverStyle = (opt) => {
        if (category === 'exterior' && hoveredId === opt.id) {
            return { backgroundColor: exteriorColors[opt.name] || '#555' }
        }
        return {}
    }

    const handleClick = (opt) => {
        if (disabledNames.includes(opt.name)) {
            setErrorMsg(disabledMessage || `"${opt.name}" is not compatible with the current configuration.`)
            return
        }
        setErrorMsg('')
        onSelect(opt)
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Options</h3>
                {errorMsg && <p className="modal-error">{errorMsg}</p>}
                <div className="modal-options">
                    {filtered.map(opt => {
                        const isDisabled = disabledNames.includes(opt.name)
                        return (
                            <div
                                key={opt.id}
                                className={`option-box${isDisabled ? ' option-disabled' : ''}`}
                                style={getHoverStyle(opt)}
                                onMouseEnter={() => setHoveredId(opt.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => handleClick(opt)}
                            >
                                <p>{opt.name}</p>
                                <p>${opt.price}</p>
                            </div>
                        )
                    })}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default OptionsModal
