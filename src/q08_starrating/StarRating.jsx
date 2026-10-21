import { useState } from "react"

function StarRating({ maxStars = 5 }) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const handleClick = (value) => {
        setRating(value);
    }
    return (
        <div>
            {Array.from({ length: maxStars }, (_, i) => i + 1).map(star =>
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ fontSize: 32, color: star <= (hoverRating || rating) ? '#FFD700' : '#DDD' }}
                >
                    &#9733;
                </span>
            )}
            <span style={{ marginLeft: 8 }}>{rating} / {maxStars}</span>
        </div>
    )
}

export default StarRating