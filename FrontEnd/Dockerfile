FROM node:16

WORKDIR /app/

COPY package.json ./

COPY build /build 

RUN npm install -g serve@13.0.4


CMD ["npx", "serve", "-s", "build", "-p", "3000"]
