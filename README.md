# **API Endpoints - Quick References**

- **All endpoints besides register/login require a token to access API**

Projects
- **[GET] /api/projects** - Get all projects
- **[GET] /api/projects/:id** - Get specific project by id
- **[GET] /api/projects/user/:id** - Get all user's projects by user's ID
- **[POST] /api/projects** - Creates new project using title(string), host(int), description(string), and returns project
- **[PUT] /api/projects/:id** - Updates project using title(string), description(string), and returns project
- **[DELETE] /api/projects/:id** - Deletes project, returns nothing

Funders
- **[POST] /api/projects/:id/fund/:userid** - Funds project using id of project and userid through path params
- **[DELETE] /api/projects/:id/fund/:userid** - De-fund project using id of project and userid through path params

Users
- **[POST] /api/users/register** - Registers a new user using username, password, firstname, lastname, and returns user info
- **[POST] /api/users/login** - Logs-in using username, password, and returns message and token
- **[GET] /api/users/:username** - Returns user info using registered username

# **How the data should look**

## **Projects Endpoints**

- **[GET] /api/projects**
    - **returns** Array of Objects  with Shape:    [{**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }]

        ```jsx
        [
            {
                "id": 1,
                "title": "AAA",
                "host": {
                    "id": 1,
                    "username": "Jxiong",
                    "firstname": "Johnny",
                    "lastname": "Xiong"
                },
                "description": "ah1",
                "funders": [
                    {
                        "id": 2,
                        "username": "Koko",
                        "firstname": "Coco",
                        "lastname": "Kir"
                    },
                    {
                        "id": 3,
                        "username": "Aki",
                        "firstname": "Aki",
                        "lastname": "Rose"
                    },
                    {
                        "id": 4,
                        "username": "ZeeroDegree",
                        "firstname": "Peng",
                        "lastname": "Chang"
                    }
                ]
            },
            {
                "id": 9,
                "title": "AAA",
                "host": {
                    "id": 3,
                    "username": "Aki",
                    "firstname": "Aki",
                    "lastname": "Rose"
                },
                "description": "ah9",
                "funders": []
            },
        ]
        ```

- **[GET] /api/projects/:id**
    - **returns** 1 Object with Shape: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

        ```jsx
        	{
            "id": 3,
            "title": "AAA",
            "host": {
                "id": 2,
                "username": "Koko",
                "firstname": "Coco",
                "lastname": "Kir"
            },
            "description": "ah3",
            "funders": [
                {
                    "id": 1,
                    "username": "Jxiong",
                    "firstname": "Johnny",
                    "lastname": "Xiong"
                },
                {
                    "id": 4,
                    "username": "ZeeroDegree",
                    "firstname": "Peng",
                    "lastname": "Chang"
                },
                {
                    "id": 5,
                    "username": "Doro",
                    "firstname": "Donny",
                    "lastname": "Don"
                }
            ]
        }
        ```

- **[GET] /api/projects/user/:id**
    - **returns** Array of Objects for specific userId: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

        ```jsx
        [
            {
                "id": 1,
                "title": "AAA",
                "host": {
                    "id": 1,
                    "username": "Jxiong",
                    "firstname": "Johnny",
                    "lastname": "Xiong"
                },
                "description": "ah1",
                "funders": [
                    {
                        "id": 2,
                        "username": "Koko",
                        "firstname": "Coco",
                        "lastname": "Kir"
                    },
                    {
                        "id": 3,
                        "username": "Aki",
                        "firstname": "Aki",
                        "lastname": "Rose"
                    },
                    {
                        "id": 4,
                        "username": "ZeeroDegree",
                        "firstname": "Peng",
                        "lastname": "Chang"
                    }
                ]
            },
            {
                "id": 2,
                "title": "AAA",
                "host": {
                    "id": 1,
                    "username": "Jxiong",
                    "firstname": "Johnny",
                    "lastname": "Xiong"
                },
                "description": "ah2",
                "funders": []
            },
            
        ]
        ```

