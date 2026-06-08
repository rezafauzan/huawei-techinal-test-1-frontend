const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || 'Request failed')
  }

  return payload
}

export async function getUsers() {
  const payload = await request('/users')
  return payload.result || []
}

export async function createUser(data) {
  const payload = await request('/users', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return payload
}

export async function updateUser(id, data) {
  const payload = await request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  return payload
}

export async function deleteUser(id) {
  const payload = await request(`/users/${id}`, {
    method: 'DELETE'
  })
  return payload
}
