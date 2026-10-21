function Pagination({ totalItems, itemsPerPage = 10, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const getPageNumbers = () => {
        const pages = []
        const start = Math.max(1, currentPage - 2)
        const end = Math.min(totalPages, currentPage + 2)
        if (start > 1) {
            pages.push(1);
            if (start > 2) {
                pages.push('...')
            }
        }
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...'); pages.push(totalPages)
        }
        return pages
    }
    return (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
            </button>
            {getPageNumbers().map((page, i) =>
                page === '...' ? (
                    <span key={`dots-${i}`}>...</span>
                ) : (
                    <button key={page} onClick={() => onPageChange(page)} style={{ fontWeight: page === currentPage ? 'bold' : 'normal', backgroundColor: page === currentPage ? '#4CAF50' : 'white', color: page === currentPage ? 'white' : 'black' }}>
                        {page}
                    </button>
                ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
            <span style={{ marginLeft: 8, color: '#666' }}>Page {currentPage} of {totalPages}</span>
        </div >
    )
}

export default Pagination