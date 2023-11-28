import { useEffect, useState } from "react"
import RecentItem from "./RecentItem"
import loadRecent from "../logic/loadRecent"
import saveRecent from "../logic/saveRecent"

export default function RecentList({ onSelectedCity }) {
    const [recent, setRecent] = useState([])

    useEffect(() => {
        setRecent(loadRecent())
    }, [])

    const onCityClick = (city) => {
        onSelectedCity(city)
        saveRecent(city)
        setRecent(loadRecent())
    }

    return <>
        <p className='font-bold text-sm mb-4'>Recent searches</p>
        {recent.map(item => <>
            <RecentItem item={item} handleSelectCity={city => onCityClick(city)} />
        </>)}
    </>

}