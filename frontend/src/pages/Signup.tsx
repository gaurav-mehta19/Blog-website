import { Signup } from "../components/Signup"
import { Quote } from "../components/Quote"

export function SignupPage(){
    return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Signup/>
            </div>
            <div>
            <Quote/>
            </div>  
        </div> 
    </div>
)
}