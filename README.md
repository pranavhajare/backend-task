# Bidding Platform Backend Task

## API Endpoints

### User Management

- **Register a New User**
  - `POST /users/register`
- **User Login**
  - `POST /users/login`
- **Get User Profile**
  - `GET /users/profile`

### Auction Items

- **List All Items** with optional search, filtering, and pagination
  - `GET /items`
- **Retrieve a Specific Item by ID**
  - `GET /items/:id`
- **Create a New Item** (requires authentication)
  - `POST /items`
- **Update an Item by ID** (requires authentication)
  - `PUT /items/:id`
- **Delete an Item by ID** (requires authentication)
  - `DELETE /items/:id`

### Bidding

- **Get All Bids for a Specific Item**
  - `GET /items/:itemId/bids`
- **Place a Bid on an Item** (requires authentication)
  - `POST /items/:itemId/bids`

### Notifications

- **Get All Notifications for the Authenticated User**
  - `GET /notifications`
- **Mark All Notifications as Read** (requires authentication)
  - `POST /notifications/mark-read`
