git checkout -b auth
git pull origin auth
npm install
docker-compose up -d dev-db
npx prisma migrate dev
