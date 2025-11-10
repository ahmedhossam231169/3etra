# 3etra - عترة | Restaurant Menu System

A modern, responsive restaurant menu and ordering system built with vanilla JavaScript, HTML, CSS, and Tailwind CSS. Features user authentication, product management dashboard, shopping cart, and order processing.

## Features

- 🔐 **User Authentication System**
  - Admin and Client login
  - Session management with localStorage
  - Protected admin dashboard

- 🛍️ **Product Management**
  - Add/edit/delete products and appetizers
  - Image upload support (Base64)
  - Multiple size options with different prices
  - Category management (Menu & Appetizers)

- 🛒 **Shopping Cart**
  - Add items to cart with custom options
  - Quantity selector
  - Combo options
  - Customer notes for each item

- 📋 **Order Processing**
  - Checkout form with customer details
  - Payment method selection (Cash/Card)
  - Invoice generation
  - Print functionality

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark theme with amber accents
  - Smooth animations and transitions
  - RTL support for Arabic content

## Technologies Used

- HTML5
- CSS3 / Tailwind CSS v4
- Vanilla JavaScript
- LocalStorage for data persistence
- Base64 image encoding

## Project Structure

```
etra3/
├── index.html          # Login page (main entry point)
├── insex.html          # Main restaurant menu page
├── dashboard.html      # Admin product management dashboard
├── login.html          # Login page (alternative)
├── main.js             # Main JavaScript logic
├── src/
│   ├── input.css       # Tailwind source CSS
│   └── output.css      # Compiled Tailwind CSS
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd etra3
   ```

2. **Install dependencies** (optional - for CSS compilation)
   ```bash
   npm install
   ```

3. **Compile CSS** (if you make changes to input.css)
   ```bash
   npx tailwindcss -i ./src/input.css -o ./src/output.css
   ```

4. **Run the application**
   - Open `index.html` in a web browser
   - Or use a local server (e.g., Live Server extension in VS Code)

## Usage

### Admin Access

1. Open `index.html` in your browser
2. Select "مدير" (Admin) as user type
3. Login credentials:
   - Username: `admin`
   - Password: `admin123`
4. Access the dashboard to manage products

### Client Access

1. Open `index.html`
2. Select "عميل" (Client) as user type
3. Enter any username (password optional)
4. Browse menu and place orders

### Guest Access

Click "الدخول كزائر (بدون تسجيل دخول)" to browse without login.

## Admin Dashboard Features

- Add new products with images, descriptions, and sizes
- Edit existing products
- Delete products
- Manage categories (Menu & Appetizers)
- View all products in a grid layout

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- LocalStorage support required
- FileReader API support for image uploads

## Notes

- All data is stored in browser localStorage (client-side only)
- Images are converted to Base64 format for storage
- For production use, consider implementing a backend server
- Admin credentials are hardcoded (should be moved to secure backend in production)

## License

This project is open source and available for personal/commercial use.

## Author

Developed for 3etra Restaurant

---

© 2024 3etra - عترة. All rights reserved.

