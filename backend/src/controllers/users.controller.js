import { httpResponse } from "../lib/http_handlers.js"
import { logger } from "../lib/logger.js"
import * as userModel from "../models/user.model.js"

export async function getAllUsers(request, response) {
    try {
        const users = await userModel.getAllUsers()

        const getUserResponseDTO = []

        users.forEach(
            user => {
                const filteredData = {
                    id: users.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone
                }

                getUserResponseDTO.push(filteredData)
            }
        )

        logger.api("Get all users data")
        return httpResponse.ok(
            response,
            "Get all users data",
            getUserResponseDTO
        )
    } catch (error) {
        logger.error("API", "Failed get all users data " + error)
        return httpResponse.serverError(
            response,
            "Failed get all users data " + error
        )
    }
}

export async function createUser(request, response) {
    const {
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        confirm_password
    } = request.body

    logger.api("request body : " + JSON.stringify(request.body))

    if (first_name === undefined || first_name.length < 4) {
        logger.warning("API", "Create user failed : Invalid first_name")

        return httpResponse.badRequest(
            response,
            "Create user failed : First Name minimum 4 characters"
        )
    }

    if (last_name === undefined || last_name.length < 4) {
        logger.warning("API", "Create user failed : Invalid last_name")

        return httpResponse.badRequest(
            response,
            "Create user failed : Last Name minimum 4 characters"
        )
    }

    if (phone === undefined || phone.length < 10) {
        logger.warning("API", "Create user failed : Invalid phone")

        return httpResponse.badRequest(
            response,
            "Create user failed : Phone Number minimum 10 digits"
        )
    }

    if (address === undefined || address.length < 10) {
        logger.warning("API", "Create user failed : Invalid address")

        return httpResponse.badRequest(
            response,
            "Create user failed : Address minimum 10 characters"
        )
    }

    if (email === undefined || !email.includes("@")) {
        logger.warning("API", `Create user failed : Invalid email (${email})`)

        return httpResponse.badRequest(
            response,
            "Create user failed : Invalid email"
        )
    }

    if (password === undefined || password.length < 8) {
        logger.warning("API", "Create user failed : Weak password")

        return httpResponse.badRequest(
            response,
            "Create user failed : Password too weak! minimum 8 characters"
        )
    }

    if (confirm_password !== password) {
        logger.warning("API", "Create user failed : Password mismatch")

        return httpResponse.badRequest(
            response,
            "Create user failed : Confirm password not match"
        )
    }

    try {
        const newUser = {
            first_name,
            last_name,
            address,
            phone,
            email,
            password
        }

        const registeredUser = await userModel.createUser(newUser)

        const createUserResponseDTO = {
            id: registeredUser.id,
            first_name: registeredUser.first_name,
            last_name: registeredUser.last_name,
            email: registeredUser.email,
            address: registeredUser.address,
            phone: registeredUser.phone
        }

        logger.api(`Create user success : ${createUserResponseDTO}`)

        return httpResponse.created(
            response,
            "Create user success!",
            createUserResponseDTO
        )

    } catch (error) {
        logger.error("API", `Create user failed : ${error.message}`)

        return httpResponse.serverError(
            response,
            "Create user failed"
        )
    }
}

export async function deleteUser(request, response) {
    const { id } = request.params

    logger.api("request params : " + JSON.stringify(request.params))

    if (id === undefined) {
        logger.warning("API", "Delete user failed : Invalid id")

        return httpResponse.badRequest(
            response,
            "Delete user failed : Invalid id"
        )
    }

    try {
        const deletedUser = await userModel.deleteUser(id)

        const deleteUserResponseDTO = {
            id: deletedUser.id,
            first_name: deletedUser.first_name,
            last_name: deletedUser.last_name,
            email: deletedUser.email,
            address: deletedUser.address,
            phone: deletedUser.phone
        }

        logger.api(
            `Delete user success : ${JSON.stringify(deleteUserResponseDTO)}`
        )

        return httpResponse.ok(
            response,
            "Delete user success!",
            deleteUserResponseDTO
        )

    } catch (error) {
        logger.error("API", `Delete user failed : ${error.message}`)

        return httpResponse.serverError(
            response,
            "Delete user failed"
        )
    }
}

export async function updateUser(request, response) {
    const { id } = request.params

    const {
        first_name,
        last_name,
        address,
        phone,
        email
    } = request.body

    logger.api("request params : " + JSON.stringify(request.params))
    logger.api("request body : " + JSON.stringify(request.body))

    if (id === undefined) {
        logger.warning("API", "Update user failed : Invalid id")

        return httpResponse.badRequest(
            response,
            "Update user failed : Invalid id"
        )
    }

    if (first_name === undefined || first_name.length < 4) {
        logger.warning("API", "Update user failed : Invalid first_name")

        return httpResponse.badRequest(
            response,
            "Update user failed : First Name minimum 4 characters"
        )
    }

    if (last_name === undefined || last_name.length < 4) {
        logger.warning("API", "Update user failed : Invalid last_name")

        return httpResponse.badRequest(
            response,
            "Update user failed : Last Name minimum 4 characters"
        )
    }

    if (phone === undefined || phone.length < 10) {
        logger.warning("API", "Update user failed : Invalid phone")

        return httpResponse.badRequest(
            response,
            "Update user failed : Phone Number minimum 10 digits"
        )
    }

    if (address === undefined || address.length < 10) {
        logger.warning("API", "Update user failed : Invalid address")

        return httpResponse.badRequest(
            response,
            "Update user failed : Address minimum 10 characters"
        )
    }

    if (email === undefined || !email.includes("@")) {
        logger.warning("API", `Update user failed : Invalid email (${email})`)

        return httpResponse.badRequest(
            response,
            "Update user failed : Invalid email"
        )
    }

    try {
        const updatedUser = await userModel.updateUser(id, {
            first_name,
            last_name,
            address,
            phone,
            email
        })

        const updateUserResponseDTO = {
            id: updatedUser.id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            address: updatedUser.address,
            phone: updatedUser.phone
        }

        logger.api(
            `Update user success : ${JSON.stringify(updateUserResponseDTO)}`
        )

        return httpResponse.ok(
            response,
            "Update user success!",
            updateUserResponseDTO
        )

    } catch (error) {
        logger.error("API", `Update user failed : ${error.message}`)

        return httpResponse.serverError(
            response,
            "Update user failed"
        )
    }
}
