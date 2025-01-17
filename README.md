
# ProjectManagementApp

A simple task management and collaboration tool built with the T3 stack, featuring task creation, assignment, tracking, user profiles, project settings, and integration with Supabase for database management. This app is deployed serverless on AWS using SST (Serverless Stack) to handle backend operations.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Serverless AWS using SST
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **API**: tRPC
- **ORM**: Prisma


## Setup Instructions


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HarshBytesCode/ProjectManagementApp.git
   cd ProjectManagementApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=your-database-connection-string
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up **Supabase**:
   - Create a project on [Supabase](https://supabase.com/).
   - Generate the `SUPABASE_URL` from your Supabase dashboard.
   - Design the schema for tasks, projects, and users in Supabase.

5. Set up **AWS** for deployment:
   - Install the **AWS CLI** and configure your credentials (`aws configure`).
   - Install **SST** (Serverless Stack) if you haven't already:

     ```bash
     npm install -g sst
     ```

### Running the Application Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open the application in your browser:

   ```bash
   http://localhost:3000
   ```

### Deploying the Application

1. Deploy the serverless backend with **SST**:

   Run the following command to deploy your SST application:

   ```bash
   sst deploy
   ```

   SST will provision the necessary AWS resources, including Lambda functions, API Gateway, and other infrastructure.

2. After deployment, you can visit the provided AWS endpoint to interact with the app in a production environment.

### Unit Tests


```bash
npm test
```

## Deployment

Once you’ve configured and tested the application locally, deploy it using **SST** to the AWS serverless environment. The backend is configured to handle all API requests and data management through AWS Lambda functions and Supabase as the database.

## Architecture

1. **Frontend**: The Next.js application handles the task management UI, user profile, and project settings. It communicates with the backend via tRPC.
2. **Backend**: The serverless AWS functions are deployed using SST and AWS Lambda. API requests (task and project operations) are handled here.
3. **Database**: Supabase manages the data layer, storing user and task information, and integrating seamlessly with Prisma for ORM operations.
