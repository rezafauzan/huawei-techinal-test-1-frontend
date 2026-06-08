import { Router } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Huawei Backend Technical Test',
            version: '1.0.0',
        },
    },
    apis: ['./src/main.js', './src/routes/*.router.js']
}

const docs = swaggerJSDoc(options)

const docsRouter = Router()

docsRouter.use("", swaggerUi.serve, swaggerUi.setup(docs))

export default docsRouter
