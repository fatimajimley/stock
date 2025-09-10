import { useState } from 'react'
import './App.css'

function App() {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsText(file) 
    } 
    
  }
  return (
    <>
      <h1>Stock</h1>
      <div>
        <input type='file' accept='.csv' name='file' id='file' onChange={handleInputChange}/>
      </div>
    </>
  )
}

export default App
