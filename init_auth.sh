git checkout -b auth
git pull origin auth
npm install
docker-compose up -d dev-db
npx prisma migrate dev --name "add UsualFullName to Users Table"
 
