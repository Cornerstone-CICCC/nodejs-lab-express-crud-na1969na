# NodeJS Lab Day 1 - Full Stack Express BREAD App

**Goal:** Create a full stack application using Node + Express with TypeScript on the backend.

## Instructions 📖

### Backend 🛠️

1. Set up the backend with all the necessary files and packages you will need inside the `backend/` directory:

    **Files/Directories**

    ```bash
    dist/
    src/
    .env
    .gitignore
    package.json
    tsconfig.json
    ```

    **Dev Packages (npm i -D ...)**

    ```bash
    @types/node
    @types/express
    nodemon
    typescript
    ```

    **Prod Packages (npm i ...)**

    ```bash
    concurrently
    express
    dotenv
    uuid
    cors
    ```

    After installing your packages, create the `dev` script inside your `package.json` for your concurrrently command. Also, finish up your `tsconfig` compiler options and add your desired port inside the `.env` file.

2. Create your server by creating a `server.ts` file inside your `backend/` directory. Using an in-memory database, set up your Express routes for the employees object as provided below:

    ```bash
    GET /employees      # Get employee list
    GET /employees/:id    # Get one employee by ID
    POST /employees     # Add employee
    PUT /employees/:id    # Update employee by ID
    DELETE /employees/:id   # Delete employee by ID
    GET /employees/search   # Search employees by firstname using query parameter (http://localhost:3500/employees/search?firstname=john)
    ```

    ```ts
    interface Employee {
      id: string;
      firstname: string;
      lastname: string;
      age: number;
      isMarried: boolean;
    }
    ```

3. Start your backend server once you have set up everything by running `npm run dev`. Do not forget to include the two middlewares below so that your server can accept JSON data and also allow the frontend to communicate.

    ```ts
    app.use(express.json()) // Allow JSON
    app.use(cors()) // Allow frontend to send requests
    ```

4. Test all your routes in Postman.

---

### Frontend 🖥️

For the frontend, create an `index.html` and `app.js` file inside your `frontend/` directory and run it with Live Server (Go Live). Recreate the design I provided, you can add CSS if you like.

Send fetch requests using `GET`, `POST`, `PUT`, `DELETE` methods to your backend.

- **List Employees** - List all employees
    - *View button* - Show employee info on the right section
    - *Edit button* - Fill the fields inside the **Edit Employee** form
    - *Delete button* - Delete employee
- **Search and View Employees button** - Show results on the **View Employee/s Info** section
- **Add Employee form** - Creates a new employee
- **Edit Employee form** - Edit employee info

Good luck! 🎉🎉🎉
