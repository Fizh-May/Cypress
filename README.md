# 🛒 ShopTest — React + Cypress Testing Demo

Ứng dụng web thương mại điện tử xây dựng bằng **React + Vite**, tích hợp kiểm thử toàn diện bằng **Cypress** (E2E Testing & Component Testing).

## 📦 Công nghệ sử dụng

| Mục đích | Công nghệ |
|---|---|
| Frontend | React 19, React Router v7 |
| Build tool | Vite 7 |
| Testing | Cypress 15 |
| Styling | Vanilla CSS (Dark theme, Glassmorphism) |

## 🚀 Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại `https://cypress-mocha.vercel.app/`

### Tài khoản demo

| Email | Mật khẩu |
|---|---|
| `admin@test.com` | `Admin@123` |
| `john@test.com` | `Test@123` |

## ✅ Chạy Cypress Tests

```bash
# Mở Cypress UI (chọn browser thủ công)
npm run cy:open

# Chạy E2E tests (headless, Edge)
npm run cy:e2e

# Chạy Component tests (headless, Edge)
npm run cy:component

# Chạy bằng Electron (ổn định nhất trên Windows)
npx cypress run --e2e --browser electron
npx cypress run --component --browser electron
```

> **Lưu ý:** E2E tests yêu cầu dev server đang chạy (`npm run dev`). Component tests không cần.

## 🗂️ Cấu trúc dự án

```
├── src/
│   ├── components/        # UI components tái sử dụng
│   │   ├── Header.jsx         # Header + navigation + cart badge
│   │   ├── ProductCard.jsx    # Card hiển thị sản phẩm
│   │   ├── CartItem.jsx       # Item trong giỏ hàng
│   │   ├── Toast.jsx          # Thông báo toast
│   │   └── ProtectedRoute.jsx # Bảo vệ route cần đăng nhập
│   ├── context/           # React Context (state toàn cục)
│   │   ├── AuthContext.jsx    # Quản lý xác thực người dùng
│   │   └── CartContext.jsx    # Quản lý giỏ hàng (persist localStorage)
│   ├── pages/             # Các trang
│   │   ├── HomePage.jsx       # Trang chủ
│   │   ├── LoginPage.jsx      # Đăng nhập
│   │   ├── RegisterPage.jsx   # Đăng ký
│   │   ├── DashboardPage.jsx  # Dashboard (protected)
│   │   ├── ProductsPage.jsx   # Danh sách sản phẩm
│   │   ├── CartPage.jsx       # Giỏ hàng
│   │   ├── ProfilePage.jsx    # Hồ sơ cá nhân
│   │   └── NotFoundPage.jsx   # Trang 404
│   ├── services/          # Mock API services
│   │   ├── authService.js     # API xác thực (localStorage)
│   │   └── productService.js  # API sản phẩm
│   ├── App.jsx            # Router chính
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles (dark theme)
├── cypress/
│   ├── e2e/               # E2E test specs
│   │   ├── login.cy.js        # 8 test cases
│   │   ├── register.cy.js     # 7 test cases
│   │   ├── products.cy.js     # 6 test cases
│   │   ├── cart.cy.js         # 6 test cases
│   │   └── navigation.cy.js   # 5 test cases
│   ├── component/         # Component test specs
│   │   ├── LoginForm.cy.jsx       # 6 test cases
│   │   ├── RegisterForm.cy.jsx    # 5 test cases
│   │   ├── ProductCard.cy.jsx     # 5 test cases
│   │   ├── CartItem.cy.jsx        # 5 test cases
│   │   ├── Header.cy.jsx          # 4 test cases
│   │   └── Toast.cy.jsx           # 4 test cases
│   └── support/           # Cypress support files
│       ├── commands.js        # Shared custom commands
│       ├── e2e.js             # E2E setup + login/logout commands
│       ├── component.js       # Component test setup (mount)
│       └── component-index.html
├── cypress.config.js      # Cấu hình Cypress
├── vite.config.js         # Cấu hình Vite
└── package.json
```

## 🧪 Tổng hợp Test Cases (56 tests)

### E2E Testing (32 tests)

| Spec file | Chức năng | Số TC |
|---|---|:---:|
| `login.cy.js` | Đăng nhập, validation, toggle password, chuyển trang | 8 |
| `register.cy.js` | Đăng ký, mật khẩu không khớp, email trùng, validation | 7 |
| `products.cy.js` | Hiển thị sản phẩm, tìm kiếm, lọc danh mục | 6 |
| `cart.cy.js` | Giỏ hàng trống, thêm/sửa/xóa sản phẩm, đặt hàng | 6 |
| `navigation.cy.js` | Header links, logo, protected routes, trang 404 | 5 |

### Component Testing (29 tests)

| Spec file | Component | Số TC |
|---|---|:---:|
| `LoginForm.cy.jsx` | LoginPage | 6 |
| `RegisterForm.cy.jsx` | RegisterPage | 5 |
| `ProductCard.cy.jsx` | ProductCard | 5 |
| `CartItem.cy.jsx` | CartItem | 5 |
| `Header.cy.jsx` | Header | 4 |
| `Toast.cy.jsx` | Toast | 4 |

## 📋 Chức năng chính

- **Xác thực:** Đăng nhập / Đăng ký / Đăng xuất với mock API (localStorage)
- **Protected Routes:** Dashboard, Cart, Profile yêu cầu đăng nhập
- **Sản phẩm:** Duyệt, tìm kiếm theo tên, lọc theo danh mục
- **Giỏ hàng:** Thêm / xóa / cập nhật số lượng, tính tổng tiền, đặt hàng
- **Hồ sơ:** Xem và chỉnh sửa thông tin cá nhân
- **UI/UX:** Dark theme, glassmorphism, animation, responsive design
