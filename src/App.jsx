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
    <main className="mx-auto grid min-h-screen max-w-[1440px] gap-3 p-3 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-5 lg:p-5">
      <aside className="grid gap-4 rounded-[22px] border border-white/10 bg-gradient-to-b from-[#111730]/95 to-[#0a0e1f]/90 p-4 shadow-2xl shadow-black/30 sm:grid-cols-[1fr_auto] lg:sticky lg:top-5 lg:min-h-[calc(100vh-2.5rem)] lg:grid-cols-1 lg:grid-rows-[auto_1fr_auto] lg:rounded-[30px] lg:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400 to-violet-600 text-xl font-black shadow-lg shadow-cyan-500/10 lg:h-14 lg:w-14 lg:text-2xl">U</div>
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cyan-300">Huawei Test</p>
            <h2 className="text-xl font-black text-white">User Admin</h2>
          </div>
        </div>

        <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:col-span-2 lg:col-span-1 lg:mt-4 lg:grid lg:content-start lg:overflow-visible lg:p-0" aria-label="Dashboard navigation">
          <span className="relative shrink-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-extrabold text-white lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-5 lg:before:w-1 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2 lg:before:rounded-full lg:before:bg-cyan-300">Overview</span>
          <span className="shrink-0 rounded-2xl border border-transparent px-4 py-3 font-extrabold text-slate-400 transition hover:border-white/10 hover:bg-white/10 hover:text-white">Directory</span>
          <span className="shrink-0 rounded-2xl border border-transparent px-4 py-3 font-extrabold text-slate-400 transition hover:border-white/10 hover:bg-white/10 hover:text-white">Settings</span>
        </nav>

        <div className="hidden min-w-[180px] rounded-[22px] border border-white/10 bg-gradient-to-br from-cyan-400/15 to-violet-600/15 p-4 sm:block sm:col-start-2 sm:row-start-1 lg:col-start-auto lg:row-start-auto">
          <span className="block font-extrabold text-slate-400">API Status</span>
          <strong className="my-1 block text-xl text-white">{loading || saving ? 'Syncing' : 'Connected'}</strong>
          <small className="block text-xs font-extrabold text-slate-400">localhost:8888</small>
        </div>
      </aside>

      <section className="min-w-0">
        <section className="mb-4 flex flex-col items-start justify-between gap-5 rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(91,124,250,0.24),rgba(34,211,238,0.08)),rgba(15,20,42,0.78)] p-5 shadow-2xl shadow-black/25 md:rounded-[32px] md:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cyan-300">Express REST API Client</p>
            <h1 className="text-4xl font-black leading-none text-white md:text-5xl">User CRUD Dashboard</h1>
            <p className="mt-3 text-slate-400">Manage users from the backend API running on port 8888.</p>
          </div>
          <button className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold text-white shadow-inner shadow-white/5 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto" type="button" onClick={loadUsers} disabled={loading || saving}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </section>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-[22px] border border-white/10 bg-[#0f142a]/70 p-4 md:rounded-3xl md:p-5">
            <span className="mb-1 block text-sm font-extrabold text-slate-400">Total users</span>
            <strong className="text-2xl font-black text-white md:text-3xl">{users.length}</strong>
          </article>
          <article className="rounded-[22px] border border-white/10 bg-gradient-to-br from-cyan-400/15 to-violet-600/15 p-4 md:rounded-3xl md:p-5">
            <span className="mb-1 block text-sm font-extrabold text-slate-400">API base</span>
            <strong className="text-2xl font-black text-white md:text-3xl">8888</strong>
          </article>
          <article className="rounded-[22px] border border-white/10 bg-[#0f142a]/70 p-4 md:rounded-3xl md:p-5">
            <span className="mb-1 block text-sm font-extrabold text-slate-400">Status</span>
            <strong className="text-2xl font-black text-white md:text-3xl">{loading || saving ? 'Syncing' : 'Ready'}</strong>
          </article>
        </div>

        {message && (
          <div className={`mb-4 rounded-2xl border p-4 font-extrabold ${message.type === 'success' ? 'border-emerald-400/20 bg-emerald-500/15 text-emerald-200' : 'border-red-400/20 bg-red-400/15 text-red-200'}`}>
            {message.text}
          </div>
        )}

        <div className="grid items-start gap-4 xl:grid-cols-[430px_minmax(0,1fr)]">
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
