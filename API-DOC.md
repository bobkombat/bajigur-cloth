## RESTful endpoints
List of available endpoint:

  - `POST /admin/login`
  - `GET /admin/users (headers access_token ADMIN ROLE ONLY)`
  - `GET /admin/users/:id (headers access_token ADMIN ROLE ONLY)`
  - `GET /admin/users/:id/wishlist (headers access_token ADMIN ROLE ONLY)`
  - `GET /admin/users/:id/cart (headers access_token ADMIN ROLE ONLY)`
  - `GET /admin/users/:id/transaction (headers access_token ADMIN ROLE ONLY)`
  
  
  
  - `POST /product (headers access_token ADMIN ROLE ONLY)`
  - `GET /product`
  - `PUT /product/:id (headers access_token ADMIN ROLE ONLY)`
  - `DELETE /product/:id (headers access_token ADMIN ROLE ONLY)`
  
  
  
  - `POST /banner (headers access_token ADMIN ROLE ONLY)`
  - `GET /banner`
  - `PUT /banner/:id (headers access_token ADMIN ROLE ONLY)`
  - `DELETE /banner/:id (headers access_token ADMIN ROLE ONLY)`
  
  
  
  - `POST /user/login`
  - `POST /user/register`
  - `POST /user/cart/:product_id (headers access_token USER)`
  - `GET /user/cart (headers access_token USER)`
  - `PUT /user/cart/:product_id (headers access_token USER)`
  - `DELETE /user/cart/:cart_id (headers access_token USER)`
  - `POST /user/wishlist/:product_id (headers access_token USER)`
  - `GET /user/wishlist (headers access_token USER)
  - `DELETE /user/wishlist/:product_id (headers access_token USER)`
  - `GET /user/transaction/history (headers access_token USER)`
  - `POST /user/transaction/checkout (headers access_token USER)`
