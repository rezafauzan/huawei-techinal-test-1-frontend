const buildResponse = (success, message, result, links = null) => {
    return {
        success,
        message,
        result,
        links
    }
}

export const httpResponse = {
    ok: (res, message = "OK", result = null, links = null) => {
        return res.status(200).json(
            buildResponse(true, message, result, links)
        )
    },

    created: (res, message = "Created", result = null, links = null) => {
        return res.status(201).json(
            buildResponse(true, message, result, links)
        )
    },

    badRequest: (res, message = "Bad Request") => {
        return res.status(400).json(
            buildResponse(false, message, null)
        )
    },

    unauthorized: (res, message = "Unauthorized") => {
        return res.status(401).json(
            buildResponse(false, message, null)
        )
    },

    forbidden: (res, message = "Forbidden") => {
        return res.status(403).json(
            buildResponse(false, message, null)
        )
    },

    notFound: (res, message = "Not Found") => {
        return res.status(404).json(
            buildResponse(false, message, null)
        )
    },

    conflict: (res, message = "Conflict") => {
        return res.status(409).json(
            buildResponse(false, message, null)
        )
    },

    serverError: (res, message = "Internal Server Error") => {
        return res.status(500).json(
            buildResponse(false, message, null)
        )
    }
}
