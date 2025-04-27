import React, {useState,useEffect} from 'react'
import './App.css' 

function App() {
  const[city, setCity]=useState('')
  const[temp,setTemp]=useState(false)
  const[weather, setWeather]=useState([])

  useEffect(()=>{
    const url='https://api.weatherapi.com/v1/forecast.json'
    const api_key='cd06de23334d4958a8353839252604 '
    fetch(`${url}?key=${api_key}&q=Proddatur`)
    .then(response=>response.json())
    .then(data=>{
     setWeather(data)
     setTemp(true)
    })
  },[])

  const searchWeather=()=>{
    const url="https://api.weatherapi.com/v1/forecast.json"
    const api_key="cd06de23334d4958a8353839252604 "
    fetch(`${url}?key=${api_key}&q=${city}`)
    .then(response=>{
      if(!response.ok){
        alert("Location Not Found")
      }
      else{
        response.json()
        .then(data=>setWeather(data))
        setCity('')
        
      }
    })
  }
  return (
    <>
      <div className="main">
        <div className='child1'>
          <input 
          value={city}
          type='text'
          placeholder='Enter Your City Name...'
          id='inp'
          onChange={(event)=>{setCity(event.target.value)}}
          />
          <button onClick={searchWeather} id='btn' >Search</button>
        </div>

        {temp && <>
        <div className='child2'>
          
          
          <img src={weather.current.condition.icon}/>
          
          <h1 id="tempc">{weather.current.temp_c}°C</h1>
          
          <div>
          <h1 id="place">{weather.location.name}</h1>
          </div>
          <h1 id='region'>{weather.location.region}</h1>
          <h3 id='region'>{weather.location.country}</h3> 

        </div>
        
        <div className='child3'>
          
          <img src="/sunrise.png" width='50px'/>
          <h1>Sunrise: {weather.forecast.forecastday[0].astro.sunrise}</h1>
          <img src="/sunset.png" width='50px'/>
          <h1>Sunset: {weather.forecast.forecastday[0].astro.sunset}</h1>  
                
          
          <h1>max: {weather.forecast.forecastday[0].day.maxtemp_c}°C</h1>
          <h1>min: {weather.forecast.forecastday[0].day.mintemp_c}°C</h1>
          
      </div>
      <div className='child4'>  

        <div id='flex'>
        <img src="/wind.png" width='50px'/>
        <h3>Wind: {weather.current.wind_kph} km/h</h3>
        </div>

        <div id='flex1'>
        <img src="/humidity.png" width='50px'/>
        <h3>Humidity: {weather.current.humidity}%</h3>
        </div>
     </div>

        
        </>}
      </div>
    </>
  )
}

export default App
