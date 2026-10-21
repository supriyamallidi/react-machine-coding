import { createContext, useContext, useReducer } from "react"

const CartContext = createContext()

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const existing = state.find(item => item.id === action.product.id)
            if (existing) return state.map(item => item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
            return [...state, { ...action.product, quantity: 1 }]
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.id)
        case 'UPDATE_QUANTITY':
            if (action.quantity <= 0) return state.filter(item => item.id !== action.id)
            return state.map(item => item.id === action.id ? { ...item, quantity: action.quantity } : item)
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, [])
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return <CartContext.Provider value={{ cart, dispatch, total, itemCount }}>
        {children}
    </CartContext.Provider>
}

function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used inside CartProvider');
    return context;
}


function ProductsList() {
    const products = [
        { id: 1, name: 'Lion T-shirt', price: 25 },
        { id: 2, name: 'Coffee Mug', price: 15 },
        { id: 3, name: 'Ball', price: 5 }
    ]

    const { dispatch } = useCart()
    return (
        <div>
            <h2>Products</h2>
            {
                products.map(product => (
                    <div
                        key={product.id}
                        style={{ display: 'flex', justifyContent: 'space-between', padding: 8, borderBottom: '1px solid #eee' }}
                    >
                        <span>{product.name} - ${product.price}</span>
                        <button onClick={() => dispatch({ type: 'ADD_ITEM', product })}>Add to Cart</button>
                    </div>
                ))
            }
        </div>
    )

}

function Cart() {
    const { cart, dispatch, itemCount, total } = useCart();
    if (cart.length === 0) return <p> User Cart is Empty</p>

    return (
        <div>
            <h2>Cart ({itemCount} item)</h2>
            {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, borderBottom: '1px solid #eee' }}>
                    <span>{item.name} - ${item.price}</span>
                    <div>
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity - 1 })}>-</button>
                        <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity + 1 })}>+</button>
                        <button onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} style={{ marginLeft: 8, color: 'red' }}>Remove</button>
                    </div>
                </div>
            ))}
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
        </div>
    )
}

function ShoppingCart() {
    return (
        <CartProvider>
            <ProductsList />
            <Cart />
        </CartProvider>
    )
}

export default ShoppingCart