FROM node:22

# Expose the port that your app will run on
EXPOSE 8000

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to utilize Docker's caching mechanism
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Optionally, add the wait script for MySQL (uncomment if needed)
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

# Make the wait script executable (if used)
# RUN chmod +x /wait

# CMD to start the application (adjust if you need the wait script first)
CMD ["npm", "start"]
