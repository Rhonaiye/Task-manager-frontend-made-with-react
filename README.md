
# Task Manager Frontend built with react

This repository contains the **React.js** frontend for the Task Manager application. The frontend communicates with a FastAPI backend to allow users to create, manage, and track tasks.

## Features

- **Task Management**: Create, update, delete, and view tasks.
- **Task Completion**: Mark tasks as completed or incomplete.
- **Task Filters**: View all, completed, or incomplete tasks.
- **User Authentication**: Login and authenticate users.
- **Responsive Design**: Works on both mobile and desktop devices.

## Technologies Used

- **React.js**: Frontend framework for building UI.
- **Vite**: For development server and build tools.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For routing and navigation between views.

## Getting Started

### Prerequisites

- Node.js >= v14
- npm or yarn package manager

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Rhonaiye/Task-manager-frontend-made-with-react.git
    cd task-manager-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file:

    ```bash
    VITE_API_URL=http://localhost:4000/api
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the app in the browser at [http://localhost:5173](http://localhost:5173).

## Project Structure

```bash
src/
├── components/        # Reusable components
├── pages/             # Main views for different routes
├── services/          # API service files
├── context/           # React Context for global state
├── App.jsx            # Main application component
└── index.jsx          # Entry point of the app
```

## API Integration

The app integrates with a FastAPI backend, and the API URL is set via environment variables (`VITE_API_URL`). The backend should be running for the frontend to function correctly.

## Running the Project

To run the project locally:

```bash
npm run dev
```

To build the project for production:

```bash
npm run build
```

## Usage

- **Create a Task**: Fill out the form and submit to add a new task.
- **Mark as Complete**: Check the task to mark it as complete.
- **Edit a Task**: Click the edit button to modify a task.
- **Delete a Task**: Click the delete button to remove a task.
- **Filter Tasks**: Use the filter to view completed or incomplete tasks.

## Contributing

Feel free to submit pull requests or open issues if you find bugs or have suggestions for improvements!

## License

This project is licensed under the MIT License.
