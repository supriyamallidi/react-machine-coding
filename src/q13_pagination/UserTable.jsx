import { useState } from "react";
import Pagination from "./Pagination";

export default function UserTable() {
    const [page, setPage] = useState(1)
    const allUsers = Array.from({ length: 95 }, (_, i) => ({
        id: i + 1,
        name: `User: ${i + 1}`
    }
    ))
    const perPage = 10;

    const paginatedUsers = allUsers.slice((page - 1) * perPage, page * perPage)

    return (
        <div>
            <ul>
                {paginatedUsers.map(u => <li key={
                    u.id
                }>
                    {u.name}
                </li>)}
            </ul>
            <Pagination totalItems={allUsers.length} itemsPerPage = {perPage} currentPage={page} onPageChange={setPage}/>
        </div>
    )
}