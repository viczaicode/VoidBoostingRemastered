import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { v4 as uuidv4 } from 'uuid';

export default function BoostingBelowMasters() {
    const { user } = useAuthContext();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        currentRank: 'Iron IV',
        desiredRank: 'Gold I',
        currentLP: 0,
        desiredLP: 0,
        server: 'EUW',
        speed: 'Basic',
        champions: 3,
        roles: 'Top',
        notes: '',
        discordTag: '',
        accountInfo: {
            username: '',
            password: ''
        }
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const ranks = [
        'Iron IV', 'Iron III', 'Iron II', 'Iron I',
        'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I',
        'Silver IV', 'Silver III', 'Silver II', 'Silver I',
        'Gold IV', 'Gold III', 'Gold II', 'Gold I',
        'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I',
        'Emerald IV', 'Emerald III', 'Emerald II', 'Emerald I',
        'Diamond IV', 'Diamond III', 'Diamond II', 'Diamond I'
    ];

    const servers = ['EUW', 'NA', 'KR', 'EUNE', 'BR', 'LAN', 'LAS', 'OCE', 'TR', 'RU', 'JP'];
    const speeds = [
        { name: 'Basic', multiplier: 1, time: '2-3 days per division' },
        { name: 'VIP', multiplier: 1.5, time: '1-2 days per division' },
        { name: 'VIP+', multiplier: 2, time: 'Same day completion' }
    ];
    const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

    const calculatePrice = () => {
        const currentRankIndex = ranks.indexOf(formData.currentRank);
        const desiredRankIndex = ranks.indexOf(formData.desiredRank);
        
        if (currentRankIndex >= desiredRankIndex) {
            setTotalPrice(0);
            return;
        }

        const divisionsToClimb = desiredRankIndex - currentRankIndex;
        const basePricePerDivision = 15;
        const speedMultiplier = speeds.find(s => s.name === formData.speed)?.multiplier || 1;
        const championBonus = formData.champions > 3 ? (formData.champions - 3) * 2 : 0;
        
        const calculatedPrice = (divisionsToClimb * basePricePerDivision * speedMultiplier) + championBonus;
        setTotalPrice(Math.round(calculatedPrice));
    };

    React.useEffect(() => {
        calculatePrice();
    }, [formData]);

    const handleAddToCart = () => {
        if (!user) {
            navigate('/bejelentkezes');
            return;
        }

        if (totalPrice === 0 || !formData.accountInfo.username || !formData.accountInfo.password) {
            alert('Please fill in all required fields');
            return;
        }

        const cartItem = {
            id: uuidv4(),
            orderType: 'Below Masters Boosting',
            currentRank: formData.currentRank,
            desiredRank: formData.desiredRank,
            currentLP: formData.currentLP,
            desiredLP: formData.desiredLP,
            server: formData.server,
            speed: formData.speed,
            champions: formData.champions,
            roles: formData.roles,
            notes: formData.notes,
            discordTag: formData.discordTag,
            accountInfo: formData.accountInfo,
            totalPrice: totalPrice,
            timestamp: new Date().toISOString()
        };

        addToCart(cartItem);
        navigate('/cart');
    };

    return (
        <div className="boosting-page">
            <div className="boosting-container">
                {/* Hero Section */}
                <section className="boosting-hero">
                    <div className="boosting-hero-content">
                        <div className="boosting-badge">
                            <i className="fas fa-rocket"></i>
                            Below Masters
                        </div>
                        <h1>Climb to Your Dream Rank</h1>
                        <p>Professional elo boosting service from Iron to Diamond</p>
                        <div className="boosting-features">
                            <div className="boosting-feature">
                                <i className="fas fa-shield-alt"></i>
                                <span>100% Secure</span>
                            </div>
                            <div className="boosting-feature">
                                <i className="fas fa-trophy"></i>
                                <span>Guaranteed Results</span>
                            </div>
                            <div className="boosting-feature">
                                <i className="fas fa-headset"></i>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Form */}
                <section className="order-section">
                    <div className="order-container">
                        <div className="order-form">
                            <h2>Configure Your Boost</h2>
                            
                            {/* Rank Selection */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-chart-line"></i>
                                    Rank Selection
                                </h3>
                                <div className="rank-selection">
                                    <div className="form-group">
                                        <label>Current Rank</label>
                                        <select 
                                            value={formData.currentRank} 
                                            onChange={(e) => setFormData({...formData, currentRank: e.target.value})}
                                        >
                                            {ranks.map(rank => (
                                                <option key={rank} value={rank}>{rank}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Current LP</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="99"
                                            value={formData.currentLP}
                                            onChange={(e) => setFormData({...formData, currentLP: parseInt(e.target.value) || 0})}
                                        />
                                    </div>
                                    <div className="rank-arrow">
                                        <i className="fas fa-arrow-down"></i>
                                    </div>
                                    <div className="form-group">
                                        <label>Desired Rank</label>
                                        <select 
                                            value={formData.desiredRank} 
                                            onChange={(e) => setFormData({...formData, desiredRank: e.target.value})}
                                        >
                                            {ranks.map(rank => (
                                                <option key={rank} value={rank}>{rank}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Desired LP</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="99"
                                            value={formData.desiredLP}
                                            onChange={(e) => setFormData({...formData, desiredLP: parseInt(e.target.value) || 0})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Server & Speed */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-cog"></i>
                                    Service Options
                                </h3>
                                <div className="service-options">
                                    <div className="form-group">
                                        <label>Server</label>
                                        <select 
                                            value={formData.server} 
                                            onChange={(e) => setFormData({...formData, server: e.target.value})}
                                        >
                                            {servers.map(server => (
                                                <option key={server} value={server}>{server}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Boosting Speed</label>
                                        <div className="speed-options">
                                            {speeds.map(speed => (
                                                <div key={speed.name} className="speed-option">
                                                    <input 
                                                        type="radio" 
                                                        id={speed.name}
                                                        name="speed"
                                                        value={speed.name}
                                                        checked={formData.speed === speed.name}
                                                        onChange={(e) => setFormData({...formData, speed: e.target.value})}
                                                    />
                                                    <label htmlFor={speed.name} className="speed-label">
                                                        <div className="speed-header">
                                                            <span className="speed-name">{speed.name}</span>
                                                            <span className="speed-multiplier">×{speed.multiplier}</span>
                                                        </div>
                                                        <span className="speed-time">{speed.time}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Game Preferences */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-gamepad"></i>
                                    Game Preferences
                                </h3>
                                <div className="game-preferences">
                                    <div className="form-group">
                                        <label>Number of Champions</label>
                                        <select 
                                            value={formData.champions} 
                                            onChange={(e) => setFormData({...formData, champions: parseInt(e.target.value)})}
                                        >
                                            <option value={1}>1 Champion</option>
                                            <option value={2}>2 Champions</option>
                                            <option value={3}>3 Champions (Free)</option>
                                            <option value={4}>4 Champions (+$2)</option>
                                            <option value={5}>5 Champions (+$4)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Preferred Role</label>
                                        <select 
                                            value={formData.roles} 
                                            onChange={(e) => setFormData({...formData, roles: e.target.value})}
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-user-lock"></i>
                                    Account Information
                                </h3>
                                <div className="account-info">
                                    <div className="form-group">
                                        <label>Discord Tag</label>
                                        <input 
                                            type="text" 
                                            placeholder="Username#1234"
                                            value={formData.discordTag}
                                            onChange={(e) => setFormData({...formData, discordTag: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Account Username</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your LoL username"
                                            value={formData.accountInfo.username}
                                            onChange={(e) => setFormData({
                                                ...formData, 
                                                accountInfo: {...formData.accountInfo, username: e.target.value}
                                            })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Account Password</label>
                                        <input 
                                            type="password" 
                                            placeholder="Your LoL password"
                                            value={formData.accountInfo.password}
                                            onChange={(e) => setFormData({
                                                ...formData, 
                                                accountInfo: {...formData.accountInfo, password: e.target.value}
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-comment"></i>
                                    Additional Notes
                                </h3>
                                <div className="form-group">
                                    <textarea 
                                        placeholder="Any specific requirements or preferences?"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                        rows="4"
                                    />
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="price-summary">
                                <div className="price-details">
                                    <div className="price-item">
                                        <span>Base Price:</span>
                                        <span>${Math.round((ranks.indexOf(formData.desiredRank) - ranks.indexOf(formData.currentRank)) * 15)}</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Speed Multiplier:</span>
                                        <span>×{speeds.find(s => s.name === formData.speed)?.multiplier || 1}</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Champion Bonus:</span>
                                        <span>${formData.champions > 3 ? (formData.champions - 3) * 2 : 0}</span>
                                    </div>
                                </div>
                                <div className="total-price">
                                    <span>Total Price:</span>
                                    <span className="price-amount">${totalPrice}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="order-actions">
                                <button 
                                    className="btn btn-primary btn-large"
                                    onClick={handleAddToCart}
                                    disabled={totalPrice === 0 || !formData.accountInfo.username || !formData.accountInfo.password}
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    Add to Cart - ${totalPrice}
                                </button>
                                <button 
                                    className="btn btn-secondary btn-large"
                                    onClick={() => navigate('/cart')}
                                >
                                    <i className="fas fa-shopping-bag"></i>
                                    View Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
