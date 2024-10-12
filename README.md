# 📚 API Documentation Generator

This Docker image allows you to easily generate a beautiful and interactive API documentation page using your Swagger/OpenAPI specification, a custom menu file, and your logo.

## 🚀 Prerequisites

- 🐳 Docker installed on your machine
- 📄 A valid Swagger/OpenAPI specification file (YAML format)
- 📋 A menu file (YAML format) that matches your API structure
- 🖼️ Your company logo (SVG format recommended)

## 📦 Photos

![Screenshot 1](/screenshots/photo1.png)

## 💻 Code sample photos

- It comes with a code sample selection which users can just copy and paste into their project.
![Screenshot 3](/screenshots/photo3.png)

## Swagger UI
- It also has a swagger ui view which is great for testing the API.
![Screenshot 4](/screenshots/photo4.png)

## 🛠️ Usage

1. Create a Dockerfile in your project directory with the following content:


```dockerfile
FROM europe-west4-docker.pkg.dev/ssx-cloud-network-gke/ssx-image-repository/api-doc-gen:latest

WORKDIR /app
COPY swagger.yaml swagger.yaml
COPY menu.yaml menu.yaml
COPY logo.svg web/assets/logo.svg

EXPOSE 3000

CMD ["npm", "start"]
```

2. Build the Docker image:

```bash
docker build -t api-doc-gen .
```

3. Run the Docker container:

```bash
docker run -p 3000:3000 api-doc-gen
```


4. Access the generated API documentation at `http://<host>:3000`.

## 📝 Notes

- The Dockerfile assumes that the Swagger/OpenAPI specification file is named `swagger.yaml` and the menu file is named `menu.yaml`.
- The logo file should be named `logo.svg` and placed in the `assets` directory.
- The container listens on port 3000.

### 📋 Menu File

The menu file should be a YAML file that matches your API structure.

<details>
<summary>Example menu file (click to expand)</summary>

```yaml
version: 1.0.0
title: Sample API Documentation
Summary:
  - name: Sample Introduction
    content: |
      Welcome to the Sample API documentation. This API demonstrates basic CRUD operations for a user management system.

  - name: Authentication
    content: |
      Most endpoints require authentication. To authenticate, obtain a JWT token by logging in via the /api/v1/auth/login endpoint. Include this token in the Authorization header of your requests:
      
      Authorization: Bearer <your_token_here>

  - name: Common Use Cases
    content: |
      1. User Management:
         - Register a new user: POST /api/v1/users
         - Get all users: GET /api/v1/users
         - Get a specific user: GET /api/v1/users/{id}
         - Update a user: PUT /api/v1/users/{id}
         - Delete a user: DELETE /api/v1/users/{id}

  - name: Rate Limiting
    content: |
      Our API implements rate limiting to ensure fair usage. You are limited to 100 requests per minute. If you exceed this limit, you'll receive a 429 Too Many Requests response.

  - name: Errors
    content: |
      The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:
      - 2xx range indicate success
      - 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, etc.)
      - 5xx range indicate an error with our servers

  - name: Support
    content: |
      If you have any questions or need assistance, please contact our support team at api-support@example.com.

Users:
  - name: Create User
    path: /api/v1/users
    description: Create a new user
  - name: Get All Users
    path: /api/v1/users
    description: Retrieve a list of all users
  - name: Get User
    path: /api/v1/users/{id}
    description: Retrieve details of a specific user
  - name: Update User
    path: /api/v1/users/{id}
    description: Update details of a specific user
  - name: Delete User
    path: /api/v1/users/{id}
    description: Delete a specific user
```
</details>

### 📄 Swagger/OpenAPI Specification

Your swagger.yaml file should be a valid Swagger/OpenAPI specification file.

<details>
<summary>Example swagger.yaml file (click to expand)</summary>

```yaml
openapi: 3.0.0
info:
  title: Sample User Management API
  version: 1.0.0
  description: A sample API for basic user management operations

tags:
  - name: Users
    description: User management operations

paths:
  /api/v1/users:
    post:
      summary: Create a new user
      tags:
        - Users
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
    get:
      summary: Get all users
      tags:
        - Users
      parameters:
        - in: query
          name: page
          schema:
            type: integer
        - in: query
          name: limit
          schema:
            type: integer
      responses:
        '200':
          description: Successfully retrieved users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'

  /api/v1/users/{id}:
    get:
      summary: Get a specific user
      tags:
        - Users
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successfully retrieved user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '404':
          $ref: '#/components/responses/NotFoundError'
    put:
      summary: Update a user
      tags:
        - Users
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserRequest'
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/BadRequestError'
        '404':
          $ref: '#/components/responses/NotFoundError'
    delete:
      summary: Delete a user
      tags:
        - Users
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '204':
          description: User deleted successfully
        '404':
          $ref: '#/components/responses/NotFoundError'

components:
  schemas:
    CreateUserRequest:
      type: object
      required:
        - name
        - email
        - password
      properties:
        name:
          type: string
        email:
          type: string
        password:
          type: string

    UpdateUserRequest:
      type: object
      properties:
        name:
          type: string
        email:
          type: string

    UserResponse:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time

  responses:
    BadRequestError:
      description: Bad request
      content:
        application/json:
          schema:
            type: object
            properties:
              message:
                type: string

    UnauthorizedError:
      description: Unauthorized
      content:
        application/json:
          schema:
            type: object
            properties:
              message:
                type: string

    NotFoundError:
      description: Not found
      content:
        application/json:
          schema:
            type: object
            properties:
              message:
                type: string
```
</details>

### 🔗 Important Notes

- The paths in the menu file should match the paths in the swagger.yaml file.
- The names will be used as the headings in the documentation and for navigation.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
