## Project Setup and Installation

This project is composed of three main components:

- **BackEnd**: Handles the server-side logic and API endpoints.
- **CronJob**: Contains cron jobs.
- **FrontEnd**: Provides the user interface for the application.

Below are the instructions to get the project up and running.

---

## Prerequisites

Make sure you have the following tools installed on your machine:

- **Docker** and **Docker Compose**.
- **Node.js** and **npm** (for individual component setup).

---

## API Doc
**Postman collection:**
 Accessible at  https://documenter.getpostman.com/view/42741674/2sAYdoFnTm


This will build the Docker images and start all containers in detached mode.

## Running the Project with Docker Compose

The project is set up with Docker Compose, so you can easily start all services (BackEnd, CronJob, and FrontEnd) with one command.

### Steps to start the project:

1. **Navigate to the project root folder:**

   ```bash
   cd /assignment

2. Run the following command to build and start all services:
   ```bash
   docker-compose up --build -d

This will build the Docker images and start all containers in detached mode.


## Running Each Project Component Individually

If you'd prefer to run each part of the project separately, you can do so by following these instructions.

**BackEnd** Setup

1. Navigate to the BackEnd folder:
 
    ```bash
   a. cd /BackEnd
   b. npm install
   c. npm start

The backend server will be running at http://localhost:8000.


**CronJob** Setup

1. Navigate to the CronJob folder:
 
    ```bash
   a. cd /CronJob
   b. npm install
   c. npm start

The cron job will now run on the defined schedule and perform its tasks. port 4000

**FrontEnd** Setup

1. Navigate to the FrontEnd folder:
 
    ```bash
   a. cd /FrontEnd
   b. npm install
   c. npm start

The frontend application will be accessible at http://localhost:3000.


