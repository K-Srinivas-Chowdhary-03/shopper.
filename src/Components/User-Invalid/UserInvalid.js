import { ShopperLogin } from "../shopper-login/ShopperLogin";
import { Link } from "react-router-dom";

export function UserInvalid(){
    return(
        <div className="text-danger">
            <p>Invalid user Id/ Password</p>
            <div>
                <Link to="/login">Try again</Link>
            </div>
            </div>
    )
}