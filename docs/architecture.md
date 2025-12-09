# **truEstate - Technical Documentation**

---

## **1. Overview**
**truEstate** is a full-stack retail sales management application built with **React (frontend)** and **Node.js/Express (backend)**. It provides advanced filtering, sorting, pagination, and search capabilities for retail sales data, with support for dark mode and responsive design.

### **Key Features**
- **Dashboard**: Interactive sales data visualization in a responsive table.
- **Advanced Filtering**: Filter by region, gender, age, category, payment method, tags, and date range.
- **Search**: Case-insensitive full-text search on customer name and phone.
- **Sorting**: Sort by date, quantity, amount, etc.
- **Pagination**: Server-side pagination for efficient data handling.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for all screen sizes.

---

## **2. Architecture Overview**

### **Tech Stack**
| Component       | Technology Stack                                                                 |
|-----------------|---------------------------------------------------------------------------------|
| **Frontend**    | React, Vite, Tailwind CSS, Redux Toolkit, Axios, Lucide React                 |
| **Backend**     | Node.js, Express, MongoDB, Mongoose                                           |
| **State Mgmt**  | Redux Toolkit                                                                 |
| **Styling**     | Tailwind CSS (with dark mode support)                                         |
| **Build Tool**  | Vite                                                                          |
| **API**         | RESTful API with query-based filtering and pagination                         |

### **System Architecture**
```
┌─────────────────────────────────────────────────────────────────────────
│                                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌------------------------┐ 
│   │             │    │             │    │                        |
│   │   Frontend  │───▶│   Backend   │───▶│          MongoDB
                                                                   |
│   │  (React)    │    │  (Node.js)  │    │          (Database)           │                                                                  |
│   │             │    │             │    │                               │                                                                  |
│   └─────────────┘    └─────────────┘    └─────────────-----------┘ └───────────────────────────────────-------------------------------------┘
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                                                                       │  
│      ┌─────────────┐    ┌─────────────┐    ┌─────────────-----------┐
│      │             │    │             │    │                        | │    
│      │   Redux     │    │   Tailwind  │    │   API Features (Filter,| │  
│      │  (State)    │    │  (Styling)  │    │   Sort, Paginate)      | │  
│      │             │    │             │    │                        |  │  
│      └─────────────┘    └─────────────┘    └────────────────────────┘
│   │                                                                       │  
│   └───────────────────────────────────────────────────────────────────────┘ 
```

---

## **3. Setup & Installation**

### **Prerequisites**
- **Node.js** (v14+)
- **MongoDB** (Local or Atlas URI)
- **npm** or **yarn**

---

