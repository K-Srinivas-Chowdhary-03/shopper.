
import { useEffect } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
export  function ShopperHome()
{
    const [cookies,setCookie,removeCookie]=useCookies();
    const navigate=useNavigate();
   useEffect(()=>{
     if(cookies["userid"]==undefined)
     {
        navigate("/login");
     }


   },[]);
   
     function SignoutClick(){
        removeCookie("userid");
        navigate("/login");
     }


    return(
        <div className="container-fluid justify-content-between">
            <div>
            <div className="d-flex justify-content-between">
            <div>
            <img src="shirt.jpg" width="200px" height="300px"/>
            </div>
            <div>
            <img src="women.jpeg" width="200px" height="300px"/>
            </div>
            <div>
            <img src="jewelery.jpg" width="200px" height="300px"/>
            </div>
            <div>
            <img src="electronics.jpg" width="200px" height="300px"/>
            </div>
            
            <div>
                <h2>Hello-{cookies["userid"]}</h2>
                <button onClick={SignoutClick} className="btn bg-dark text-white">Sign Out</button>
            </div>
            </div>
        </div>
        </div>
    )
}