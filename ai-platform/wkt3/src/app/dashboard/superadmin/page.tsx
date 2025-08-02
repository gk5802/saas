/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function SuperadminPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  async function handleRoleChange(email: string, role: string) {
    await fetch("/api/role/assign", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
    setUsers(users.map((u) => (u.email === email ? { ...u, role } : u)));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Login Count</th>
            <th>Assign Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.loginCount}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.email, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
