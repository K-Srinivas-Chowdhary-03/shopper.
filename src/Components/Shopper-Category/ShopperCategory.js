import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams,Link } from "react-router-dom";


export function ShopperCategory() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [cookies,setCookie,removeCookie]=useCookies();
  const navigate=useNavigate();
  const[cartItems,setCartItems]=useState([]);
  const [itemsCount,setItemsCount]=useState(0);

  useEffect(() => {
  if(cookies["userid"]==undefined)
  {
    navigate("/login");
  }

  function Signout(){
    removeCookie("userid");
  }

    axios({
      method: "get",
      url: `https://fakestoreapi.com/products/category/${params.catname}`,
    }).then((response) => {
      setProducts(response.data);
    });
  }, [params.catname]);

  
  function handleAddToCartClick(e){
    alert("Item Added To Cart");
   axios({
    method:"get",
    url:`https://fakestoreapi.com/products/${e.target.id}`,
   }).then((response)=>
   {
    cartItems.push(response.data);
    GetCartItemsCount();
   });

  }

  function GetCartItemsCount(){
    setItemsCount(cartItems.length);
 }

 
    function handleRemoveItem(e){
        cartItems.shift(e.target.id);
        GetCartItemsCount();
    }

     function RemoveAllCartItems(e){
        alert('if you sure to delete all your cartitems');
        cartItems.splice(e.target.id);
        GetCartItemsCount();
    }

  return (
    <div className="container-fluid">
      <section className="row">
     
      <main className=" col-8 d-flex flex-wrap">
         
        {products.map((product) => (
          <div className="card m-2 p-2" style={{ width: "200px" }}>
            <img src={product.image} height="150px" className="card-img-top" />
            <div className="card-body" style={{ height: "150px" }}>
              <p>{product.title}</p>
            </div>
            <div className="card-footer">
            <button id={product.id}  onClick={handleAddToCartClick} className="btn btn-info w-100">Add To Cart <span className="bi bi-cart4"></span></button>
            </div>
           
          </div>
        ))}
      </main>
       <aside className="col-4">
        <button class="btn btn-info text-white m-2"><span className="bi bi-cart4"></span> [{itemsCount}]View Cart items</button>

       
       <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Preview</th>
            <td>
           <button  onClick={RemoveAllCartItems} className="btn btn-danger">
           <span className="bi bi-trash"></span>
              </button>
            </td>
          
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(item=>
              <tr id={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td> <img src={item.image} width="50px" height="50px" /></td>
              <td>
               <button id={item.id} onClick={handleRemoveItem} className="btn btn-danger">
               <span className="bi bi-trash"></span>
                </button>
                </td>
              </tr>


            )
          }
        </tbody>

       </table>


       </aside>
       </section>
      
    
    </div>
  );
}
