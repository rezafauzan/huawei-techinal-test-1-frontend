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
    <form className="card form-card" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">{isEditing ? 'Edit user' : 'Create user'}</p>
        <h2>{isEditing ? 'Update user data' : 'Add a new user'}</h2>
      </div>

      <div className="form-grid">
        <label>
          First name
          <input name="first_name" value={form.first_name} onChange={handleChange} required minLength={4} />
        </label>
        <label>
          Last name
          <input name="last_name" value={form.last_name} onChange={handleChange} required minLength={4} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} required minLength={10} />
        </label>
        <label className="full-width">
          Address
          <textarea name="address" value={form.address} onChange={handleChange} required minLength={10} rows={3} />
        </label>

        {!isEditing && (
          <>
            <label>
              Password
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} />
            </label>
            <label>
              Confirm password
              <input name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} required minLength={8} />
            </label>
          </>
        )}
      </div>

      <div className="form-actions">
        {isEditing && (
          <button className="secondary" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEditing ? 'Save changes' : 'Create user'}
        </button>
      </div>
    </form>
  )
}
