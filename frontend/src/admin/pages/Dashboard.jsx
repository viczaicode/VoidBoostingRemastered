import React, { useEffect, useState } from 'react';
import { myAxios } from '../../api/axios';
import AdminLayout from '../AdminLayout';

const statusOptions = ['pending', 'in_progress', 'completed', 'cancelled'];
const roleOptions = [
  { value: 0, label: 'User' },
  { value: 1, label: 'Booster' },
  { value: 2, label: 'Admin' },
];

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [ordersResp, usersResp] = await Promise.all([
        myAxios.get('/api/orders'),
        myAxios.get('/api/users'),
      ]);

      setOrders(ordersResp.data || []);
      setUsers(usersResp.data || []);
    } catch (err) {
      setError('Failed to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await myAxios.patch(`/api/orders/${orderId}`, { status });
      await loadData();
    } catch {
      setError('Could not update order status.');
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await myAxios.patch(`/api/users/${userId}/role`, { role: Number(role) });
      await loadData();
    } catch {
      setError('Could not update user role.');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await myAxios.delete(`/api/orders/${orderId}`);
      await loadData();
    } catch {
      setError('Could not delete order.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await myAxios.delete(`/api/users/${userId}`);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete user.');
    }
  };

  return (
    <AdminLayout
      title="Admin Panel"
      subtitle="Rendelések és felhasználók kezelése"
    >
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="panel-loading">Loading...</div>
      ) : (
        <>
          <section className="panel-card">
            <h2>Rendelések</h2>
            <div className="panel-table-wrapper">
              <table className="panel-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service</th>
                    <th>Buyer</th>
                    <th>Booster</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>#{order.order_id}</td>
                      <td>{order.service?.title || '-'}</td>
                      <td>{order.buyer?.nickname || '-'}</td>
                      <td>{order.booster?.nickname || 'Unassigned'}</td>
                      <td>
                        <select
                          className="panel-select"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>${order.price}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => deleteOrder(order.order_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel-card">
            <h2>Felhasználók</h2>
            <div className="panel-table-wrapper">
              <table className="panel-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nickname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((account) => (
                    <tr key={account.user_id}>
                      <td>#{account.user_id}</td>
                      <td>{account.nickname}</td>
                      <td>{account.email}</td>
                      <td>
                        <select
                          className="panel-select"
                          value={account.role}
                          onChange={(e) => updateUserRole(account.user_id, e.target.value)}
                        >
                          {roleOptions.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => deleteUser(account.user_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}
