

import { Signin } from "../components/Signin"

export function SigninPage(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-secondary to-bg-primary px-4">
            <div>
                <Signin/>
            </div>
        </div> 
    )
}