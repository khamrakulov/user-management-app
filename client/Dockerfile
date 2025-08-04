FROM node:22 AS build

WORKDIR /app
COPY . .

RUN npm i

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

