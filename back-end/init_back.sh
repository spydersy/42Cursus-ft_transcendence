npm install

npx prisma migrate dev

# NOTE:
#
# prisma studio is a simple tabular interface 
# you can use it to have a look at the data of our local database
# and check if the app is working correctly.
# 
# prisma studio service is exposed on port 5555
# and allow direct read/write operation to the database
# 
npx prisma studio &

npm run start