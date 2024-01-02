import { useState, useEffect } from 'react'
import Display from './components/Display';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/')
    .then((res) => res.json())
    .then((data) => setData(data));
  }, []);

  return (
    <div>
      <Display data={data} />
    </div>
  )
}

export default App
