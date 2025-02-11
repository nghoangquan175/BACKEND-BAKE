# 🍰 Bake - Backend  

The backend service for Bake provides a comprehensive solution for managing an online cake shop, including RESTful APIs and server-side rendering for the store's web interface. It supports role-based access control for store owners and staff, as well as management features for products, orders, customers, staff, and invoices.  

## 🚀 Key Features  

### 🔐 Authentication & Authorization  
- Secure user registration and login with password encryption (`bcrypt`).  
- Role-based access control (Owner, Manager, Staff).  

### 📦 Product Management  
- CRUD operations for cake products.  
- Manage product categories, descriptions, prices, and stock levels.  

### 🛒 Order Management  
- Create and update customer orders.  
- Track order status (pending, processing, completed).  

### 🧾 Invoice Management  
- Generate and manage customer invoices.  
- View detailed transaction history for orders.  

### 🧑‍💼 Customer & Staff Management  
- Manage customer accounts and details.  
- Assign roles and manage staff accounts.  

### 🌐 API & Server-Side Rendering  
- **RESTful APIs:** Provide endpoints for frontend communication.  
- **Server-Side Rendering:** Handle dynamic content rendering for the store interface using Express Handlebars.  

## 🛠️ Technologies Used  

- **Backend Framework:** Node.js with Express.js  
- **Database:** SQL Server for structured data storage  
- **Security:** `bcrypt` for password hashing, JWT for secure authentication  
- **Templating Engine:** Handlebars for server-side rendering  
- **Environment Configuration:** `dotenv` for managing environment variables  

## 📖 How to Run  

1. Clone this repository:  
   ```bash
   git clone https://github.com/nghoangquan175/BACKEND-BAKE
