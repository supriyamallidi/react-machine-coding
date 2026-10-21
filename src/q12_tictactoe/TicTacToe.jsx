import { useState } from "react";

function calculateWinner(board){
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]
    for(const [a,b,c] of lines) {
        if(board[a] && board[a] === board[b] && board[b] === board[c]) return board[a]
    }
    return null
}


function TicTacToe(){
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXTurn, setIsXTurn] = useState(true)

    const winner = calculateWinner(board)
    const isDraw = !winner && board.every(cell => cell !== null)

    const handleClick = (index) => {
        if(board[index] || winner) return;
        const newBoard = [...board]
        newBoard[index] = isXTurn ? 'X' : 'O'
        setBoard(newBoard)
        setIsXTurn(!isXTurn)
    }

    const reset = () => {
        setBoard(Array(9).fill(null))
        setIsXTurn(true)
    }

    let status;
    if(winner) status = `Winner: ${winner}`;
    else if(isDraw) status = "It's a draw!";
    else status = `Next player: ${isXTurn ? 'X' : 'O'}`
    
    return (
        <div style={{textAlign: 'center'}}>
            <h2>{status}</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: 4, justifyContent: 'center' }}>
                {board.map((cell, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleClick(i)}
                        style={{
                            width: 80,
                            height : 80,
                            fontSize: 28,
                            fontWeight: 'bold',
                            cursor: cell || winner ? 'default' : 'pointer'
                        }}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button onClick={reset} style={{ marginTop: 16 }}>Reset Game</button>
        </div>
    )
}

export default TicTacToe