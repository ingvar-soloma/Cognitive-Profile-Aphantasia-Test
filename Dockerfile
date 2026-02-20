FROM node:22-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --include=optional
COPY . .

FROM base AS build
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
