import React, { useReducer, useState } from "react";

const initialState = {
    count: 0,
    step: 1,
    history: [],
    future: []
}

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + state.step,
                history: [...state.history, state.count],
                future: []
            };
        case 'DECREMENT':
            return {
                ...state,
                count: Math.max(0, state.count - state.step),
                history: [...state.history, state.count],
                future: []
            };
        case 'RESET':
            return {
                ...state,
                count: 0,
                history: [...state.history, state.count],
                future: []
            };
        case 'SET':
            return {
                ...state,
                count: Number(action.payload) || 0,
                history: [...state.history, state.count],
                future: []
            };
        case 'SET_STEP':
            return {
                ...state,
                step: action.payload
            };
        case 'UNDO':
            if (state.history.length === 0) return state;
            const prev = state.history[state.history.length - 1];
            return {
                ...state,
                count: prev,
                history: state.history.slice(0, -1),
                future: [state.count, ...state.future]
            }
        case 'REDO':
            if (state.future.length === 0) return state;
            const next = state.future[0];
            return {
                ...state,
                count: next,
                history: [...state.history, state.count],
                future: state.future.slice(1)
            }
        default: return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, initialState)
    const [inputValue, setInputValue] = useState('');

    const handleSet = () => {
        dispatch({ type: 'SET', payload: inputValue });
        setInputValue('')
    }
    return (
        <div>
            <h2>Count: {state.count} </h2>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
            <button onClick={() => dispatch({ type: 'RESET' })} style={{marginLeft: '8px', marginRight: '8px'}}>Reset</button>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            <div style={{marginTop: '8px'}}>
                <input type="number" value={inputValue} placeholder="Set a Value" onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={handleSet} style={{marginLeft: '8px'}}>Set</button>
            </div>
            <div style={{ marginTop: '8px' }}>
                <label style={{marginRight: '8px'}}>Step Size:</label>
                <select onChange={(e) => dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>
            <div style={{ marginTop: '8px' }}>
                <button onClick={() => dispatch({ type: 'UNDO' })} style={{marginRight: '8px'}}>Undo</button>
                <button onClick={() => dispatch({ type: 'REDO' })}>Redo</button>
            </div>
        </div>
    )
}
export default Counter;