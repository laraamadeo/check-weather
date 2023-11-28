export default function DataBox({ label, value }) {

    return <div className='flex flex-col p-4 border-2 border-[#adadb6] rounded-xl gap-2 w-full h-fit'>
        <p className='text-sm font-bold'>{label}</p>
        <p className='text-xl font-bold'>{value}</p>
    </div>
}