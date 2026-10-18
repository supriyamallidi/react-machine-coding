import React, { useReducer, useState } from "react"


function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: Date.now(), text: action.text, done: false }]
        case 'DELETE':
            return state.filter(t => t.id !== action.id);
        case 'EDIT':
            return state.map(t => t.id === action.id ? { ...t, text: action.text } : t)
        case 'TOGGLE':
            return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
        default:
            return state
    }
}

function Todo() {
    const [todos, dispatch] = useReducer(todoReducer, [])
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('all')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    const handleAdd = () => {
        if (!input.trim()) return;
        dispatch({ type: 'ADD', text: input.trim() })
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
    };

    const saveEdit = (id) => {
        if (editText.trim()) {
            dispatch({ type: 'EDIT', id, text: editText.trim() })
        }
        setEditingId(null)
    }

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text)
    }

    const filtered = todos.filter(todo => {
        if (filter === 'active') return !todo.done;
        if (filter === 'completed') return todo.done;
        return true;
    })

    return (
        <div>
            <div>
                <input value={input} type="text" placeholder="Add a todo ..." onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}/>
                <button onClick={handleAdd} disabled={!input.trim()}>Add</button>
            </div>
            <div>
                {['all', 'active', 'completed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            {filtered.length === 0 ? (<p>{filter === 'all' ? 'No todos yet. Add one above' : `No ${filter} todos`} </p>) : (
                <ul>
                    {filtered.map(todo => (
                        <li key={todo.id}>
                            {editingId === todo.id ? (
                                <>
                                    <input value={editText} onChange={(e) => setEditText(e.target.value)}></input>
                                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })} style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}>{todo.text}</span>
                                    <button onClick={() => startEdit(todo)}>Edit</button>
                                    <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Todo