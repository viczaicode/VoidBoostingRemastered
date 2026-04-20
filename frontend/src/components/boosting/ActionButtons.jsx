import React from 'react';

export default function ActionButtons({
    totalPrice,
    formData,
    onAddToCart,
    onViewCart
}) {
    const isDisabled =
        totalPrice === 0 ||
        !formData.accountInfo.username ||
        !formData.accountInfo.password;

    return (
        <div className="order-actions">

            <button
                className="btn btn-primary btn-large masters-btn"
                onClick={onAddToCart}
                disabled={isDisabled}
            >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart - ${totalPrice}
            </button>

            <button
                className="btn btn-secondary btn-large"
                onClick={onViewCart}
            >
                <i className="fas fa-shopping-bag"></i>
                View Cart
            </button>

        </div>
    );
}