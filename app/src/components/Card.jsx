import { useEffect, useState } from "react"
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import retrieveWeather from "../logic/retrieveWeather"
import Spinner from "./Spinner"
import Tooltip from "./Tooltip"
import DataBox from "./DataBox"

export default function Card({ city, onBackClick }) {
    const [weather, setWeather] = useState()
    const [loader, setLoader] = useState(true)
    const [tooltip, setTooltip] = useState(false)

    useEffect(() => {
        setTimeout(async () => {
            try {
                const weather = await retrieveWeather(city.lat, city.lng)

                setWeather(weather)
                setLoader(false)
            } catch (error) {
                alert(error)
            }
        }, 600)
    }, [])

    const onBack = () => {
        onBackClick()
    }

    return <>
        {loader && <div className="w-screen h-screen bg-[#e1e3fc] absolute top-0 opacity-60 flex justify-center items-center">
            <Spinner />
        </div>}

        {weather && !loader && (
            <div className='w-full h-full px-2'>
                <div className='bg-[#979ab8] flex justify-center items-center p-1 w-fit rounded-lg mb-4'>
                    <ArrowLeftIcon className='w-6 h-6 text-[#eeeffc] cursor-pointer' onClick={onBack}></ArrowLeftIcon>
                </div>

                {/* IMAGE + INFO INSIDE IMG */}
                <div className='w-full relative'>
                    <img src={`./${weather.season}.png`} className='object-cover rounded-xl'></img>

                    {/* GRADIENT */}
                    <div className='absolute bottom-0 w-full h-[200px] bg-gradient-to-b from-transparent to-black opacity-80 rounded-lg'></div>

                    <div className='pl-4 pb-4 absolute  bottom-0'>
                        <p className='text-5xl font-bold text-[#e1e3fa] sm:text-6xl'>{`${weather.temp}º`}</p>
                    </div>

                    <div className='flex flex-col absolute bottom-0 left-[120px] pr-4 pb-4 gap-1 sm:flex-row sm:gap-4 sm:left-[120px]'>
                        <p className='text-l text-[#e1e3fa]'>MIN <span className='text-xl font-bold text-[#e1e3fa]'>{`${weather.tempMin}º`}</span></p>
                        <p className='text-l text-[#e1e3fa]'>MAX <span className='text-xl font-bold text-[#e1e3fa]'>{`${weather.tempMax}º`}</span></p>
                    </div>

                </div>

                {/* CITYINFO */}
                <div className='mt-8 flex flex-col sm:flex-row'>
                    <div className="w-full flex flex-row items-center h-fit mb-4">
                        <p className='text-3xl font-bold sm:mb-0 sm:text-4xl mr-4 h-fit'>{city.name.substring(0, city.name.indexOf(','))}</p>
                        <div className="relative">
                            <img className="pt-2" src={`https://flagsapi.com/${weather.country}/flat/32.png`} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}></img>

                            {tooltip && <Tooltip text={city.name} />}
                        </div>
                    </div>

                    <div className='flex justify-between w-full gap-4 sm:pl-8 h-fit'>
                        <DataBox label={'Wind speed'} value={`${weather.wind} km/h`} />
                        <DataBox label={'Humidity'} value={`${weather.humidity}%`} />
                    </div>

                </div>
            </div>
        )}
    </>
}