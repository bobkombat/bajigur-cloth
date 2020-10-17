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
I started this project by deciding which database should I choose, it's between PostgreSQL or MongoDB and so I decided to pick PostgreSQL because there's not much going on with the data that need changes. After that, I need to decide how many features or tables and attributes in each table that I need create, it's one of the more demanding task to decide whether I need to add the attributes or not.

Now comes the part that I actually writing the code, it started as usual I setup the project, installing all the dependencies, building the project folder using MVC and stuff like that. The way that I thinking when I'm writing is I need to build a strong bare minimum that is fully working and it's outlining all the stuff that will be used later on and after I build it, I could build or make changes on top of that more easily without needing to change a lot of stuff without breaking so many things. This part is quite tricky to be honest, because I don't know if the framework of the project that's been working on is fully working or not, but eventually it's working properly and oh yeah I'm writing the main code while simultaneously building the test suites.

And here's the most stressful part while working on this project, and it's how I make the transaction relation. So there's two table of transaction in this project, one is the TransactionInvoice and it's have the 1:N relationship to the user where the user can have many Invoices, and the second one is the TransactionHistory and it's the conjuction table for the N:N of TransactionInvoice to Product tables, it's where I put all of the data transaction of each item that been checkout. The tricky thing is how I need to relate this two tables so that I can query the TransactionInvoice for each user and get all the data that's been checkout, but eventually the solution isn't very fancy, it's just some usual stuff that I do and I just need to tweak a little bit, so yeah. And the other thing that's been bugged out this project it's just some usual stuff like creating the wrong table, wrong relation or wrong queries, so I need to go back and forth fixing those kind of problems and I think that's it.
