import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopperCategory } from "../Shopper-Category/ShopperCategory";
import { ShopperHome } from "../Shopper-Home/ShopperHome";
import { ShopperRegister } from "../ShopperRegister/ShopperRegister";
import { ShopperLogin } from "../shopper-login/ShopperLogin";
import { UserInvalid } from "../User-Invalid/UserInvalid";




export function ShopperIndex() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <header className="d-flex p-2  bg-info justify-content-between mt-3">
                    <div>
                        <h2>Shopper.</h2>

                    </div>

                    <nav className="d-flex">
                        <div className="me-3"><Link to="home" className="btn">Home</Link></div>
                       
                        
                        <div className="me-3"><Link to="category/men's clothing" className="btn">Men'Fashion</Link></div>
                        <div className="me-3"><Link to="category/women's clothing" className="btn">Womens'Fashion</Link></div>
                        <div className="me-3"><Link to="category/jewelery" className="btn">Jewelery</Link></div>
                        <div className="me-3"><Link to="category/electronics" className="btn">Electronics</Link></div>

                    </nav>

                    <div>
                        
                      <span className="bi bi-search me-3"></span> 
                 <Link to="register"><button className="bi bi-person me-3 bg-info "></button></Link>
                        
                        
                    </div>


                </header>
                

                <div className="mt-5">
                    <Routes>
                        <Route path="home" element={<ShopperHome />} />
                        <Route path="/" element={<ShopperHome />} />
                        <Route path="category/:catname" element={<ShopperCategory />} />
                        <Route path="register" element={<ShopperRegister />} />
                         <Route path="login" element={<ShopperLogin />} />
                        <Route path="invalid" element={<UserInvalid />} />
                       



                    </Routes>

                </div>
            </BrowserRouter>


        </div>


    )
}