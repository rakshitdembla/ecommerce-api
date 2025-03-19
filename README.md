# E-Commerce API

## 📌 Overview  
E-Commerce API is a RESTful service designed for managing an online store, featuring secure authentication, product and cart management, and upcoming order management along with an admin panel for private product management. Built using **Node.js, Express, MongoDB**, and **Mongoose**.

## 🚀 Features  
- **User Authentication:** Secure user registration and login with JWT authentication.  
- **Product Management:** Public access to view products; upcoming admin-only secure product creation, update, and deletion.  
- **Cart Management:** Users can add, remove, and view cart items.  
- **Database Integration:** MongoDB for efficient data handling.  
- **Upcoming Features:** Order management system and an admin panel for private product control.  

## 🛠 Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Security:** JWT, bcrypt  

## 🛆 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/rakshitdembla/ecommerce-api.git
cd ecommerce-api
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Setup Environment Variables  
Create a `.env` file in the root directory and add the following:  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

### 4️⃣ Run the Server  
```bash
npm start
```

## 📌 API Endpoints  

### **Auth Routes**
| Method | Endpoint       | Description            | Auth Required |
|--------|--------------|------------------------|--------------|
| POST   | `/api/auth/register` | Register a new user | ❌ No |
| POST   | `/api/auth/login` | User login (JWT) | ❌ No |

### **Product Routes**  
| Method | Endpoint         | Description                     | Access |
|--------|-----------------|---------------------------------|--------------|
| GET    | `/api/products` | Get all products | 🌍 Public |
| POST   | `/api/products` | Add a new product | 🔒 Upcoming: Admin Only |
| PATCH  | `/api/products/:id` | Update a product | 🔒 Upcoming: Admin Only |
| DELETE | `/api/products/:id` | Delete a product | 🔒 Upcoming: Admin Only |

### **Cart Routes**  
| Method | Endpoint         | Description                     | Auth Required |
|--------|-----------------|---------------------------------|--------------|
| GET    | `/api/cart` | Get cart items | ✅ Yes |
| POST   | `/api/cart` | Add an item to cart | ✅ Yes |
| DELETE | `/api/cart/:id` | Remove item from cart | ✅ Yes |

## 📂 Project Structure  
```
├── controllers
│   ├── auth.js         # Handles user authentication (login, register)
│   ├── products.js     # Handles product operations (CRUD - Admin access coming soon)
│   ├── cart.js         # Handles cart operations (Add, Remove, View items)
│
├── routes
│   ├── auth_routes.js   # Authentication routes
│   ├── product_routes.js  # Product routes
│   ├── cart_routes.js   # Cart routes
│
├── models
│   ├── User.js         # User model (name, email, password)
│   ├── Product.js      # Product model (name, price, description, etc.)
│   ├── Cart.js         # Cart model (user, product, quantity)
│
├── .env                # Environment variables (PORT, MONGO_URI, JWT_SECRET_KEY)
├── server.js           # Main server file (Connects DB, Middleware, Routes)
├── package.json        # Dependencies and scripts
```

## 🔜 Upcoming Features  
- **Order Management System** (Users can place and track orders).  
- **Admin Panel** (Private Access for Product Management).  
- **Enhanced Security & Authentication**.  

## 🐜 License  
This project is licensed under the **MIT License**.

---

💡 **Contributions, issues, and feature requests are welcome!**  
Made with ❤️ by [@rakshitdembla](https://github.com/rakshitdembla)
