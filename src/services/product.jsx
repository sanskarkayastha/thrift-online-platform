import axios from "axios";

export const addProduct = async (productData) => {
    const response = await axios.post("http://localhost:4000/products", productData);
    return response.data;
}

export const getAllProduct = async ()=>{
  let data = await axios.get("http://localhost:4000/products")
  return data.data
}

export let  productCategories = {
  'Clothing & Fashion': ['Men', 'Women', 'Kids', 'Unisex'],
  'Electronics & Gadgets': ['Phones', 'Laptops', 'Cameras', 'Audio', 'Wearables', 'Gaming'],
  'Home & Living': ['Furniture', 'Kitchenware', 'Appliances', 'Home Decor', 'Lighting'],
  'Books & Media': ['Books', 'Comics', 'Magazines', 'CDs/DVDs', 'Vinyl', 'Games'],
  'Sports & Outdoors': ['Fitness', 'Outdoor Gear', 'Bicycles', 'Camping', 'Sporting Goods'],
  'Beauty & Personal Care': ['Skincare', 'Haircare', 'Makeup', 'Perfume', 'Grooming Tools'],
  'Toys, Kids & Baby': ['Toys', 'Baby Clothes', 'Strollers', 'Learning Tools'],
  'Collectibles & Vintage': ['Antiques', 'Memorabilia', 'Coins', 'Art', 'Handmade Crafts'],
  'Automotive': ['Car Accessories', 'Motorbike Gear', 'Tools', 'Spare Parts'],
  'Other / Miscellaneous': ['General']
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

export const getUserListings = async (id)=>{
  let listings = []
  await getAllProduct().then(
    (response)=>{
      if(response.length>0){
        response.forEach(
          (listing)=>{
            if(listing.userId.trim() === id.trim()){
              listings.push(listing)
            }
          }
        )
      }
    }
  ) 
  return listings
}
  
