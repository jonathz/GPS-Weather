
import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import WeatherMap from './components/WeatherMap';

function App() {
  
  const [city,setCity]= useState({lat: "4.605575533040425", lng: "-74.10191003067288"})
  return (
    <div className="App">
      <NavBar setLocation={setCity}/>
      <WeatherMap location={city}/>
    </div>
  );
}

export default App;