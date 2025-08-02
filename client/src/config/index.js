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
      { id: "suits", label: "Suits" },
      { id: "sarees", label: "Sarees" },
      { id: "kurtas", label: "Kurtas" },
      { id: "jackets", label: "Jackets" },
      { id: "shawls", label: "Shawls" },
      { id: "dupattas", label: "Dupattas" },
      { id: "lehengas", label: "Lehengas" },
      { id: "gowns", label: "Gowns" },
    ],
  },
  {
    label: "Fabric",
    name: "brand",
    componentType: "select",
    options: [
      { id: "cotton", label: "Cotton" },
      { id: "silk", label: "Silk" },
      { id: "chiffon", label: "Chiffon" },
      { id: "georgette", label: "Georgette" },
      { id: "crepe", label: "Crepe" },
      { id: "linen", label: "Linen" },
      { id: "velvet", label: "Velvet" },
      { id: "net", label: "Net" },
      { id: "organza", label: "Organza" },
      { id: "banarasi", label: "Banarasi" },
      { id: "chanderi", label: "Chanderi" },
      { id: "tussar", label: "Tussar" },
    ],
  },
  {
    label: "Stitch Type",
    name: "stitchType",
    componentType: "select",
    options: [
      { id: "stitched", label: "Stitched" },
      { id: "unstitched", label: "Unstitched" },
      { id: "semi-stitched", label: "Semi-Stitched" },
    ],
  },
  {
    label: "Occasion",
    name: "occasion",
    componentType: "select",
    options: [
      { id: "casual", label: "Casual" },
      { id: "formal", label: "Formal" },
      { id: "wedding", label: "Wedding" },
      { id: "party", label: "Party" },
      { id: "festival", label: "Festival" },
      { id: "office", label: "Office" },
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
  { id: "32", label: "32" },
  { id: "34", label: "34" },
  { id: "36", label: "36" },
  { id: "38", label: "38" },
  { id: "40", label: "40" },
  { id: "42", label: "42" },
  { id: "44", label: "44" },
  { id: "46", label: "46" },
  { id: "Free Size", label: "Free Size" },
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
  { id: "cream", label: "Cream", code: "#F5F5DC" },
  { id: "beige", label: "Beige", code: "#F5F5DC" },
  { id: "gold", label: "Gold", code: "#FFD700" },
  { id: "silver", label: "Silver", code: "#C0C0C0" },
  { id: "magenta", label: "Magenta", code: "#FF00FF" },
  { id: "turquoise", label: "Turquoise", code: "#40E0D0" },
  { id: "coral", label: "Coral", code: "#FF7F50" },
  { id: "mint", label: "Mint", code: "#98FB98" },
  { id: "lavender", label: "Lavender", code: "#E6E6FA" },
  { id: "peach", label: "Peach", code: "#FFCBA4" },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "All Products",
    path: "/shop/listing",
  },
  {
    id: "suits",
    label: "Suits",
    path: "/shop/listing?category=suits",
  },
  {
    id: "sarees",
    label: "Sarees",
    path: "/shop/listing?category=sarees",
  },
  {
    id: "kurtas",
    label: "Kurtas",
    path: "/shop/listing?category=kurtas",
  },
  {
    id: "jackets",
    label: "Jackets",
    path: "/shop/listing?category=jackets",
  },
  {
    id: "shawls",
    label: "Shawls",
    path: "/shop/listing?category=shawls",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  suits: "Suits",
  sarees: "Sarees", 
  kurtas: "Kurtas",
  jackets: "Jackets",
  shawls: "Shawls",
  dupattas: "Dupattas",
  lehengas: "Lehengas",
  gowns: "Gowns",
};

export const fabricOptionsMap = {
  cotton: "Cotton",
  silk: "Silk",
  chiffon: "Chiffon",
  georgette: "Georgette",
  crepe: "Crepe",
  linen: "Linen",
  velvet: "Velvet",
  net: "Net",
  organza: "Organza",
  banarasi: "Banarasi",
  chanderi: "Chanderi",
  tussar: "Tussar",
};

export const filterOptions = {
  category: [
    { id: "suits", label: "Suits" },
    { id: "sarees", label: "Sarees" },
    { id: "kurtas", label: "Kurtas" },
    { id: "jackets", label: "Jackets" },
    { id: "shawls", label: "Shawls" },
    { id: "dupattas", label: "Dupattas" },
    { id: "lehengas", label: "Lehengas" },
    { id: "gowns", label: "Gowns" },
  ],
  fabric: [
    { id: "cotton", label: "Cotton" },
    { id: "silk", label: "Silk" },
    { id: "chiffon", label: "Chiffon" },
    { id: "georgette", label: "Georgette" },
    { id: "crepe", label: "Crepe" },
    { id: "linen", label: "Linen" },
    { id: "velvet", label: "Velvet" },
    { id: "net", label: "Net" },
    { id: "organza", label: "Organza" },
    { id: "banarasi", label: "Banarasi" },
    { id: "chanderi", label: "Chanderi" },
    { id: "tussar", label: "Tussar" },
  ],
  stitchType: [
    { id: "stitched", label: "Stitched" },
    { id: "unstitched", label: "Unstitched" },
    { id: "semi-stitched", label: "Semi-Stitched" },
  ],
  occasion: [
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "wedding", label: "Wedding" },
    { id: "party", label: "Party" },
    { id: "festival", label: "Festival" },
    { id: "office", label: "Office" },
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

export const videoFormControls = [
  {
    label: "Video Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter an elegant video title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Share a beautiful description of your video",
    rows: 3,
  },
  {
    label: "Video Embed Code",
    name: "embedCode",
    componentType: "textarea",
    placeholder: "Paste your Facebook/Instagram/YouTube embed code here",
    rows: 3,
  },
];
