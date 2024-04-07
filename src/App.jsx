
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductListing from "./ProductListing";

function App() {


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProductListing
            
            />
          }
        />

        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
