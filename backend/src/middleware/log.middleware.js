import {logger} from "../lib/logger.js"

export const logMiddleware = (request, response, next) => {
    const start = Date.now()

    response.on("finish", () => {
        const duration = Date.now() - start

        logger.system(
            `[${request.method}] ${request.originalUrl} ${response.statusCode} ${duration}ms - IP: ${request.ip}`
        )
    })

    next()
}
