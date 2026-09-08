import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const plus = () => {
    setCount(count + 1);
  };

  const minus = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>カウンター</h1>
      
      <p style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>{count}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={minus} style={{ padding: '10px 20px', fontSize: '16px' }}>
          − 減らす
        </button>
        
        <button onClick={reset} style={{ padding: '10px 20px', fontSize: '16px' }}>
          リセット
        </button>

        <button onClick={plus} style={{ padding: '10px 20px', fontSize: '16px' }}>
          + 増やす
        </button>
      </div>
    </div>
  );
}