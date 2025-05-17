# API Test Cases Detailed Report

---

## 1. Authentication API

| Test Case                              | Request Data / Description                                            | Expected Result                            |
|--------------------------------------|----------------------------------------------------------------------|-------------------------------------------|
| **User Login - valid**                | POST `/auth/login` Body: `{"username":"user1","password":"pass123"}`  | 200 OK + valid token                      |
| **User Login - wrong password**      | Body: `{"username":"user1","password":"wrong"}`                      | 401 Unauthorized                         |
| **User Login - empty username**      | Body: `{"username":"","password":"pass123"}`                         | 400 Bad Request + error message          |
| **User Login - empty password**      | Body: `{"username":"user1","password":""}`                           | 400 Bad Request + error message          |
| **User Login - invalid JSON**        | Malformed JSON body                                                  | 400 Bad Request + parse error             |
| **User Login - SQL Injection**       | Body: `{"username":"admin' OR '1'='1","password":"any"}`              | 401 Unauthorized or safe error            |

| **Register - valid**                  | POST `/auth/register` Body: valid user data                          | 201 Created + user info                   |
| **Register - username exists**       | Username already taken                                               | 409 Conflict                             |
| **Register - missing email**         | Body missing email                                                  | 400 Bad Request + error message          |
| **Register - invalid email**         | Email format invalid                                                | 400 Bad Request + error message          |
| **Register - username too long**     | Username length > 255                                               | 400 Bad Request + error message          |

| **Refresh Token - valid**             | POST `/auth/refresh?refreshToken=validtoken`                       | 200 OK + new access token                 |
| **Refresh Token - missing token**    | Query param missing                                                | 400 Bad Request + error message          |
| **Refresh Token - invalid token**    | Token expired or invalid                                           | 401 Unauthorized                         |

| **Forgot Password - valid**           | POST `/auth/forgot-password?email=user@example.com`                | 200 OK, reset mail sent                   |
| **Forgot Password - unknown email**  | Email not registered                                               | 404 Not Found or 200 OK with message      |

| **Reset Password - valid**            | POST `/auth/reset-password` Body: valid token & newPassword        | 200 OK, password changed                   |
| **Reset Password - expired token**   | Token expired                                                     | 401 Unauthorized                         |
| **Reset Password - missing fields**  | Missing token or newPassword                                      | 400 Bad Request                          |

| **Validate Token - valid**            | POST `/auth/validate-token?token=validtoken`                      | 200 OK, token valid                       |
| **Validate Token - invalid token**   | Invalid or malformed token                                        | 401 Unauthorized or 400 Bad Request     |

| **Security - missing Authorization** | Any protected API without token                                   | 401 Unauthorized                         |

---

## 2. User Management API

| Test Case                          | Request Data / Description                                        | Expected Result                          |
|-----------------------------------|------------------------------------------------------------------|-----------------------------------------|
| **Get All Users - valid**          | GET `/users` + valid token                                       | 200 OK + list of users                   |
| **Get User by ID - valid**         | GET `/users/123`                                                 | 200 OK + user data                       |
| **Get User by ID - not found**     | GET `/users/9999`                                                | 404 Not Found                          |
| **Get User by ID - invalid ID**    | GET `/users/abc`                                                 | 400 Bad Request + error message         |

| **Update User - valid**            | PUT `/users/123` Body: valid data                               | 200 OK + updated data                    |
| **Update User - empty email**      | Email field empty                                               | 400 Bad Request + error message         |
| **Update User - invalid email**    | Email format invalid                                            | 400 Bad Request + error message         |

| **Delete User - valid**            | DELETE `/users/123`                                             | 204 No Content                         |
| **Delete User - not found**        | DELETE `/users/9999`                                            | 404 Not Found                          |

| **Disable User - valid**           | PATCH `/users/123/disable`                                     | 200 OK                                |
| **Disable User - not found**       | PATCH `/users/9999/disable`                                    | 404 Not Found                          |
| **Enable User - valid**            | PATCH `/users/123/enable`                                      | 200 OK                                |
| **Enable User - not found**        | PATCH `/users/9999/enable`                                     | 404 Not Found                          |

