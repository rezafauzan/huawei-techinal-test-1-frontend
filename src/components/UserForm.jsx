import { useEffect, useState } from 'react'

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  phone: '',
  password: '',
  confirm_password: ''
}

const inputClass = 'w-full min-w-0 rounded-2xl border border-white/10 bg-[#050816]/60 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10'
const labelClass = 'grid min-w-0 gap-2 text-sm font-bold text-slate-300'

export default function UserForm({ selectedUser, loading, onCancel, onSubmit }) {
  const [form, setForm] = useState(emptyForm)
  const isEditing = Boolean(selectedUser)

  useEffect(() => {
    if (selectedUser) {
      setForm({
        first_name: selectedUser.first_name || '',
        last_name: selectedUser.last_name || '',
        email: selectedUser.email || '',
        address: selectedUser.address || '',
        phone: selectedUser.phone || '',
        password: '',
        confirm_password: ''
      })
      return
    }

    setForm(emptyForm)
  }, [selectedUser])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const payload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      phone: form.phone.trim()
    }

    if (!isEditing) {
      payload.password = form.password
      payload.confirm_password = form.confirm_password
    }

    onSubmit(payload)
  }

  return (
    <form className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0f142a]/80 p-4 shadow-2xl shadow-black/25 md:rounded-[28px] md:p-6" onSubmit={handleSubmit}>
      <div>
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cyan-300">{isEditing ? 'Edit user' : 'Create user'}</p>
        <h2 className="text-2xl font-black text-white">{isEditing ? 'Update user data' : 'Add a new user'}</h2>
      </div>

      <div className="mt-5 grid gap-4">
        <label className={labelClass}>
          First name
          <input className={inputClass} name="first_name" value={form.first_name} onChange={handleChange} required minLength={4} />
        </label>
        <label className={labelClass}>
          Last name
          <input className={inputClass} name="last_name" value={form.last_name} onChange={handleChange} required minLength={4} />
        </label>
        <label className={labelClass}>
          Email
          <input className={inputClass} name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label className={labelClass}>
          Phone
          <input className={inputClass} name="phone" value={form.phone} onChange={handleChange} required minLength={10} />
        </label>
        <label className={labelClass}>
          Address
          <textarea className={`${inputClass} resize-y`} name="address" value={form.address} onChange={handleChange} required minLength={10} rows={3} />
        </label>

        {!isEditing && (
          <>
            <label className={labelClass}>
              Password
              <input className={inputClass} name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} />
            </label>
            <label className={labelClass}>
              Confirm password
              <input className={inputClass} name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} required minLength={8} />
            </label>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        {isEditing && (
          <button className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
        <button className="rounded-full bg-gradient-to-br from-[#5b7cfa] to-[#8d5cf6] px-5 py-3 font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEditing ? 'Save changes' : 'Create user'}
        </button>
      </div>
    </form>
  )
}
