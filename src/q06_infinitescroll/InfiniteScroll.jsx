import React,{useState, useRef, useCallback, useEffect} from "react";

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: (page - 1) * 20 + i + 1,
      title: `Item ${(page - 1) * 20 + i + 1}`,
    }));

    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setHasMore(page < 5); // Stop after 5 pages
    setLoading(false);
  }, [page, loading, hasMore]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  useEffect(() => { loadMore(); }, [loadMore]);

  return (
    <div style={{ height: 500, overflow: 'auto' }}>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          style={{ padding: 16, borderBottom: '1px solid #eee' }}
        >
          {item.title}
        </div>
      ))}
      {loading && <p style={{ textAlign: 'center', padding: 16 }}>Loading more...</p>}
      {!hasMore && <p style={{ textAlign: 'center', padding: 16 }}>No more items.</p>}
    </div>
  );
}

export default InfiniteScroll