export const corsMiddleware = (request, response, next) => {
    let allowedOrigins
    
    if (process.env.APP_ENV == 'development') {
        allowedOrigins = '*'
    } else {
        allowedOrigins = process.env.FRONTEND_URL
    }

    const origin = request.headers.origin

    if (allowedOrigins.includes(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin)
    }

    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.setHeader("Access-Control-Allow-Credentials", "true")

    if (request.method === "OPTIONS") {
        return response.sendStatus(204)
    }

    next()
}
