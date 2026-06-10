import { useEffect, useState } from 'react'
import { createUser, deleteUser, getUsers, updateUser } from './api/users.js'
import UserForm from './components/UserForm.jsx'
import UserTable from './components/UserTable.jsx'

function normalizeUsers(users) {
  return users.map((user, index) => ({
    ...user,
    id: user.id ?? index
  }))
}

export default function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  async function loadUsers() {
    setLoading(true)
    setMessage(null)

    try {
      const data = await getUsers()
      setUsers(normalizeUsers(data))
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function handleSubmit(formData) {
    setSaving(true)
    setMessage(null)

    try {
      if (selectedUser) {
        const payload = await updateUser(selectedUser.id, formData)
        setUsers((current) => current.map((user) => (user.id === selectedUser.id ? payload.result : user)))
        setSelectedUser(null)
        setMessage({ type: 'success', text: payload.message || 'User updated successfully' })
      } else {
        const payload = await createUser(formData)
        setUsers((current) => [...current, payload.result])
        setMessage({ type: 'success', text: payload.message || 'User created successfully' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(`Delete ${user.first_name} ${user.last_name}?`)
    if (!confirmed) return

    setSaving(true)
    setMessage(null)

    try {
      const payload = await deleteUser(user.id)
      setUsers((current) => current.filter((item) => item.id !== user.id))
      if (selectedUser?.id === user.id) setSelectedUser(null)
      setMessage({ type: 'success', text: payload.message || 'User deleted successfully' })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">U</div>
          <div>
            <p className="eyebrow">Huawei Test</p>
            <h2>User Admin</h2>
          </div>
        </div>
        <nav className="side-nav" aria-label="Dashboard navigation">
          <span className="active">Overview</span>
        </nav>
        <div className="api-card">
          <span>API Status</span>
          <strong>{loading || saving ? 'Syncing' : 'Connected'}</strong>
          <small>localhost:8888</small>
        </div>
      </aside>

      <section className="app-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">Express REST API Client</p>
            <h1>User CRUD Dashboard</h1>
            <p>Manage users from the backend API running on port 8888.</p>
          </div>
          <button className="secondary" type="button" onClick={loadUsers} disabled={loading || saving}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </section>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Total users</span>
            <strong>{users.length}</strong>
          </article>
          <article className="stat-card accent">
            <span>API base</span>
            <strong>8888</strong>
          </article>
          <article className="stat-card">
            <span>Status</span>
            <strong>{loading || saving ? 'Syncing' : 'Ready'}</strong>
          </article>
        </div>

        {message && <div className={`alert ${message.type}`}>{message.text}</div>}

        <div className="content-grid">
          <UserForm
            selectedUser={selectedUser}
            loading={saving}
            onCancel={() => setSelectedUser(null)}
            onSubmit={handleSubmit}
          />
          <UserTable users={users} loading={loading} onEdit={setSelectedUser} onDelete={handleDelete} />
        </div>
      </section>
    </main>
  )
}
