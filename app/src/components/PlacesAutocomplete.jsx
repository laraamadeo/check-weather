import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'

export default function PlacesAutocomplete({ onCitySelected }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async ({ description }) => {
        setValue(description)

        const results = await getGeocode({ address: description })
        const { lat, lng } = getLatLng(results[0])

        onCitySelected({ name: description, lat, lng })
        clearSuggestions()
    }

    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion

            return (
                <li className="p-1 flex items-center cursor-pointer gap-1 justify-start border-b border-[#c2c4f9] last:border-b-0 hover:bg-[#ced1f8]" key={place_id} onClick={() => handleSelect(suggestion)}>
                    <p className="text-base font-bold mr-1">{`${main_text}, `}</p><p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{secondary_text}</p>
                </li>
            )
        })

    return (
        <div ref={ref} className="flex flex-col items-center w-full gap-[2px] relative">
            <label className="w-full text-start mb-1" htmlFor="autocomplete">City name</label>
            <input
                name="autocomplete"
                className="rounded-xl text-base w-full box-border py-3 px-3 border-none bg-[#cdd3ec] active:border-3 active:border-[#bac3f1] active:bg-[#cdd3ec]focus:bg-[#cdd3ec]"
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
            />

            {status === 'ZERO_RESULTS' && <p className="text-left bg-red text-[#bbbbbb] mt-2">No results found.</p>}
            {status === 'OK' && <ul className="bg-[#e1e3fc] box-border p-3 mt-0 w-[calc(100%-8px)] text-start border border-[#e1e3fc] border-t-0 rounded-b-lg absolute top-[79px]" >{renderSuggestions()}</ul>}
        </div>
    )
}