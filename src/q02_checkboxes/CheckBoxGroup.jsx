import React, {useState} from "react"

function CheckBoxGroup() {

    const [items, setItems] = useState([
        { id: 1, label: 'React', checked: false },
        { id: 2, label: 'Vue', checked: false },
        { id: 3, label: 'Angular', checked: false },
        { id: 4, label: 'Svelte', checked: false }
    ])

    const allChecked = items.every(item => item.checked);
    const selectedItems = items.filter(item => item.checked);

    const toggleItem = (id) => {
        setItems((prev) => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    const toggleAll = () => {
        const newState = !allChecked;
        setItems((prev) => prev.map(item => ({ ...item, checked: newState })));
    }

    return (
        <div>
            {items.map(item => (
                <label key={item.id} style={{ display: 'block' }}>
                    <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} />
                    {item.label}
                </label>
            ))}
            <button onClick={toggleAll} disabled={allChecked}>{allChecked ? 'All Selected' : 'Select All'}</button>
            <p>Selected ({selectedItems.length}):{selectedItems.map(i => i.label).join(', ')}</p>
        </div>
    )
}

export default CheckBoxGroup