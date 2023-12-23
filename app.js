const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/taskRoutes')

const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express()
const port = 3000
const db_connection = 'mongodb://0.0.0.0:27017/'

// Middleware
app.use(express.json())

app.use(cors());


// Swagger setup
const swaggerDefinition = {
    info: {
        title: 'Todo API',
        version: '1.0.0',
        description: 'API documentation for your Todo app',
    },
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



mongoose.connect(db_connection)

const db = mongoose.connection;

db.on('error', () => {
    console.log("Connection Error!")
})

db.once('open', () => {
    console.log('Connected to DB!')
})

app.use(tasksRoutes)




app.listen(port, () => {
    console.log("Server started on port 3000")
})