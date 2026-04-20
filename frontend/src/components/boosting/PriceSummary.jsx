import React from 'react';

export default function PriceSummary({
    formData,
    totalPrice,
    mastersRanks,
    speeds
}) {
    const basePrice =
        (mastersRanks.indexOf(formData.desiredRank) -
            mastersRanks.indexOf(formData.currentRank)) * 50;

    const speedMultiplier =
        speeds.find(s => s.name === formData.speed)?.multiplier || 1;

    const championBonus =
        formData.champions > 1 ? (formData.champions - 1) * 5 : 0;

    return (
        <div className="price-summary">

            <div className="price-details">

                <div className="price-item">
                    <span>Base Price:</span>
                    <span>${Math.max(0, Math.round(basePrice))}</span>
                </div>

                <div className="price-item">
                    <span>Speed Multiplier:</span>
                    <span>×{speedMultiplier}</span>
                </div>

                <div className="price-item">
                    <span>Champion Bonus:</span>
                    <span>${championBonus}</span>
                </div>

                {formData.playWithBooster && (
                    <div className="price-item">
                        <span>Play with Booster:</span>
                        <span>+30%</span>
                    </div>
                )}

                {formData.streaming && (
                    <div className="price-item">
                        <span>Live Streaming:</span>
                        <span>+20%</span>
                    </div>
                )}

            </div>

            <div className="total-price">
                <span>Total Price:</span>
                <span className="price-amount">${totalPrice}</span>
            </div>

        </div>
    );
}