### **Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.efjqdft.mongodb.net/
   ```
   *(Replace `MONGO_URI` with your MongoDB connection string.)*

4. Start the backend server:
   ```bash
   npm start
   ```
   *(For development with auto-restart, use `npm run dev`.)*

---

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

---

## **4. API Documentation**

### **Base URL**
```
https://tru-estate-backend-woad.vercel.app/api/sales
```

---

### **Endpoints**

#### **1. `GET /api/sales`**
Fetches sales data with optional query parameters for filtering, sorting, and pagination.

**Query Parameters:**
| Parameter | Type   |Description|
|-----------|--------|--------------------------------------------------------------------------
| `search`  | String | Case-insensitive search on customer name, phone, product name, or SKU.      |
| `page`    | Number | Page number for pagination(default:1).
| `limit`   | Number | Number of items per page (default: 50).
| `sort`    | String | Field to sort by (e.g., `date`, `-date``quantity`).
| `regions[]` | Array | Filter by customer region (e.g., `regions[]=North&regions[]=South`).
| `genders` | Array  | Filter by customer gender (e.g., `genders[]=Male&genders[]=Female`).        |
| `categories` | Array | Filter by product category.                                                 |
| `paymentMethods` | Array | Filter by payment method.                                                  |
| `tags[]`  | Array  | Filter by tags.                                                           |
| `ageMin`  | Number | Minimum customer age.                                                      |
| `ageMax`  | Number | Maximum customer age.                                                      |

**Response:**
```json
{
  "status": "success",
  "results": 50,
  "total": 1000,
  "totalPages": 20,
  "currentPage": 1,
  "data": {
    "sales": [
      {
        "date": "2023-10-01T12:00:00Z",
        "customer": {
          "name": "John Doe",
          "phone": "1234567890",
          "gender": "Male",
          "age": 30,
          "region": "North",
          "type": "Customer"
        },
        "product": {
          "sku": "PROD001",
          "name": "Laptop",
          "brand": "Dell",
          "category": "Electronics",
          "price": 999.99
        },
        "quantity": 1,
        "tags": ["sale", "premium"],
        "pricing": {
          "discount": 10,
          "totalAmount": 999.99,
          "finalAmount": 899.99
        },
        "paymentMethod": "Credit Card",
        "operational": {
          "orderId": "ORD12345",
          "status": "Delivered",
          "deliveryType": "Standard"
        },
        "store": {
          "storeId": "STORE001",
          "location": "New York"
        },
        "salesperson": {
          "id": "SALESPERSON001",
          "name": "Jane Smith"
        }
      }
    ]
  }
}
```

---

#### **2. `GET /api/sales/filters`**
Returns available filter options for UI dropdowns.

**Response:**
```json
{
  "status": "success",
  "data": {
    "regions": ["North", "South", "East", "West"],
    "genders": ["Male", "Female", "Other"],
    "categories": ["Electronics", "Clothing", "Furniture"],
    "paymentMethods": ["Credit Card", "Debit Card", "Cash", "PayPal"],
    "tags": ["sale", "premium", "discount"]
  }
}
```

---

## **5. Database Schema**

### **Sales Model (`backend/models/Sales.js`)**
The `Sales` schema defines the structure of retail sales records stored in MongoDB.

```javascript
const SaleSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Transaction date

  customer: {
    customerId: { type: String },
    name: { type: String },
    phone: { type: String },
    gender: { type: String },
    age: { type: Number },
    region: { type: String },
    type: { type: String }
  },

  product: {
    sku: { type: String },
    name: { type: String },
    brand: { type: String },
    category: { type: String },
    price: { type: Number }
  },

  quantity: { type: Number, required: true }, // Quantity purchased

  tags: [{ type: String }], // Tags for categorization

  pricing: {
    discount: { type: Number },
    totalAmount: { type: Number },
    finalAmount: { type: Number }
  },

  paymentMethod: { type: String }, // Payment method (e.g., Credit Card)

  operational: {
    orderId: { type: String },
    status: { type: String }, // Order status (e.g., Delivered)
    deliveryType: { type: String } // Delivery type (e.g., Standard)
  },

  store: {
    storeId: { type: String },
    location: { type: String }
  },

  salesperson: {
    id: { type: String },
    name: { type: String }
  }
}, { timestamps: true }); // Auto-adds `createdAt` and `updatedAt`
```

---

## **6. Configuration**

### **Environment Variables**
The backend uses environment variables for configuration. Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/retail_sales

# Server Configuration
PORT=5000
NODE_ENV=production
```

### **Default Values**
- If `MONGO_URI` is not provided, the app falls back to:
  ```javascript
  mongodb+srv://zama:zamaboy@cluster0.efjqdft.mongodb.net/retail_sales1
  ```

---

## **7. Development Guidelines**

### **Backend Best Practices**
1. **Error Handling**: Use `try-catch` blocks for database operations.
2. **Validation**: Validate input data before processing.
3. **Logging**: Use `console.log` for debugging (replace with a logging library in production).
4. **Security**: Sanitize user input to prevent injection attacks.

### **Frontend Best Practices**
1. **State Management**: Use Redux Toolkit for global state.
2. **Performance**: Optimize API calls with debouncing (e.g., search input).
3. **Accessibility**: Ensure components are keyboard-navigable and screen-reader-friendly.
4. **Testing**: Write unit tests for critical components.

---

## **8. Deployment Instructions**