- **[POST] /api/projects**
    - **requires** Object with Shape: {**title**:'string', **host**:userId int, **description**:'string'}

        ```jsx
        {
            "title":"My Project",
            "host":1,
            "description":"My Project description"
        }
        ```

    - **returns** Object {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

        ```jsx
        {
            "id": 31,
            "title": "My Project",
            "host": {
                "id": 1,
                "username": "Jxiong",
                "firstname": "Johnny",
                "lastname": "Xiong"
            },
            "description": "My Project description",
            "funders": []
        }
        ```

- **[PUT] /api/projects/:id**
    - **requires** Object with Shape: {**title**: 'string', **description**: 'string'}

        ```jsx
        {
            "title":"My Project EDITED",
            "description":"My Project description PLUS EDIT"
        }
        ```

    - **returns** updated Object {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

        ```jsx
        {
            "id": 31,
            "title": "My Project EDITED",
            "host": {
                "id": 1,
                "username": "Jxiong",
                "firstname": "Johnny",
                "lastname": "Xiong"
            },
            "description": "My Project description PLUS EDIT",
            "funders": []
        }
        ```

- **[DELETE] /api/projects/:id**
    - does not return anything

## **Funder Endpoints**

- **[POST] /api/projects/:id/fund/:userid**
    - **(optional)** object {**username**: 'string'}
    - **returns** example: /api/projects/31/fund/4

    ```jsx
    {
        "id": 31,
        "title": "My Project EDITED",
        "host": {
            "id": 1,
            "username": "Jxiong",
            "firstname": "Johnny",
            "lastname": "Xiong"
        },
        "description": "My Project description PLUS EDIT",
        "funders": [
            {
                "id": 4,
                "username": "ZeeroDegree",
                "firstname": "Peng",
                "lastname": "Chang"
            }
        ]
    }
    ```

    - or :

```jsx
"message": "user is already funding current project"
```

- **[DELETE] /api/projects/:id/fund/:userid**
    - **returns** an updated array of users {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

    ```jsx
    {
        "id": 31,
        "title": "My Project EDITED",
        "host": {
            "id": 1,
            "username": "Jxiong",
            "firstname": "Johnny",
            "lastname": "Xiong"
        },
        "description": "My Project description PLUS EDIT",
        "funders": []
    }
    ```

## **Users Endpoints**

- **[POST] /api/users/register**
    - Object Shape: { username: "string", password: "string", firstname:"string", lastname:"string" }

        ```jsx
        {
            "username":"myAccount",
            "password":"foobar",
            "firstname":"John",
            "lastname":"Xiong"
        }
        ```

    - Returns Object: { id: integer, username, password: "hashed string", firstname: "string", lastname: "string"}

        ```jsx
        {
            "id": 10,
            "username": "myAccount",
            "password": "$2a$10$DU4Spk720O4uGwLF3bJNQevm2yPYjoJXPQgrf/0ZmqqOWSo2vwWD6",
            "firstname": "John",
            "lastname": "Xiong"
        }
        ```

- **[POST] /api/users/login**
    - requires Object Shape: { username: "string", password: "string" }

        ```jsx
        {
            "username":"myAccount",
            "password":"foobar"
        }
        ```

    - returns Object Shape: { message: "string", token: "string" }

        ```jsx
        {
            "message": "Welcome myAccount",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJteUFjY291bnQiLCJpYXQiOjE2MDkyMjMwODAsImV4cCI6MTYwOTMwOTQ4MH0.CeiB30U2ATE9MK1yycwxiuQaFOLEd5M-pGbF4wr9eaw"
        }
        ```

- **[GET] /api/users/:username**
    - returns Object Shape: { id:int, username: 'string', firstname:'string', lastname:'string'}

        ```jsx
        {
            "id": 10,
            "username": "myAccount",
            "firstname": "John",
            "lastname": "Xiong"
        }
        ```
