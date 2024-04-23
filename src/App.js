import { useState } from 'react';
import './App.css';

function App() {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/'
  const key = '41254378ffd1191c761b8fef6a732eaf'

  const[searchInfo,setSearchInfo] = useState('');
  const[cityWeather,setCityWeather] = useState();
  const[error,setError] = useState('');

  function handleClick(){
    if(searchInfo === ''){
      alert('please enter city/town:)')

    }else{
      fetch(`${baseUrl}weather?q=${searchInfo}&units=metric&APPID=${key}`)
    .then((res)=> {
      if (!res.ok) {
        throw new Error('City not found');
      }
      return res.json()
    })
    .then((data)=> {
      setCityWeather(data)
      setError('')
      
    })
    .catch((error)=> {
    console.error('fetching weather data error! ')
    setError(error.message)
    setCityWeather(null)
  }
  )
    }
    
    
  }
  
  return (

    <div className="App">
      <h1>weather app</h1>
      <div className='searchSec'>
        <input type="text" placeholder='Enter city/town' onChange={(e)=>{setSearchInfo(e.target.value)}}/>
        <button onClick={handleClick}>search</button>
      </div>
      {error && <div style={{marginTop: '1rem'}}>{error}</div>}
     
      {cityWeather? (
        <div className='weatherInfo'>
          
          <div>
            <strong className='temperature'>{cityWeather.main.temp} <small id='small'></small> </strong>
            <p>{cityWeather.weather[0].main}</p>
          </div>
          <div>
            {console.log(cityWeather)}
            <p>{cityWeather.weather[0].description}</p>          
            <p>{cityWeather.name}, {cityWeather.sys.country}</p>
          </div>
         
        
        </div>
      )
      : ''}
    </div>
  );
}

export default App;
