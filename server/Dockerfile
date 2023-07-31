FROM node:18-alpine
RUN adduser -D myuser
WORKDIR /app
USER root
COPY package*.json ./
RUN chown -R myuser:myuser /app
USER myuser
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 5000
