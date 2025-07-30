# Server Performance Optimizations

## Express.js Optimizations (server.js)

Add these optimizations to your server.js file:

```javascript
// Add at the top with other imports
const compression = require('compression');

// Add after CORS setup
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Connection pooling for MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10, // Maximum 10 connections in pool
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering for commands
});

// Cache control headers
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else if (req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});
```

## Install compression package:
```bash
npm install compression
```

## Database Optimizations

Add these indexes to your MongoDB collections:

```javascript
// Products collection indexes
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "brand": 1 });
db.products.createIndex({ "price": 1 });
db.products.createIndex({ "salePrice": 1 });
db.products.createIndex({ "totalStock": 1 });
db.products.createIndex({ "createdAt": -1 });
db.products.createIndex({ "category": 1, "brand": 1 });
db.products.createIndex({ "price": 1, "salePrice": 1 });

// Users collection indexes
db.users.createIndex({ "email": 1 });
db.users.createIndex({ "role": 1 });

// Orders collection indexes
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "orderStatus": 1 });
db.orders.createIndex({ "createdAt": -1 });
db.orders.createIndex({ "userId": 1, "createdAt": -1 });

// Cart collection indexes
db.carts.createIndex({ "userId": 1 });
```

## Render.com Deployment Optimizations

1. **Enable automatic deploys** from your main branch
2. **Set NODE_ENV=production** in environment variables
3. **Enable health checks** with endpoint `/health`
4. **Scale up to paid plan** if budget allows (eliminates cold starts)

## API Response Optimizations

Add response caching middleware:

```javascript
// Simple in-memory cache (for development)
const cache = new Map();

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached && (Date.now() - cached.timestamp) < duration * 1000) {
      return res.json(cached.data);
    }
    
    const originalSend = res.json;
    res.json = function(data) {
      cache.set(key, { data, timestamp: Date.now() });
      return originalSend.call(this, data);
    };
    
    next();
  };
};

// Use on product routes (cache for 5 minutes)
app.use('/api/shop/products', cacheMiddleware(300));
app.use('/api/common/feature', cacheMiddleware(600)); // 10 minutes for features
```

## Critical Performance Actions

1. **Implement server-side optimizations immediately**
2. **Add database indexes**
3. **Enable compression**
4. **Consider Redis for caching** (if traffic increases)
5. **Monitor server response times**
6. **Optimize database queries** with aggregation pipelines
