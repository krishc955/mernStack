# API Endpoint Update Guide

## Files That Need API URL Updates

You need to update the following files to use the API_BASE_URL configuration:

### Store Slices to Update:
1. `client/src/store/auth-slice/index.js`
2. `client/src/store/admin/products-slice/index.js`
3. `client/src/store/admin/order-slice/index.js`
4. `client/src/store/shop/products-slice/index.js`
5. `client/src/store/shop/cart-slice/index.js`
6. `client/src/store/shop/address-slice/index.js`
7. `client/src/store/shop/order-slice/index.js`
8. `client/src/store/shop/search-slice/index.js`
9. `client/src/store/shop/review-slice/index.js`
10. `client/src/store/common-slice/index.js` ✅ (Already updated)

## How to Update Each File:

1. **Add the import at the top:**
   ```javascript
   import { API_BASE_URL } from "@/config/api";
   ```

2. **Replace `http://localhost:5000` with `${API_BASE_URL}`:**
   ```javascript
   // Before:
   `http://localhost:5000/api/shop/products`
   
   // After:
   `${API_BASE_URL}/api/shop/products`
   ```

## Quick Update Script (PowerShell - Windows)

Run this in your client folder to see which files need updates:

```powershell
Get-ChildItem -Path "src\store" -Recurse -Include "*.js" | Select-String -Pattern "localhost:5000"
```

## Manual Update Process:

For each file found:
1. Open the file
2. Add the import: `import { API_BASE_URL } from "@/config/api";`
3. Replace all `http://localhost:5000` with `${API_BASE_URL}`
4. Save the file

## Example Update:

**Before:**
```javascript
import axios from "axios";

const response = await axios.get(
  `http://localhost:5000/api/shop/products/get`
);
```

**After:**
```javascript
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const response = await axios.get(
  `${API_BASE_URL}/api/shop/products/get`
);
```
