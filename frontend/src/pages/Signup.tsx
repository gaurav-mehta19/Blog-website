import { Signup } from "../components/Signup"

export function SignupPage(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-secondary to-bg-primary px-4">
            <div>
                <Signup/>
            </div>
        </div> 
    )
}