| **Add Role to User - valid**       | PATCH `/users/123/roles/Admin`                                 | 200 OK                                |
| **Add Role to User - role not found** | Role "InvalidRole"                                          | 404 Not Found or 400 Bad Request       |
| **Remove Role from User - valid**  | DELETE `/users/123/roles/Admin`                                | 204 No Content                        |
| **Remove Role from User - role not found** | DELETE `/users/123/roles/InvalidRole`                     | 404 Not Found                        |

| **Security - missing token**       | Call API without Authorization header                         | 401 Unauthorized                      |

---

## 3. Listing API

| Test Case                         | Request Data / Description                                      | Expected Result                          |
|----------------------------------|----------------------------------------------------------------|-----------------------------------------|
| **Create Listing - valid**        | POST form-data with valid fields                              | 201 Created + listing data               |
| **Create Listing - missing name** | Omit `name`                                                  | 400 Bad Request + error message          |
| **Create Listing - negative price** | `price` = -1000                                            | 400 Bad Request + error message          |
| **Create Listing - long description** | Description length > 1000 chars                            | 400 Bad Request + error message          |

| **Get Listing by ID - valid**     | GET `/listings/123`                                          | 200 OK + listing data                    |
| **Get Listing by ID - invalid ID** | `/listings/abc`                                             | 400 Bad Request + error message          |
| **Get Listing by ID - not found** | `/listings/9999`                                            | 404 Not Found                          |

| **Update Listing - valid**        | PUT `/listings/123` JSON body with valid data               | 200 OK + updated listing data            |
| **Update Listing - invalid price** | `"price":"notanumber"`                                     | 400 Bad Request + error message          |

| **Delete Listing - valid**        | DELETE `/listings/123`                                      | 204 No Content                          |
| **Delete Listing - not found**    | DELETE `/listings/9999`                                     | 404 Not Found                          |

| **Search Listings - valid**       | GET `/listings/listings?page=0&size=10&listingType=FOR_SALE&minPrice=500000&maxPrice=2000000` | 200 OK + array of listings             |
| **Search Listings - minPrice > maxPrice** | `minPrice=2000000&maxPrice=500000`                       | 400 Bad Request + error message          |

| **Security - missing token**      | Call authenticated endpoint without token                   | 401 Unauthorized                        |

---

## 4. Sale Contract API

| Test Case                         | Request Data / Description                                    | Expected Result                          |
|----------------------------------|--------------------------------------------------------------|-----------------------------------------|
| **Create Sale Contract - valid** | form-data with required fields including PDF file           | 201 Created + contract data              |
| **Create Sale Contract - missing file** | Missing contract PDF file                                  | 400 Bad Request + error message          |
| **Create Sale Contract - negative totalAmount** | `totalAmount` = -1000                                      | 400 Bad Request + error message          |
| **Create Sale Contract - invalid date** | `contractDate` = "31-31-2025"                              | 400 Bad Request + error message          |

| **Get Sale Contract by ID - valid** | GET `/sales/contracts/abc123`                              | 200 OK + contract data                   |
| **Get Sale Contract by ID - not found** | GET `/sales/contracts/9999`                              | 404 Not Found                          |

| **Update Sale Contract - valid**   | PUT `/sales/contracts/abc123` with updated form-data      | 200 OK + updated contract data          |
| **Update Sale Contract - invalid file** | Upload non-PDF file                                       | 400 Bad Request + error message          |

| **Delete Sale Contract - valid**   | DELETE `/sales/contracts/abc123`                          | 204 No Content                         |

| **Security - invalid token**       | Missing or invalid token                                  | 401 Unauthorized                      |

---

## 5. Rental Transaction API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Rental Transaction - valid** | JSON with valid `listingId`, `tenantId`, `amount`, etc. | 201 Created + transaction data           |
| **Create Rental Transaction - missing amount** | Omit `amount`                                          | 400 Bad Request + error message          |
| **Create Rental Transaction - negative amount** | `amount` = -50000                                     | 400 Bad Request + error message          |
| **Create Rental Transaction - empty tenantId** | `tenantId` = ""                                       | 400 Bad Request + error message          |

