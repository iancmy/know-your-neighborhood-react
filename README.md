# Know Your Neighborhood - Frontend

The web application for the "Know Your Neighborhood" platform. It provides an intuitive interface for residents to discover businesses and for owners to manage their stores.

## ✨ Features

* **Dynamic Directory:** Browse and search for local businesses with real-time feedback.
* **User Dashboard:** Dedicated account management page for users to update profiles and view their added stores.
* **Secure UI:** Conditional rendering of components based on authentication state (JWT).
* **Responsive Design:** Built with a mobile-first approach using Tailwind CSS.
* **Form Validation:** Real-time validation for registration, login, and store submission forms.

## 🛠️ Tech Stack

* **Library:** React 18 (Vite)
* **Styling:** Tailwind CSS
* **Navigation:** React Router DOM
* **HTTP Client:** Axios
* **Utilities:** Heroicons, React Toastify (for notifications)

## ⚙️ Setup & Installation

1. **Clone the repository:**
   `git clone <repo-url>`
2. **Install Dependencies:**
   * `npm install`
3. **Configuration:**
   * Ensure the Backend API is running. 
   * Update the `AUTH_URI`, `BASE_URI`, and `REDIRECT_URI` in `src/service/AuthService.js` if necessary.
4. **Start Development Server:**
   * `npm run dev`

## 📂 Project Structure

* `/src/pages`: Main view components (Home, Store, Account, etc.).
* `/src/components`: Reusable UI elements like Inputs, Spinners, and Toasts.
* `/src/service`: API communication logic using Axios.
* `/src/assets`: Static images and branding.
