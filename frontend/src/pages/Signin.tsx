

import { Signin } from "../components/Signin"
import { Quote } from "../components/Quote"

export function SigninPage(){
    return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
             <Signin/>
            </div>
            <div>
            <Quote/>
            </div>  
        </div> 
    </div>
)
}