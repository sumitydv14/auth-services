import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Auth Service API",
            version: "1.0.0",
            description: "Node.js + PostgreSQL Authentication API"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: [
        "./src/modules/**/*.ts",
    ],
};

export const swaggerSpec = swaggerJsdoc(options)