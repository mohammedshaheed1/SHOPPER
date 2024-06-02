import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const updateProduct = async () => {
    try {
      if (editProduct.imageFile) {
        const formData = new FormData();
        formData.append('product', editProduct.imageFile);

        const imageUploadResponse = await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formData,
        });

        const imageUploadResult = await imageUploadResponse.json();
        if (imageUploadResult.success) {
          editProduct.image = imageUploadResult.image_url;
        } else {
          console.error('Image upload failed');
          return;
        }
      }

      const response = await fetch('http://localhost:4000/updateproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
      });

      const result = await response.json();
      if (result.success) {
        setAllProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editProduct.id ? { ...product, ...editProduct } : product
          )
        );
        setEditProduct(null);
      } else {
        console.error('Failed to update product:', result.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditProduct({ ...editProduct, imageFile: file });
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              {editProduct && editProduct.id === product.id ? (
                <>
                <div> <img
                    src={editProduct.image}
                    alt="Product"
                    className="listproduct-product-icon"
                  />
                  
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    /></div>
                  
                  
                  <input
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="old_price"
                    value={editProduct.old_price}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="new_price"
                    value={editProduct.new_price}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editProduct.category}
                    onChange={handleEditChange}
                  />
                  <button
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={updateProduct}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt="Product"
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>{product.old_price}</p>
                  <p>{product.new_price}</p>
                  <p>{product.category}</p>
                  <button
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '5px 10px',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                </>
              )}
              <img
                onClick={() => removeProduct(product.id)}
                className='listproduct-remove-icon'
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
