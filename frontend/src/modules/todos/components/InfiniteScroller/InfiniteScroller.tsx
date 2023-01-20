import React, { useEffect, useRef } from "react";

export function InfiniteScroller({ setSize }) {
  const sentinelaRef = useRef();

  useEffect(() => {
    if (!sentinelaRef.current) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setSize((currentPage) => currentPage + 1);
      }
    });
    intersectionObserver.observe(sentinelaRef.current);

    return () => intersectionObserver.disconnect();
  }, [sentinelaRef.current]);

  return <div ref={sentinelaRef} />;
}
