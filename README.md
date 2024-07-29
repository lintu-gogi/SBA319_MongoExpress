#Objectives
*Create a server application with Node, Express, and MongoDB.
*Create a CRUD API using Express and MongoDB.
*Create MongoDB indexes.
*Use MongoDB indexing to make efficient queries.
*Create MongoDB validation rules.
*Use MongoDB validation to ensure data consistency.
#Technologies Used
*Node .js
*Express
*Restful API
*Pug for Views
*Mongodb & Mongoose
#Project Description
    Created a To Do List for multiple users.
    ## Features
    *This application first display all the Users List and links.
        *Add a new User
        *Update Users
        *Add Todo and Comments to Users individually
    *Applicatins base URL:http://localhost:5051/base
    *New Users can be added to by clicking the link 'Add a new User'
    *Users can be updated by clicking the link 'Update Users'
    *New Todos and Comments can be added to each user by clicking the link 'Add Todos and Comments to Users'
    *If the User is already existing it cannot be added again.
    *Route for Adding new User: http://localhost:5051/submit
    *An empty User also cannot be added.
    * 3 Models are created
        *userslists
        *todolists
        *commentlist
    *Create index for name on userslist Model.
    *GET all the users is done by the route base URL: http://localhost:5051/base
    *Save a new User is done by the route : http://localhost:5051/submit
        *Duplicate users cannot be added. Handled by unique schema validation.
    *GET the user by name is done by http://localhost:5051/getUsers/:name
    *Save Todo List and Comments to a particular User is done by http://localhost:5051/todoItem/:id
    *DELETE the user by id can be done by http://localhost:5051/deleteItem/:id
        *Delete all the Comments and Todos of the user is handled by creating an id of User in todolists and commentlist collections.
    *UPDATE the user by id can be done by http://localhost:5051/updateItem/:id
    ##Technical Details
    *Used Express and Node .js to create REST API's.
    *Used the template engine Pug for view and client interaction.
    *Used MongoDB Database and Mongoose.
    
