import { useState } from "react"

function Circle({ depth, maxDepth }) {
    if (depth > maxDepth) return null;
    const size = (maxDepth - depth + 1) * 70;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#FFD93D'];


    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                border: `2px solid ${colors[depth % colors.length]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Circle depth={depth + 1} maxDepth={maxDepth} />
        </div>
    )
}

function NestedCircles() {
    const [count, setCount] = useState(3)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                type="number"
                min={1}
                max={10}
                value={count}
                onChange={(e) => setCount(e.target.value)} />
            <div style={{ marginTop: 20 }}>
                <Circle depth={1} maxDepth={count} />
            </div>
        </div>
    )

}

export default NestedCircles