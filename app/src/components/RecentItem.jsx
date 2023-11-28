export default function RecentItem({ item, handleSelectCity }) {
    return <>
        <p key={item.name} className='text-md mt-2 hover:bg-[#ced1f8] cursor-pointer' onClick={() => handleSelectCity(item)}>{item.name}</p>
        <div className='h-[1px] w-full bg-[#c2c4f9] mt-2'></div>
    </>
}