export default function Tooltip({ text }) {

    return <div className="pl-[16px] absolute top-[-4px] left-10">
        <p className="bg-[#c8cbfc] py-2 px-3 m-0 rounded-lg w-fit text-sm font-medium whitespace-nowrap">{text}</p>
        <div className="w-0 h-0 rotate-[270deg] border-solid border-t-0 border-x-[9px] border-b-[15px] border-[transparent_transparent_#c8cbfc_transparent] absolute left-0 top-[11px]"></div>
    </div>
}