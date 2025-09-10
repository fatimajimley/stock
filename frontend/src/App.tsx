import React, { useState } from 'react'
import './App.css'
const APP_STATUS = {
    IDLE: 'idle', //al entrar
    SELECT: 'select',// archivo seleccionado
    LOADING: 'loading', // subiendo archivo
    SUCCESS: 'success', //exito
    ERROR: 'error' // cuando hay error
  } as const;

  const BUTTON_TEXT = {
    [APP_STATUS.SELECT]: 'Subir archivo',
    [APP_STATUS.LOADING]: 'Cargando...',
  } 

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ?? [];
    if(file){
      setFile(file[0]);
      setAppStatus(APP_STATUS.SELECT);  
    }
  } 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
    if(!file || appStatus !== APP_STATUS.SELECT){
      return;
    }
    setAppStatus(APP_STATUS.LOADING);
    
    // const formData = new FormData();
    // formData.append('file', file);
    // fetch('/api/files', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(res => res.json())
    // .then(data => {
    //   setAppStatus(APP_STATUS.SUCCESS);
    //   console.log(data);
    // })
    // .catch(err => {
    //   setAppStatus(APP_STATUS.ERROR);
    //   console.log(err);
    // })
  }

  const showButton = appStatus === APP_STATUS.SELECT || appStatus === APP_STATUS.LOADING;
  return (
    <>
    <h1>Stock</h1>
    <h2>Subir csv y busqueda de productos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='file' name='file' accept='.csv' onChange={handleInputChange} disabled={appStatus === APP_STATUS.LOADING}/>
        </label>
        {showButton && (<button disabled={appStatus === APP_STATUS.LOADING}>
          {BUTTON_TEXT[appStatus]}
        </button>)}
      </form>
    </>
  )
}

export default App
