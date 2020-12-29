
## API Endpoints - References

### Projects Endpoints

- **[GET] /api/projects**
    - **returns** Array of Objects  with Shape:    [{**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }]
    ``` 
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
- **[GET] /api/projects/:id**
    - **returns** 1 Object with Shape: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }
    ``` 
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
- **[GET] /api/projects/user/:id**
    - **returns** Array of Objects for specific userId: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }
    ```
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
- **[POST] /api/projects**
    - **requires** Object with Shape: {**title**:'string', **host**:userId int, **description**:'string'}
    ```jsx
{
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
}
    - **returns** Object {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

- **[PUT] /api/projects/:id**
    - **requires** Object with Shape: {**title**: 'string', **description**: 'string'}
    - **returns** updated Object {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }
- **[DELETE] /api/projects/:id**
    - does not return anything

### Funder Endpoints

- **[POST] /api/projects/:id/fund/:userid**
    - **optional for now (info comes from the parameters :id and :userid)** object {**username**: 'string'}
- **[DELETE] /api/projects/:id/fund/:userid**
    - **returns** with updated array of users {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }

### Users Endpoints

- **[POST] /api/users/register**
    - **requires** Object Shape: { username: "string", password: "string", firstname:"string", lastname:"string" }
    - **Returns** Object: { id: integer, username, password: "hashed string"}
- **[POST] /api/users/login**
    - **requires** Object Shape: { username: "string", password: "string" }
    - **returns** Object Shape: { message: "string", token: "string" }
- **[GET] /api/users/:username**
    - **returns** Object Shape: { id:int, username: 'string', firstname:'string', lastname:'string'}
