# API Routes Documentation

This repository contains an API with various routes for managing products, updates, and update points. The routes are implemented using an Express router.

## Getting Started

To run the API locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`

## Available Routes

### Products

#### GET /product

Retrieves a list of all products.

#### GET /product/:id

Retrieves details of a specific product identified by its ID.

#### PUT /product/:id

Updates a specific product identified by its ID.

**Request Body (JSON):**

- name (string, optional): The updated name of the product.

#### POST /product

Creates a new product.

**Request Body (JSON):**

- name (string): The name of the new product.

#### DELETE /product/:id

Deletes a specific product identified by its ID.

### Updates

#### GET /update

Retrieves a list of all updates.

#### GET /update/:id

Retrieves details of a specific update identified by its ID.

#### PUT /update/:id

Updates a specific update identified by its ID.

**Request Body (JSON):**

- title (string, optional): The updated title of the update.
- body (string, optional): The updated content/body of the update.
- version (string, optional): The updated version of the update.
- asset (string, optional): The updated URL of an associated asset.
- status (string, optional): The updated status of the update. Allowed values: "IN_PROGRESS", "SHIPPED", "DEPRECATED".

#### POST /update

Creates a new update.

**Request Body (JSON):**

- title (string): The title of the new update.
- body (string): The content/body of the new update.
- asset (string): The URL of an associated asset.
- productId (string): The ID of the product that the update belongs to.

#### DELETE /update/:id

Deletes a specific update identified by its ID.

### Update Points

#### GET /updatepoint

Retrieves a list of all update points.

#### GET /updatepoint/:id

Retrieves details of a specific update point identified by its ID.

#### PUT /updatepoint/:id

Updates a specific update point identified by its ID.

**Request Body (JSON):**

- name (string, optional): The updated name of the update point.
- description (string, optional): The updated description of the update point.

#### POST /updatepoint

Creates a new update point.

**Request Body (JSON):**

- name (string): The name of the new update point.
- description (string): The description of the new update point.
- updateId (string): The ID of the update that the update point belongs to.

#### DELETE /updatepoint/:id

Deletes a specific update point identified by its ID.

## Error Handling

- The API handles input validation errors and returns appropriate error responses.

## Dependencies

- express: Fast, unopinionated, minimalist web framework for Node.js.
- express-validator: Express middleware for input validation.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a new issue or submit a pull request.
