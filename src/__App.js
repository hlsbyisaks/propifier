import { useState, useEffect } from "react"

function App() {
    

    useEffect(() => {
        fetchProp()

    }, [])

    const fetchProp = () => {
        fetch('/api').then(
            response => response.json()
        ).then(data => console.log(data))
    }

  return (
    <div className="container">

    </div>
  );
}



export default App;

