export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "lower-wear", label: "Lower Wear" },
      { id: "upper-wear", label: "Upper Wear" },
      { id: "accessories", label: "Accessories" },
      { id: "undergarments", label: "Undergarments" },
    ],
  },
  {
    label: "Price (₹)",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price in ₹",
  },
  {
    label: "Sale Price (₹)",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price in ₹ (optional)",
  },
];

export const sizeOptions = [
  { id: "XS", label: "XS" },
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
  { id: "XXL", label: "XXL" },
  { id: "28", label: "28" },
  { id: "30", label: "30" },
  { id: "32", label: "32" },
  { id: "34", label: "34" },
  { id: "36", label: "36" },
  { id: "38", label: "38" },
  { id: "40", label: "40" },
  { id: "42", label: "42" },
];

export const colorOptions = [
  { id: "black", label: "Black", code: "#000000" },
  { id: "white", label: "White", code: "#FFFFFF" },
  { id: "red", label: "Red", code: "#FF0000" },
  { id: "blue", label: "Blue", code: "#0000FF" },
  { id: "green", label: "Green", code: "#008000" },
  { id: "yellow", label: "Yellow", code: "#FFFF00" },
  { id: "pink", label: "Pink", code: "#FFC0CB" },
  { id: "purple", label: "Purple", code: "#800080" },
  { id: "orange", label: "Orange", code: "#FFA500" },
  { id: "gray", label: "Gray", code: "#808080" },
  { id: "brown", label: "Brown", code: "#A52A2A" },
  { id: "navy", label: "Navy", code: "#000080" },
  { id: "maroon", label: "Maroon", code: "#800000" },
  { id: "teal", label: "Teal", code: "#008080" },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  "lower-wear": "Lower Wear",
  "upper-wear": "Upper Wear",
  accessories: "Accessories",
  undergarments: "Undergarments",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "lower-wear", label: "Lower Wear" },
    { id: "upper-wear", label: "Upper Wear" },
    { id: "accessories", label: "Accessories" },
    { id: "undergarments", label: "Undergarments" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
