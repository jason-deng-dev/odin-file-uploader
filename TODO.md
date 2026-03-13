## For prisma/database setup
1. setup .env DATABASE_UR = "postgresql://username:password@localhost:5432/mydb?schema=public"
2. define model in prisma/schema.prisma
3. Create your first migration to set up the database tables:

```
// create the database tables based on your schema
npx prisma migrate dev --name init

// to generate the Prisma Client
npx prisma generate
```
4. to run script run
```
node script.js
```

5. to use Prisma studio
```
npx prisma studio --config ./prisma.config.js
```