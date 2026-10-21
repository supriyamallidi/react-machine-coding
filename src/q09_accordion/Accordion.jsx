import { useState } from "react"

export default function Accordion() {
    const faqData = [
        { question: 'What is React?', answer: `A Java script library for building UI's` },
        { question: 'What is JSX?', answer: 'A syntax extension that looks like HTML in JavaScript.' },
        { question: 'What are hooks?', answer: 'Functions that let you use state in functional components.' },
    ]

    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (index) => {
        setOpenIndex(prev => prev === index ? null : index)
    }

    return (
        <div>
            {faqData.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                    <button
                        onClick={() => toggle(index)}
                        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 'bold', padding: 8 }}
                    >
                        {openIndex === index ? '▼' : '▶'} {item.question}
                    </button>
                    {openIndex === index && (
                        <div style={{ padding: '8px 8px 8px 24px', color: '#555', textAlign: 'left' }}>
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}