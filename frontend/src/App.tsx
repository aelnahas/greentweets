import React, { useEffect, useState } from 'react';
import './App.css';
import {BASE_URL} from "./utils/constants"

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL()}/queries/raw`)
      const newData = await response.json()
      console.log(newData)
      setData(newData)
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <div>
        {Object.keys(data).length}
      </div>
    </div>
  );
}

export default App;
