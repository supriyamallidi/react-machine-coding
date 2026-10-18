import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

function Search() {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([])
            return;
        }
        let cancelled = false;
        setLoading(true);

        fetch(`https://api.github.com/search/users?q=${debouncedQuery}`)
            .then(res => res.json())
            .then(data => {
                if (!cancelled) {
                    setResults(data.items || [])
                    setLoading(false)
                }
            })
            .catch(() => {
                if (!cancelled) setLoading(false)
            })

        return () => { cancelled = true }
    }, [debouncedQuery])

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Github users" />
            {loading && <p>Loading ...</p>}
            {!loading && results.length > 0 && (
                <ul>
                    {results.slice(0, 10).map(user => (
                        <li key={user.id}>
                            <img src={user.avatar_url} alt={user.login} width={32} height={32} />
                            {user.login}
                        </li>
                    ))}
                </ul>
            )}
            {!loading && debouncedQuery && results.length === 0 && <p>No results found.</p>}
        </div>
    )
}

export default Search;