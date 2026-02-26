# 🛒 ShopTest — React E2E & Component Testing with Cypress

![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white) ![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress&logoColor=white) ![Testing Library](https://img.shields.io/badge/Testing%20Library-Cypress-E33332?logo=testinglibrary&logoColor=white)

> **ShopTest** là ứng dụng web thương mại điện tử xây dựng bằng **ReactJS** và **Vite**, tích hợp kiểm thử toàn diện bằng **Cypress** — bao gồm cả **E2E Testing** và **Component Testing** với **56 test cases**.

🌐 **Live Demo:** [https://cypress-mocha.vercel.app/](https://cypress-mocha.vercel.app/)

---

## 🚀 Features

### 🔐 Authentication
*   **Đăng nhập / Đăng ký** với form validation đầy đủ
*   **Protected Routes** — Dashboard, Cart, Profile yêu cầu đăng nhập
*   **Toggle password** visibility, password strength indicator
*   **Mock API** sử dụng localStorage (không cần backend)

### 🛍️ Product Management
*   **Danh sách sản phẩm** với grid layout responsive
*   **Tìm kiếm** theo tên sản phẩm (real-time)
*   **Lọc danh mục** — Electronics, Sports, Home, Fashion

### 🛒 Shopping Cart
*   **Thêm / Xóa / Cập nhật** số lượng sản phẩm
*   **Tính tổng tiền** tự động
*   **Persist state** qua localStorage (không mất khi refresh)
*   **Đặt hàng** với thông báo thành công

### 🎨 UI/UX
*   **Dark theme** premium với glassmorphism effects
*   **Micro-animations** và hover effects
*   **Responsive design** cho mọi kích thước màn hình
*   **Toast notifications** cho mọi hành động

---

## 🛠️ Tech Stack

### Frontend
-   **Core**: ReactJS (v19), React Router v7
-   **Build**: Vite 7
-   **State**: Context API (AuthContext, CartContext)
-   **Styling**: Vanilla CSS (Dark theme, Inter font)

### Testing
-   **Framework**: Cypress 15
-   **E2E Testing**: 32 test cases across 5 spec files
-   **Component Testing**: 29 test cases across 6 spec files
-   **Utilities**: @testing-library/cypress

---

## 🧪 Test Cases (56 total)

### E2E Testing — 32 tests

| Spec | Chức năng | TC |
|---|---|:---:|
| `login.cy.js` | Đăng nhập, validation, toggle password, chuyển trang | 8 |
| `register.cy.js` | Đăng ký, mật khẩu không khớp, email trùng, validation | 7 |
| `products.cy.js` | Hiển thị sản phẩm, tìm kiếm, lọc danh mục | 6 |
| `cart.cy.js` | Giỏ hàng trống, thêm/sửa/xóa sản phẩm, đặt hàng | 6 |
| `navigation.cy.js` | Header links, protected routes, trang 404 | 5 |

### Component Testing — 29 tests

| Spec | Component | TC |
|---|---|:---:|
| `LoginForm.cy.jsx` | LoginPage | 6 |
| `RegisterForm.cy.jsx` | RegisterPage | 5 |
| `ProductCard.cy.jsx` | ProductCard | 5 |
| `CartItem.cy.jsx` | CartItem | 5 |
| `Header.cy.jsx` | Header | 4 |
| `Toast.cy.jsx` | Toast | 4 |

---

## � Installation & Usage

```bash
# Clone repository
git clone https://github.com/Fizh-May/Cypress.git
cd Cypress

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Tài khoản demo

| Email | Password |
|---|---|
| `admin@test.com` | `Admin@123` |
| `john@test.com` | `Test@123` |

### Run Cypress Tests

```bash
# Mở Cypress UI (interactive mode)
npm run cy:open

# Chạy E2E tests (headless)
npm run cy:e2e

# Chạy Component tests (headless)
npm run cy:component
```

> ⚠️ **Note:** E2E tests yêu cầu dev server đang chạy (`npm run dev`). Component tests không cần.

---

## 🗂️ Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # AuthContext, CartContext
│   ├── pages/               # 8 pages (Login, Register, Products, Cart, ...)
│   ├── services/            # Mock API (auth, products)
│   └── index.css            # Global dark theme styles
├── cypress/
│   ├── e2e/                 # 5 E2E spec files
│   ├── component/           # 6 Component spec files
│   └── support/             # Custom commands & setup
├── cypress.config.js
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a PR.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
