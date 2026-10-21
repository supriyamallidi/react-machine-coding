import { useEffect, useRef, useState } from "react"

function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null)

    const handleOverLayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ""
        }

    }, [isOpen, onClose])

    if (!isOpen) return null;

    return (
        <div onClick={handleOverLayClick} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div ref={modalRef} style={{
                background: 'white', borderRadius: 8, padding: 24,
                minWidth: 320, maxWidth: 500, position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ margin: 0 }}>{title}</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>X</button>
                </div>
                {children}
            </div>
        </div>
    )

}
function Dialog() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                Open Modal
            </button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Action">
                <p>Are you sure want to proceed?</p>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={() => { alert('Confirmed'); setShowModal(false) }}>Confirm</button>
            </Modal>
        </div>
    )
}

export default Dialog