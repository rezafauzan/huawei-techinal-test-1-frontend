export default function UserTable({ users, loading, onEdit, onDelete }) {
  return (
    <section className="card table-card">
      <div className="table-header">
        <div>
          <p className="eyebrow">Users</p>
          <h2>User directory</h2>
        </div>
        <span>{users.length} user(s)</span>
      </div>

      {loading && <div className="state">Loading users...</div>}

      {!loading && users.length === 0 && <div className="state">No users yet. Create the first user.</div>}

      {!loading && users.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="Name">{user.first_name} {user.last_name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Phone">{user.phone}</td>
                  <td data-label="Address">{user.address}</td>
                  <td data-label="Actions">
                    <div className="row-actions">
                      <button className="secondary small" type="button" onClick={() => onEdit(user)}>
                        Edit
                      </button>
                      <button className="danger small" type="button" onClick={() => onDelete(user)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
