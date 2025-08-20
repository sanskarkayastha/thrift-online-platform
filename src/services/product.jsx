import axios from "axios";

export const addProduct = async (productData) => {
    const response = await axios.post("http://localhost:4000/products", productData);
    return response.data;
}

export const convertToBase64 = (files) => {
    return Promise.all(
      files.map(file => 
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        })
      )
    );
};
  
