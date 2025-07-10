# CodeDrop - Client

This is the frontend for CodeDrop, a full-stack web application that allows users to create, share, and discover code snippets.

## Technologies Used

- **Next.js**: React framework for server-side rendering
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Superset of JavaScript that adds static typing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Moment.js**: For date and time formatting
- **React Syntax Highlighter**: For code block syntax highlighting

## Frontend Routes

- `/`: Home page, displaying public code snippets.
- `/login`: User login page.
- `/register`: User registration page.
- `/forgot-password`: Forgot password page.
- `/reset-password/:resetToken`: Reset password page.
- `/verify-email/:verificationToken`: Email verification page.
- `/snippets`: Page displaying the logged-in user's code snippets.
- `/snippet/:id`: Page displaying a specific code snippet.
- `/user/:id`: Page displaying a user's profile and their public snippets.