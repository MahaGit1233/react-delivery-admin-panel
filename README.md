# Restaurant Delivery

Restaurant Delivery is a food ordering web application that allows users to browse menus, add items to cart, place cash-on-delivery orders, and track order statuses, along with separate admin and user roles. Admins can manage recipes and update customer order statuses through an integrated order management system. The frontend is built using **React**, **JavaScript**, **HTML**, and **CSS**, while **Firebase** is used for authentication, backend services, and database management.

## Features

- User authentication with email verification
- Password reset functionality
- Role-based access for Admin and User
- Browse restaurant menu without login
- Add food items to cart
- Cash on Delivery (COD) checkout option
- Order placement and tracking system
- Traffic signal style order status indicator
- Admin dashboard for recipe management
- Add, edit and delete recipes
- Order management system for admins
- Update customer order statuses
- Responsive and interactive UI using React

## Branches in Git

main: Full Restaurant Delivery Application (React frontend with Firebase authentication and database)

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML
- CSS

### Backend & Database

- Firebase Authentication
- Firebase Realtime Database / Firestore

## Project Structure

src/
├─ components/
│ ├─ adminpanel/ # pages related to admin activities
│ ├─ userinterface/ # pages related to user activities
│ ├─ common/ # pages related to both admins and users
│ ├─ store/ # pages for storing the values

## Installation & Setup

npm install
npm start

## Usage

- Browse the restaurant menu without logging in.
- Sign up and verify email to access user features.
- Log in securely using authenticated credentials.
- Add food items to the cart and place orders.
- Choose Cash on delivery during checkout.
- Track order status through the order tracking section.
- Admins can add, edit, and delete recipes.
- Admins can manage and update customer order statuses.
