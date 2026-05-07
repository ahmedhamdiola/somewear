import swaggerJsdoc from "swagger-jsdoc";

const options={

    definition:{
        openapi:"3.0.0",
        info:{
            title:"Somewear API",
            version:"1.0.0",
            description:"API documentation for Somewear e-commerce platform"
        },
        servers:[
            {
                url:"http://localhost:${process.env.port!}",
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"

                }
            }
        },  
        security:[
            {
                bearerAuth:[]
            }
        ]
    },
    apis:["./src/routes/*.ts"]



};
const swaggerSpec=swaggerJsdoc(options);

export default swaggerSpec;