### **Frontend Deployment**
1. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist/` folder to a static hosting service (e.g., Vercel, Netlify, or GitHub Pages).

### **Backend Deployment**
1. Ensure the backend is built for production:
   ```bash
   cd backend
   npm install --production
   ```
2. Deploy to a Node.js hosting service (e.g., Vercel, Render, or Heroku).

### **Vercel Deployment (Example)**
1. Push the repository to a Git provider (e.g., GitHub).
2. Import the project into Vercel.
3. Configure environment variables in Vercel settings.
4. Deploy!

---

## **9. Key Files & Directories**

### **Backend**
| File/Directory       | Purpose                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `backend/index.js`   | Entry point for the Express server.                                     |
| `backend/routes/`    | API route definitions.                                                  |
| `backend/controllers/` | Business logic for API endpoints.                                     |
| `backend/models/`    | MongoDB schema definitions.                                             |
| `backend/utils/`     | Utility functions (e.g., `apiFeatures.js` for query parsing).          |

### **Frontend**
| File/Directory       | Purpose                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `frontend/src/App.jsx` | Main application component.                                             |
| `frontend/src/redux/` | Redux store and slices for state management.                           |
| `frontend/src/components/` | Reusable UI components (e.g., `DataTable`, `Sidebar`).               |
| `frontend/src/services/` | API service layer (e.g., `api.js`).                                    |
| `frontend/vite.config.js` | Vite configuration for bundling.                                       |

---

## **10. Troubleshooting**

### **Common Issues & Fixes**
| Issue                          | Solution                                                                 |
|--------------------------------|--------------------------------------------------------------------------|
| **MongoDB connection error**    | Verify `MONGO_URI` in `.env` and ensure MongoDB is running.              |
| **CORS errors**                | Ensure `cors()` middleware is enabled in `backend/index.js`.              |
| **Frontend not loading**       | Check `vite.config.js` for correct paths and ensure `npm run dev` is running. |
| **API not returning data**     | Verify query parameters and backend logs for errors.                     |

---

## **11. Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## **12. License**
This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## **13. Appendix**

### **API Features (`backend/utils/apiFeatures.js`)**
The `APIFeatures` class enables advanced query parsing for filtering, sorting, and pagination:

```javascript
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Search by product or customer
    search() {
        const s = this.queryString.search;
        if (s) {
            const regex = new RegExp(s, "i");
            this.query = this.query.find({
                $or: [
                    { "customer.name": regex },
                    { "customer.phone": regex },
                    { "product.name": regex },
                    { "product.sku": regex }
                ]
            });
        }
        return this;
    }

    // Filtering logic
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields", "search"];
        excludedFields.forEach((f) => delete queryObj[f]);

        // Parse MongoDB operators (e.g., `gte`, `lte`)
        let parsedQuery = JSON.parse(
            JSON.stringify(queryObj).replace(
                /\b(gte|gt|lte|lt)\b/g,
                (match) => `$${match}`
            )
        );

        // Handle array inputs (e.g., `regions[]=North&regions[]=South`)
        Object.keys(parsedQuery).forEach((key) => {
            if (key.endsWith("[]")) {
                const newKey = key.replace("[]", "");
                parsedQuery[newKey] = Array.isArray(parsedQuery[key])
                    ? parsedQuery[key]
                    : [parsedQuery[key]];
                delete parsedQuery[key];
            }
        });

        // Map UI keys to MongoDB fields
        const filterMap = {
            regions: "customer.region",
            genders: "customer.gender",
            categories: "product.category",
            paymentMethods: "paymentMethod",
            tags: "tags",
            ageMin: "customer.age",
            ageMax: "customer.age"
        };

        Object.keys(filterMap).forEach((key) => {
            if (parsedQuery[key]) {
                const field = filterMap[key];
                if (key === "ageMin" || key === "ageMax") {
                    // Handle age range queries
                    this.query = this.query.find({
                        [field]: {
                            $gte: parsedQuery.ageMin,
                            $lte: parsedQuery.ageMax
                        }
                    });
                } else {
                    // Handle array filters (e.g., `regions[]=North`)
                    this.query = this.query.find({ [field]: { $in: parsedQuery[key] } });
                }
            }
        });

        return this;
    }

    // Sorting
    sort() {
        const sortBy = this.queryString.sort || '-date';
        this.query = this.query.sort(sortBy);
        return this;
    }

    // Pagination
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
```

---

## **14. Conclusion**
**truEstate** is a scalable, full-stack retail sales management system with a clean architecture and modern tooling. This documentation provides a comprehensive guide for setup, development, and deployment. For further customization, refer to the source code and extend as needed.