# HOTEL BOOKING WEBSITE

This project is a modern, responsive hotel booking platform where users can book hotels, manage reservations, and access an admin dashboard for operational tasks.

## Features
- User Authentication: Secure user registration and login.
- Hotel Search and Booking: Browse hotels, view details, and make reservations.
- Dynamic Pricing: Calculate the cost based on check-in/check-out dates and the number of guests.
- Stripe Payment Integration: Secure payment gateway for transactions.
- Admin Dashboard: Manage hotels, view reservations, and handle user feedback.
- Image Management: Cloudinary integration for storing and serving hotel images.
- Responsive UI: Fully optimized for desktop and mobile devices. 

## Tech Stack

### Frontend:
- React with TypeScript for a modular and type-safe architecture.
- React Query for efficient data fetching and caching.
- React Router for seamless navigation.
- Tailwind CSS for styling

### Backend:
- MongoDB for scalable database management.
- Express.js for routing and middleware.
- Stripe API for payment processing.
- Cloudinary for image uploading and management.

## Setup and Installation :-
  git clone [https://github.com/ABHILASHNAYAK20/app-booking.git] 

### Prerequisites :- 
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Stripe account and API keys
- Cloudinary account and API credentials

### Steps 
1. Navigate to the project directory - cd app-booking
2. Install dependencies - npm install
3. Start the frontend - cd frontend
4. Start the backend - cd backend
5. Set up environment variables for Cloudinary and Stripe. Create a .env file in the root directory and configure the following variables.
6. Set up MongoDb database url.

## Folder Structure 

### Backend File Structure

1. **src/** - Root directory containing all backend code.  
2. **src/middleware/auth.ts** - Authentication middleware.  
3. **src/models/hotel.ts** - MongoDB schema for hotel data.  
4. **src/models/user.ts** - MongoDB schema for user data.  
5. **src/routes/auth.ts** - Handles authentication (login, register, etc.).  
6. **src/routes/hotels.ts** - Handles routes for hotel data management.  
7. **src/routes/my-bookings.ts** - Handles routes for user bookings management.  
8. **src/routes/my-hotels.ts** - Handles admin-specific hotel management.  
9. **src/routes/users.ts** - Handles user profile and data routes.  
10. **src/shared/types.ts** - Defines shared TypeScript types for consistency.  
11. **src/index.ts** - Entry point of the backend server. Configures and starts the Express.js app.

 ### Frontend File Structure 

1. **src/assets/** - Contains static assets like images.  
2. **src/components/** - Includes reusable UI components (e.g., Header, Footer, SearchBar).  
3. **src/config/** - Configuration files (e.g., hotel options).  
4. **src/contexts/** - Context providers for global state management.  
5. **src/forms/** - Forms for user inputs (e.g., BookingForm, GuestInfoForm).  

## Screenshots :- 
![Screenshot (255)](https://github.com/user-attachments/assets/694b0010-a4df-418a-a143-aee17ad36dbd)

![Screenshot (249)](https://github.com/user-attachments/assets/b4a07492-9d6a-4cb3-9d25-14e904f2f1ae)
![Screenshot (250)](https://github.com/user-attachments/assets/0caf132a-fe0e-4008-9e68-00885908a4cb)
![Screenshot (251)](https://github.com/user-attachments/assets/f014a97f-f7f3-4f15-9858-468ea35309fd)
![Screenshot (252)](https://github.com/user-attachments/assets/d5b403dd-37dc-457e-84e8-ceff3f275938)
![Screenshot (253)](https://github.com/user-attachments/assets/b402c782-a47b-40a6-9ce4-75f8cbb9be8a)

-------------------------------------------------------------xx-----------------------------------------------------------------



 








































































































































































































































































































































































































































































