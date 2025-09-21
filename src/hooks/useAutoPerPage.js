import { useEffect, useState } from 'react';

// returns recommended items per page based on container width.
export default function useAutoPerPage({ cardMinWidth = 160, rows = 2, gap = 12 } = {}) {
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    function compute() {
      try {
        const width = window.innerWidth;
        const containerPadding = 48; // approximate container side paddings
        const usable = Math.max(360, width - containerPadding * 2);
        const cols = Math.max(1, Math.floor((usable + gap) / (cardMinWidth + gap)));
        setPerPage(cols * rows);
      } catch {
        setPerPage(8);
      }
    }

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [cardMinWidth, rows, gap]);

  return perPage;
}
