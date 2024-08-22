# internpulse-user-management-system
Task 2 in Interpulse, creating User Management System

## API Routes

The backend server provides the following API routes:

**POST /api/user/create**: Create new user.

    $ curl -X POST localhost:4000/api/user/create -H "Content-Type:application/json" -d "{"username": "testing"}"
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "testing",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:10.791Z"
    }
\

**GET /api/status**: Return the status of mongodb server.

    $ curl http://localhost:4000/api/status
    { "mongodb": true }
    $
\

**GET /api/user/:userId**: Retrieves user details by userId (could be user ID or username as query parameter).

    $ curl http://localhost:4000/api/user/5d1c7cad03a394508232451d
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "testing",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:10.792Z"
    }

    $ curl htp://loclahost:4000/api/user?username="testing"
    {
        "_id": "66c71eea82ce0424b84d1ab7",
        "username": "test",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:10.792Z"
    }
\


**PUT /api/user/update/:userId**: Updates user information based on userId (could be user ID or username as query parameter).

    $ curl -X PUT http://localhost:4000/api/user/update/5d1c7cad03a394508232451d -H "Content-Type:application/json" -d "{"username": "changed"}"
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "changed",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:20.791Z" // current date
    }

    $ curl -X PUT http://localhost:4000/api/user/update?username=testing -H "Content-Type:application/json" -d "{"username": "changed"}"
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "changed",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:20.791Z" // current date
    }
\

**DELETE /api/user/delete/:userId**: Deletes a user based on userId (could be user ID or username as query paraemter).

    $ curl -X DELETE http://localhost:4000/api/user/delete/5d1c7cad03a394508232451d
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "testing",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:20.791Z"
    }


    $ curl -X DELETE http://localhost:4000/api/user/delete?username=testing
    {
        "_id": "5d1c7cad03a394508232451d",
        "username": "testing",
        "createdAt": "2024-08-22T11:20:10.791Z",
        "updatedAt": "2024-08-22T11:20:20.791Z"
    }
