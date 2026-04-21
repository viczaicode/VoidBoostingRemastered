import React, { useEffect, useState } from 'react';
import { myAxios } from '../../api/axios';
import AdminLayout from '../AdminLayout';

const statusOptions = ['in_progress', 'completed', 'cancelled'];

export default function BoosterPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await myAxios.get('/api/booster/orders');
      setOrders(data || []);
    } catch {
      setError('Failed to load booster orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const claimOrder = async (orderId) => {
    try {
      await myAxios.post(`/api/booster/orders/${orderId}/assign`);
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not claim this order.');
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await myAxios.patch(`/api/booster/orders/${orderId}/status`, { status });
      await loadOrders();
    } catch {
      setError('Could not update order status.');
    }
  };

  return (
    <AdminLayout
      title="Booster Panel"
      subtitle="Vedd fel a rendeléseket, és frissítsd az állapotukat"
    >
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="panel-loading">Loading...</div>
      ) : (
        <section className="panel-card">
          <h2>Elérhető és saját rendelések</h2>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service</th>
                  <th>Buyer</th>
                  <th>Rank</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const isMine = Boolean(order.booster_id);

                  return (
                    <tr key={order.order_id}>
                      <td>#{order.order_id}</td>
                      <td>{order.service?.title || '-'}</td>
                      <td>{order.buyer?.nickname || '-'}</td>
                      <td>{order.rank_from} → {order.rank_to}</td>
                      <td>{order.status}</td>
                      <td>
                        {isMine ? (
                          <select
                            className="panel-select"
                            value={order.status}
                            onChange={(e) => updateStatus(order.order_id, e.target.value)}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <button className="btn btn-primary" onClick={() => claimOrder(order.order_id)}>
                            Claim
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </AdminLayout>
  );
}
