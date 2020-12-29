
## API Endpoints - References

### Projects Endpoints

- **[GET] /api/projects**
    - **returns** Array of Objects  with Shape:    [{**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }]
- **[GET] /api/projects/:id**
    - **returns** 1 Object with Shape: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }
- **[GET] /api/projects/user/:id**
    - **returns** Array of Objects for specific userId: {**id**:int,  **title**: 'string', **host**: {object of a user w/id,username, firstname, lastname}, **description**: 'string', **funders:** ArrayofUserObjects[] }
- **[POST] /api/projects**
    - **requires** Object with Shape: {**title**:'string', **host**:userId int, **description**:'string'}
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
    	```{
		username: 'string',
		password: 'string',
		firstname: 'string',
		lastname: 'string',
	}```
- **[POST] /api/users/login**
    - **requires** Object Shape: { username: "string", password: "string" }
    - **returns** Object Shape: { message: "string", token: "string" }
- **[GET] /api/users/:username**
    - **returns** Object Shape: { id:int, username: 'string', firstname:'string', lastname:'string'}
