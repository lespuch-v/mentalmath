# Mental Math Project

![image](https://github.com/user-attachments/assets/6b075a06-de30-4e56-b405-e917e6cbc5ca)

A web application designed to help users improve their mental math skills through interactive exercises and challenges.

## Features

- Variety of mental math exercises
- User progress tracking
- Difficulty levels to suit all skill levels
- Fully functional login and registration system
- Responsive design for seamless use on various devices

## Tech Stack

- Frontend: Angular
- Backend: ASP.NET Core
- Styling: Tailwind CSS with Daisy UI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mental-math-project.git
   ```

2. Navigate to the project directory:
   ```
   cd mental-math-project
   ```

3. Install frontend dependencies:
   ```
   cd ClientApp
   npm install
   ```

4. Install backend dependencies:
   ```
   cd ../
   dotnet restore
   ```

5. Set up your database connection string in `appsettings.json`

6. Run database migrations:
   ```
   dotnet ef database update
   ```

## Running the Application

1. Start the backend server:
   ```
   dotnet run
   ```

2. In a separate terminal, start the Angular development server:
   ```
   cd ClientApp
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`

## Screenshots

![image](https://github.com/user-attachments/assets/db2c7fe8-c227-4082-ac6a-d0de16d7da16)

![image](https://github.com/user-attachments/assets/0a6c5ce1-bc79-483b-a575-684cb40b7084)

![Exercise Interface](path/to/exercise-screenshot.png)
*Mental math exercise interface*
