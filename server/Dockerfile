FROM node:18-alpine
RUN adduser -D myuser
USER myuser
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 5000
