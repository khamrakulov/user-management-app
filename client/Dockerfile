FROM guergeiro/pnpm:22-10-alpine AS build

WORKDIR /app
COPY . .

RUN pnpm i

EXPOSE 5173

ENTRYPOINT ["pnpm", "run", "dev", "--host", "0.0.0.0"]

