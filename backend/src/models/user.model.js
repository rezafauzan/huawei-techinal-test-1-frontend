import { users } from "../../storage/data.js"

function getAllUsers() {
    return users
}

function createUser(user) {
    user.id = users.length
    users.push(user)
    return user
}

function deleteUser(id) {
    const index = users.findIndex(
        user => user.id === Number(id)
    )

    if (index === -1) {
        throw new Error("user not found")
    }

    return users.splice(index, 1)[0]
}

function updateUser(id, newUserData) {
    const userIndex = users.findIndex(
        user => user.id === parseInt(id)
    )

    if (userIndex === -1) {
        throw new Error("user not found")
    }

    users[userIndex] = {
        ...users[userIndex],
        ...newUserData
    }

    return users[userIndex]
}

export { getAllUsers, createUser, deleteUser, updateUser }
