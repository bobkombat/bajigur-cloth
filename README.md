# bajigur-cloth

### Built using: PostgreSQL, Express.js, Node.js
  ## Feature added:
  #### Feature for User:
    - Login/Register for User
    - Read all product data
    - Read all banners data
    - CUD Wishlist for each User
    - CUD for Cart for each User
    - CUD Transaction for each User to checkout their cart or see their transaction history
 
 #### Feature for Admin (only authorize admin will have the access):
    - Login for Admin
    - CRUD for all product data
    - Read for all User data including their wishlist, cart, and transactions
    - CRUD for all banners data to be used for banner promo
    
    
## How to start the project:
#### Must to do:
```
$ cd server
$ npm i
$ touch .env && echo "JWT_SECRET={INPUT_YOUR_CUSTOM_KEY_HERE}" >> .env
```

#### Run the test:
```
$ sequelize db:create --env test
$ sequelize db:migrate --env test
$ sequelize db:seed:all --env test
$ npm run test
```

#### Start the project:
```
$ sequelize db:create
$ sequelize db:migrate
$ sequelize db:seed:all
$ npm run start
```

## How I work on this project

