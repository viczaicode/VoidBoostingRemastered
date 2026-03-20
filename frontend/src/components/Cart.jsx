import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import axios from 'axios';

export default function Cart() {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      navigate('/bejelentkezes');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const orderPromises = items.map(async (item) => {
        const orderData = {
          service_id: item.serviceId || 1, // Default service ID
          buyer_id: user.id,
          booster_id: null, // Will be assigned by admin
          rank_from: item.currentRank,
          rank_to: item.desiredRank,
          price: item.totalPrice,
          order_details: {
            type: item.orderType,
            server: item.server,
            speed: item.speed,
            champions: item.champions,
            roles: item.roles,
            notes: item.notes,
            discordTag: item.discordTag,
            accountInfo: item.accountInfo,
            currentLP: item.currentLP,
            desiredLP: item.desiredLP,
            playWithBooster: item.playWithBooster,
            streaming: item.streaming
          }
        };

        const response = await axios.post('/api/orders', orderData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        return response.data;
      });

      await Promise.all(orderPromises);
      
      alert('Orders submitted successfully! Our boosters will contact you soon.');
      clearCart();
      navigate('/services');
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit orders. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Browse our services and add them to your cart</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/services')}
            >
              <i className="fas fa-store"></i>
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>
            <i className="fas fa-shopping-cart"></i>
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
          <button 
            className="btn btn-secondary"
            onClick={handleClearCart}
            disabled={submitting}
          >
            <i className="fas fa-trash"></i>
            Clear Cart
          </button>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-header">
                <div className="cart-item-title">
                  <h3>{item.orderType}</h3>
                  <div className="cart-item-badges">
                    <span className="cart-item-badge">{item.server}</span>
                    <span className="cart-item-badge">{item.speed}</span>
                  </div>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={submitting}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="cart-item-details">
                <div className="cart-item-rank">
                  <span className="rank-from">{item.currentRank}</span>
                  <i className="fas fa-arrow-right"></i>
                  <span className="rank-to">{item.desiredRank}</span>
                </div>

                <div className="cart-item-features">
                  <div className="cart-item-feature">
                    <i className="fas fa-gamepad"></i>
                    <span>{item.roles}</span>
                  </div>
                  <div className="cart-item-feature">
                    <i className="fas fa-users"></i>
                    <span>{item.champions} Champions</span>
                  </div>
                  {item.playWithBooster && (
                    <div className="cart-item-feature">
                      <i className="fas fa-user-friends"></i>
                      <span>Play with Booster</span>
                    </div>
                  )}
                  {item.streaming && (
                    <div className="cart-item-feature">
                      <i className="fas fa-video"></i>
                      <span>Live Streaming</span>
                    </div>
                  )}
                </div>

                {item.notes && (
                  <div className="cart-item-notes">
                    <strong>Notes:</strong> {item.notes}
                  </div>
                )}
              </div>

              <div className="cart-item-footer">
                <div className="cart-item-price">
                  <span className="price-label">Total Price:</span>
                  <span className="price-amount">${item.totalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-content">
            <h3>Order Summary</h3>
            <div className="cart-summary-details">
              <div className="summary-item">
                <span>Subtotal ({items.length} items):</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="summary-item">
                <span>Processing Fee:</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="cart-summary-total">
              <span>Total:</span>
              <span className="total-amount">${getTotalPrice()}</span>
            </div>

            <div className="cart-summary-actions">
              <button 
                className="btn btn-secondary btn-large"
                onClick={() => navigate('/services')}
                disabled={submitting}
              >
                <i className="fas fa-arrow-left"></i>
                Continue Shopping
              </button>
              <button 
                className="btn btn-primary btn-large btn-full"
                onClick={handleSubmitOrder}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i>
                    Complete Order - ${getTotalPrice()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
