
# CodeDrop

CodeDrop is a full-stack web application that allows users to create, share, and discover code snippets.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **JSON Web Tokens (JWT)**: For user authentication
- **Nodemailer**: To send emails
- **Bcrypt**: For password hashing

### Frontend

- **Next.js**: React framework for server-side rendering
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Superset of JavaScript that adds static typing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **Moment.js**: For date and time formatting
- **React Syntax Highlighter**: For code block syntax highlighting

## Backend Routes

### User Routes (`/api/users`)

- `POST /register`: Register a new user.
- `POST /login`: Login a user.
- `GET /logout`: Logout a user.
- `GET /user`: Get the currently logged-in user's information.
- `PATCH /user`: Update the currently logged-in user's information.
- `GET /user/:id`: Get a user by their ID.
- `DELETE /admin/users/:id`: (Admin) Delete a user.
- `GET /admin/users`: (Admin/Creator) Get all users.
- `GET /login-status`: Check the user's login status.
- `POST /verify-email`: Send an email verification link.
- `POST /verify-user/:verificationToken`: Verify a user's email.
- `POST /forgot-password`: Send a password reset link.
- `POST /reset-password/:resetPasswordToken`: Reset a user's password.
- `PATCH /change-password`: Change the logged-in user's password.

### Snippet Routes (`/api/snippets`)

- `POST /create-snippet`: Create a new code snippet.
- `GET /snippets/public`: Get all public code snippets.
- `GET /snippets`: Get the logged-in user's code snippets.
- `GET /snippet/:id`: Get a specific code snippet by its ID.
- `GET /snippet/public/:id`: Get a specific public code snippet by its ID.
- `PATCH /snippet/:id`: Update a code snippet.
- `DELETE /snippet/:id`: Delete a code snippet.
- `PATCH /snippet/like/:id`: Like a code snippet.
- `GET /snippets/liked`: Get the logged-in user's liked code snippets.
- `GET /leaderboard`: Get the snippet leaderboard.
- `GET /snippets/popular`: Get popular code snippets.

### Tag Routes (`/api/tags`)

- `POST /create-tag`: Create a new tag.
- `POST /bulk-tags`: (Admin) Create multiple tags at once.
- `GET /tags`: Get all tags.
- `GET /tag/:id`: Get a specific tag by its ID.
- `DELETE /tag/:id`: Delete a tag.

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
