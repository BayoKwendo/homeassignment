FROM node:22

# # Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# # We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

## exposed port
EXPOSE 4000 

## work directory
WORKDIR /app

## Add the wait script to the image ; will on await for mysql connect
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

COPY package*.json ./
RUN npm install

# RUN  npm install --legacy-peer-deps
CMD ["npm", "start"]
