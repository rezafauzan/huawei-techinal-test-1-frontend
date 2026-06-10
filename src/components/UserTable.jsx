export default function UserTable({ users, loading, onEdit, onDelete }) {
  const mobileCellClass = 'grid gap-1 border-white/10 py-2 before:text-xs before:font-extrabold before:uppercase before:tracking-wider before:text-slate-500 before:content-[attr(data-label)] md:table-cell md:border-b md:px-3 md:py-4 md:before:content-none'

  return (
    <section className="rounded-[22px] border border-white/10 bg-[#0f142a]/80 p-4 shadow-2xl shadow-black/25 md:rounded-[28px] md:p-6">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cyan-300">Users</p>
          <h2 className="text-2xl font-black text-white">User directory</h2>
        </div>
        <span className="w-full rounded-full bg-cyan-300/10 px-4 py-2 text-center font-extrabold text-cyan-100 sm:w-auto">{users.length} user(s)</span>
      </div>

      {loading && <div className="rounded-2xl border border-dashed border-white/15 bg-[#050816]/50 p-6 text-center text-slate-400">Loading users...</div>}

      {!loading && users.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 bg-[#050816]/50 p-6 text-center text-slate-400">No users yet. Create the first user.</div>}

      {!loading && users.length > 0 && (
        <div className="overflow-visible md:overflow-x-auto">
          <table className="block min-w-0 w-full md:table md:min-w-[680px] md:border-collapse">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">Name</th>
                <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">Email</th>
                <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">Phone</th>
                <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">Address</th>
                <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {users.map((user) => (
                <tr className="mb-3 block rounded-2xl border border-white/10 bg-[#050816]/40 p-3 md:table-row md:border-0 md:bg-transparent md:p-0" key={user.id}>
                  <td className={`${mobileCellClass} text-white`} data-label="Name">{user.first_name} {user.last_name}</td>
                  <td className={`${mobileCellClass} break-all text-slate-300`} data-label="Email">{user.email}</td>
                  <td className={`${mobileCellClass} text-slate-300`} data-label="Phone">{user.phone}</td>
                  <td className={`${mobileCellClass} text-slate-300`} data-label="Address">{user.address}</td>
                  <td className={mobileCellClass} data-label="Actions">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-white" type="button" onClick={() => onEdit(user)}>
                        Edit
                      </button>
                      <button className="rounded-full border border-red-300/20 bg-red-400/15 px-4 py-2 font-bold text-red-200" type="button" onClick={() => onDelete(user)}>
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
