import { useState } from 'react'
import Card from './components/Card.jsx'
import PlacesAutocomplete from './components/PlacesAutocomplete.jsx'
import saveRecent from './logic/saveRecent.js'
import RecentList from './components/RecentList.jsx'
function App() {
  const [city, setCity] = useState()

  const handleSelectCity = city => {
    setCity(city)
    saveRecent(city)
  }

  return (
    <div className='px-4 py-6 flex flex-col w-full h-full items-center sm:max-w-[680px] sm:mx-[auto]'>
      {!city && <>
        <div className='flex flex-col w-full items-start gap-6 pt-[5%] max-w-[380px] mb-12'>
          <img src='/logo.png' className='w-[160px] mx-auto mb-[20%]'></img>
          <div className='flex flex-col w-full items-start gap-1'>
            <p className='font-bold text-4xl'>Welcome!</p>
            <p className='font-bold text-lg'>Start searching for a city</p>
          </div>

          <div className='flex flex-col w-full items-start gap-2'>
            <PlacesAutocomplete onCitySelected={city => handleSelectCity(city)} />
          </div>
        </div>

        <div className='w-full max-w-[380px]'>
          <RecentList onSelectedCity={city => handleSelectCity(city)} />
        </div>
      </>}

      {city && <Card city={city} onBackClick={() => setCity(null)} />}
    </div>)
}

export default App
