'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export function GetTopic() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pantip.com');
        setData(response.data);
      } catch (_error) {
        setError(`Error making the request: ${_error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
      )}
    </div>
  );
}
