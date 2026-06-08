import express from "express"
import { constants } from "node:http2"
import { corsMiddleware } from "./middleware/cors.middleware.js"
import { logMiddleware } from "./middleware/log.middleware.js"
import { logger } from "./lib/logger.js"
import { httpResponse } from "./lib/http_handlers.js"
import userRouter from "./routes/users.router.js"
import docsRouter from "./routes/docs.router.js"

const app = express()
app.use(corsMiddleware)
const port = process.env.PORT || 8888

app.use(express.json())
/**
 * @openapi
 * /:
 *  get:
 *      tags: ['Health Check']
 *      description: Health Check
 *      responses:
 *          200:
 *              description: Returning JSON with success and message
 */
app.get("/", logMiddleware, function (request, response) {
    httpResponse.ok(response, "Backend is running well", [])
})

app.use("/users", userRouter)

app.use("/docs", docsRouter)

app.listen(port, function () {
    logger.system(`Server started on port ${port}`)
})
