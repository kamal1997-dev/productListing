import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [imageSrc, setImagSrc] = useState("");
  const [images, setImages] = useState([]);
  const [currentImg, setCurrentImage] = useState(0);

  const getSingleProductDetails = (id) => {
    let response = axios.get(`https://dummyjson.com/products/${id}`);

    response
      .then((result) => {
        if (result.status === 200 && result.data) {
          setProduct(result.data);
          setImagSrc(result.data.thumbnail);
          setImages(result.data.images);
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    getSingleProductDetails(id);
  }, []);
  const nextHandler = () => {
    if (imageSrc.length > 0 && currentImg < images.length - 1) {
      setImagSrc(images[currentImg + 1]);
      setCurrentImage((prev) => prev + 1);
    }
  };
  const previousImageHandler = () => {
    if (imageSrc.length > 1 && currentImg >= 0) {
      setImagSrc(images[currentImg - 1]);
      setCurrentImage((prev) => prev - 1);
    }
  };
  if(error){
    return(
      <h1>Something went wrong.....</h1>
    )
  }
  return (
   
    <>
      <div className="container text-center card">
        <div className="row ">
          <div className="col card pt-4 pb-4">
            <img
              className="card-img-top mb-4"
              src={images[currentImg]}
              alt={product.title}
            />
            <div class="d-grid gap-2 col-6 mx-auto">
              <button
                disabled={currentImg === images.length - 1}
                onClick={nextHandler}
                className="btn btn-primary mb-2"
              >
                Next Image
              </button>
              <button
                className="btn btn-primary"
                disabled={currentImg === 0 || images.length === 0}
                onClick={previousImageHandler}
              >
                Previous Image
              </button>
            </div>
          </div>
          <div className="col card text-start pt-4">
            <h2>Name:{product.title}</h2>
            <h4>Description:{product.description}</h4>
            <h4>Rating:{product.rating}</h4>
            <h4>Brand:{product.brand}</h4>
            <h4>Category:{product.category}</h4>
            <h4>Price:{product.price}</h4>
            <h4>Discount:{product.discountPercentage}%</h4>
            <div class="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-warning">Add To Cart</button>
              <button className="btn btn-warning">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
