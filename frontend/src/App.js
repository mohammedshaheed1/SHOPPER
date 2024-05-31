import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import PlaceOrder from "./Pages/PlaceOrder";
import Profile from "./Components/Profile/Profile";
import Order from "./Components/Orders/Order";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />
          <Route path="/product/:productId" element={<Product />} />
          {/* <Route path=":productId" element={<Product />} />
          </Route> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/login" element={<LoginSignup />} />
           <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Order/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

// import React from "react";
// import Navbar from "./Components/Navbar/Navbar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Shop from "./Pages/Shop";
// import ShopCategory from "./Pages/ShopCategory";
// import Product from "./Pages/Product";
// import Cart from "./Pages/Cart";
// import LoginSignup from "./Pages/LoginSignup";
// import Footer from "./Components/Footer/Footer";
// import men_banner from "./Components/Assets/banner_mens.png";
// import women_banner from "./Components/Assets/banner_women.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
// import PlaceOrder from "./Pages/PlaceOrder";
// import Profile from "./Components/Profile/Profile";
// import Order from "./Components/Orders/Order";
// import { AuthProvider } from "./Components/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Shop />} />
//           <Route
//             path="/mens"
//             element={<ShopCategory banner={men_banner} category="men" />}
//           />
//           <Route
//             path="/womens"
//             element={<ShopCategory banner={women_banner} category="women" />}
//           />
//           <Route
//             path="/kids"
//             element={<ShopCategory banner={kid_banner} category="kid" />}
//           />
//           <Route path="/product/:productId" element={<Product />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order" element={<PlaceOrder />} />
//           <Route path="/login" element={<LoginSignup />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/order" element={<Order />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
