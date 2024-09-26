import { useState } from 'react'
import './App.css'
import Map from './Map.jsx';
import SubmitButton from './Components/Buttons/Buttons.jsx'
import PlayerNames from './Components/PlayerNames.jsx'

function App() {

  return (
    <>
      <Map/>
      <SubmitButton />
      <PlayerNames />
    </>
  )
}

export default App
