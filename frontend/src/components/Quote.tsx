import { popupcardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popupCard"
import { useRecoilValue } from "recoil"

export const Quote = () => {
    const showPopupCard = useRecoilValue(popupcardAtom)
    return (
        <div className={`bg-[#F4F4F8] h-screen flex flex-col justify-center ${showPopupCard ? 'blur-sm' : ''}`} style={{ userSelect: 'none' }}>
            <div className="flex justify-center">
                <div className="text-3xl text-center font-semibold max-w-xl">
                    "The customer service I received was expectional. The support team went above and beyond to address my concerns."
                </div>
            </div>
            <br /> 
            <div className="max-w-md text-center text-xl font-medium ml-5">
                Julies Winfield
            </div>
            <div className="max-w-md text-slate-400 text-center text-sm font-light ml-5">
                CEO, Acme Inc
            </div>
        </div>
    )
}