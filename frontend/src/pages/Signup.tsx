import { Signup } from "../components/Signup"

export function SignupPage(){
    return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
            <div>
                <Signup/>
            </div>
        </div> 
    </div>
)
}