| **Get Rental Transaction by ID - valid** | GET `/rentals/transactions/tx123`                      | 200 OK + transaction data                |
| **Get Rental Transaction by ID - not found** | GET `/rentals/transactions/9999`                      | 404 Not Found                          |

| **Update Rental Transaction - valid**    | PUT `/rentals/transactions/tx123` JSON update          | 200 OK + updated data                   |

| **Delete Rental Transaction - valid**    | DELETE `/rentals/transactions/tx123`                   | 204 No Content                         |

---

## 6. Sale Transaction API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Sale Transaction - valid** | JSON with `propertyId`, `amount`, `date`, `buyerId`     | 201 Created + transaction data           |
| **Create Sale Transaction - invalid date format** | `date` = "2023/31/12"                                   | 400 Bad Request + error message          |
| **Update Sale Transaction - negative amount** | `amount` = -100000                                     | 400 Bad Request + error message          |
| **Delete Sale Transaction - not found** | DELETE `/sales/transactions/9999`                       | 404 Not Found                          |

---

## 7. Payment Transaction API

| Test Case                          | Request Data / Description                                  | Expected Result                          |
|-----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Payment Transaction - valid** | JSON with `amount`, `currency`, `paymentMethod`, etc.  | 201 Created + payment data                |
| **Create Payment Transaction - missing amount** | Missing `amount`                                       | 400 Bad Request + error message          |
| **Create Payment Transaction - invalid currency** | `currency` = "XYZ"                                    | 400 Bad Request + error message          |
| **Create Payment Transaction - invalid paymentMethod** | `paymentMethod` = "CASH"                             | 400 Bad Request + error message          |
| **Update Payment Transaction - negative amount** | `amount` = -200000                                   | 400 Bad Request + error message          |
| **Delete Payment Transaction - not found** | DELETE `/payments/transactions/9999`                    | 404 Not Found                          |

---

## 8. Wallet API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Wallet - missing userId** | Missing `userId`                                         | 400 Bad Request + error message          |
| **Create Wallet - invalid currency** | `currency` = "ABC123"                                   | 400 Bad Request + error message          |
| **Update Wallet - negative balance** | `balance` = -100000                                     | 400 Bad Request + error message          |
| **Top Up Wallet - negative amount** | `amount` = -1000                                        | 400 Bad Request + error message          |
| **Payment from Wallet - insufficient funds** | `amount` > current balance                            | 400 Bad Request + insufficient funds error|
| **Get Wallet - not found**         | GET `/wallets/unknown`                                   | 404 Not Found                          |

---

## 9. Role Management API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Role - missing name**    | Body missing `name`                                       | 400 Bad Request + error message          |
| **Create Role - name too long**   | `name` > 100 characters                                  | 400 Bad Request + error message          |
| **Create Permission - missing name** | Missing `name`                                         | 400 Bad Request + error message          |
| **Add Permission to Role - invalid permission** | Permission does not exist                             | 404 Not Found or 400 Bad Request          |
| **Delete Role - not found**       | DELETE `/roles/9999`                                     | 404 Not Found                          |

---

## 10. Property API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Property - missing name** | Missing `name`                                           | 400 Bad Request + error message          |
| **Create Property - negative price** | `price` = -100000                                       | 400 Bad Request + error message          |
| **Update Property - negative area** | `area` = -50                                           | 400 Bad Request + error message          |
| **Delete Property - not found**   | DELETE `/properties/9999`                                | 404 Not Found                          |

---

## 11. Rental Contract API

| Test Case                         | Request Data / Description                                  | Expected Result                          |
|----------------------------------|------------------------------------------------------------|-----------------------------------------|
| **Create Rental Contract - missing file** | No contract PDF file uploaded                            | 400 Bad Request + error message          |
| **Create Rental Contract - endDate before startDate** | `startDate=2025-05-17`, `endDate=2024-05-17`           | 400 Bad Request + error message          |
| **Update Rental Contract - invalid date format** | `startDate` or `endDate` invalid                         | 400 Bad Request + error message          |
| **Delete Rental Contract - not found** | DELETE `/rentals/contracts/9999`                         | 404 Not Found                          |

---

**End of Detailed Test Case Report**
