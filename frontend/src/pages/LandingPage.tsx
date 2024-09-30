import { Appbar } from "../components/Appbar"



export const HomePage = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <Appbar/>
            <div style={{width:'1000px'}} className="text-6xl font-semibold text-center">
                Discover the Best Content on the Web
            </div>
            <div style={{width:'900px'}} className="mt-6 text-xl text-center w-3/6">
                Our blog feature the latest news, insights, and stories from the industry experts. Join our community and stay up-to-date with the latest trends.
            </div>
        </div>
    )
}