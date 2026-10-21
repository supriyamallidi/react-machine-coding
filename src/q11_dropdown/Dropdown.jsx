import { useEffect, useRef, useState } from "react"

function Dropdown() {
    const options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
    ];
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef(null)
    const selectedOption = options.find(option => option.value === selected)

    const openDropdown = (index = options.findIndex(option => option.value === selected)) => {
        setHighlightedIndex(index >= 0 ? index : 0)
        setIsOpen(true)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(containerRef.current && !containerRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[])

    const handleKeyDown = (e) => {
        if(e.key === 'Escape') {
            setIsOpen(false)
            return
        }

        if(e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            if(!isOpen) {
                const selectedIndex = options.findIndex(option => option.value === selected)
                openDropdown(selectedIndex >= 0 ? selectedIndex : (e.key === 'ArrowDown' ? 0 : options.length - 1))
                return
            }

            setHighlightedIndex(prev => e.key === 'ArrowDown'
                ? Math.min(prev + 1, options.length - 1)
                : Math.max(prev - 1, 0))
            return
        }

        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if(!isOpen) {
                openDropdown()
            } else if(highlightedIndex >= 0) {
                setSelected(options[highlightedIndex].value)
                setIsOpen(false)
            }
        }
    }

    return (
        <div ref={containerRef} style={{ position: 'relative', width: 200 }}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="language-options"
                onClick={() => isOpen ? setIsOpen(false) : openDropdown()}
                onKeyDown={handleKeyDown}
                style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'white',
                }}
            >
                <span>{selectedOption ? selectedOption.label : 'Select a language'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <ul
                    id="language-options"
                    role="listbox"
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '100%',
                        left: 0,
                        width: '100%',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        border: '1px solid #ccc',
                        background: 'white',
                    }}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            id={`language-option-${option.value}`}
                            role="option"
                            aria-selected={option.value === selected}
                            onClick={() => { setSelected(option.value); setIsOpen(false) }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                backgroundColor: index === highlightedIndex ? '#f0f0f0' : option.value === selected ? '#4289be' : 'white',
                                color: option.value === selected && index !== highlightedIndex ? 'white' : 'inherit',
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown