import React, { useEffect, useState } from 'react';
import { myAxios } from '../../api/axios';
import AdminLayout from '../AdminLayout';

export default function MyOrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await myAxios.get('/api/my-orders');
      setOrders(data || []);
    } catch {
      setError('Failed to load your orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <AdminLayout
      title="My Orders"
      subtitle="Az általad leadott rendelések és azok aktuális állapota"
    >
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="panel-loading">Loading...</div>
      ) : (
        <section className="panel-card">
          <h2>Rendeléseim</h2>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service</th>
                  <th>Rank</th>
                  <th>Status</th>
                  <th>Booster Email</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>#{order.order_id}</td>
                      <td>{order.service?.title || '-'}</td>
                      <td>{order.rank_from} → {order.rank_to}</td>
                      <td>{order.status}</td>
                      <td>{order.booster?.email || 'Not assigned yet'}</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Még nincs leadott rendelésed.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </AdminLayout>
  );
}
