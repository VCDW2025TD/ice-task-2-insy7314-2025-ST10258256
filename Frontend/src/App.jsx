import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [testMsg, setTestMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(res => setTestMsg(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return(
    <>
        <h2>Secure Blog</h2>
        <p>{testMsg}</p>
    </>
  );
}

export default App
