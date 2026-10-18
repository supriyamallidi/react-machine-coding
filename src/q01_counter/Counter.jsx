import React, { useReducer, useState } from "react";

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT': return { count: state.count + 1 };
        case 'DECREMENT': return { count: Math.max(0, state.count - 1) };
        case 'RESET': return { count: 0 };
        case 'SET': return { count: Number(action.payload) || 0 };
        default: return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 })
    const [inputValue, setInputValue] = useState('');

    const handleSet = () => {
        dispatch({type: 'SET', payload: inputValue});
        setInputValue('')
    }
    return (
        <div>
            <h2>Count: {state.count} </h2>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            <div>
                <input type="number" value={inputValue} placeholder="Set a Value" onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={handleSet}>Set</button>
            </div>
        </div>
    )
}
export default Counter;