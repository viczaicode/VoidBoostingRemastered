import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { v4 as uuidv4 } from 'uuid';

export default function BoostingAboveMasters() {
    const { user } = useAuthContext();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        currentRank: 'Master 0 LP',
        desiredRank: 'Grandmaster 100 LP',
        currentLP: 0,
        desiredLP: 100,
        server: 'EUW',
        speed: 'VIP',
        playWithBooster: false,
        specificBooster: false,
        streaming: false,
        champions: 5,
        roles: 'Mid',
        notes: '',
        discordTag: '',
        accountInfo: {
            username: '',
            password: ''
        }
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const mastersRanks = [
        'Master 0 LP', 'Master 100 LP', 'Master 200 LP', 'Master 300 LP', 'Master 400 LP',
        'Grandmaster 0 LP', 'Grandmaster 100 LP', 'Grandmaster 200 LP', 'Grandmaster 300 LP', 'Grandmaster 400 LP',
        'Challenger 0 LP', 'Challenger 100 LP', 'Challenger 200 LP', 'Challenger 300 LP', 'Challenger 400 LP'
    ];

    const servers = ['EUW', 'NA', 'KR', 'EUNE', 'BR', 'LAN', 'LAS', 'OCE', 'TR', 'RU', 'JP'];
    const speeds = [
        { name: 'Basic', multiplier: 1, time: '3-5 days per 100 LP' },
        { name: 'VIP', multiplier: 1.5, time: '2-3 days per 100 LP' },
        { name: 'VIP+', multiplier: 2, time: '1-2 days per 100 LP' }
    ];
    const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Fill'];

    const calculatePrice = () => {
        const currentRankIndex = mastersRanks.indexOf(formData.currentRank);
        const desiredRankIndex = mastersRanks.indexOf(formData.desiredRank);
        
        if (currentRankIndex >= desiredRankIndex) {
            setTotalPrice(0);
            return;
        }

        const lpToClimb = (desiredRankIndex - currentRankIndex) * 100 + (formData.desiredLP - formData.currentLP);
        const basePricePer100LP = 50; // Higher price for masters+
        const speedMultiplier = speeds.find(s => s.name === formData.speed)?.multiplier || 1;
        const championBonus = formData.champions > 3 ? (formData.champions - 3) * 5 : 0;
        const playWithBoosterBonus = formData.playWithBooster ? lpToClimb * 0.3 : 0;
        const streamingBonus = formData.streaming ? lpToClimb * 0.2 : 0;
        
        const calculatedPrice = (lpToClimb / 100 * basePricePer100LP * speedMultiplier) + 
                              championBonus + playWithBoosterBonus + streamingBonus;
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
            orderType: 'Above Masters Boosting',
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
            playWithBooster: formData.playWithBooster,
            streaming: formData.streaming,
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
                <section className="boosting-hero masters-hero">
                    <div className="boosting-hero-content">
                        <div className="boosting-badge masters-badge">
                            <i className="fas fa-crown"></i>
                            Above Masters
                        </div>
                        <h1>Reach Pinnacle of League</h1>
                        <p>Elite boosting service for Master, Grandmaster, and Challenger ranks</p>
                        <div className="boosting-features">
                            <div className="boosting-feature">
                                <i className="fas fa-shield-alt"></i>
                                <span>VPN Protected</span>
                            </div>
                            <div className="boosting-feature">
                                <i className="fas fa-user-shield"></i>
                                <span>Top Tier Boosters</span>
                            </div>
                            <div className="boosting-feature">
                                <i className="fas fa-video"></i>
                                <span>Streaming Available</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Form */}
                <section className="order-section">
                    <div className="order-container">
                        <div className="order-form">
                            <h2>Configure Your Elite Boost</h2>
                            
                            {/* Rank Selection */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-crown"></i>
                                    High Elo Rank Selection
                                </h3>
                                <div className="rank-selection">
                                    <div className="form-group">
                                        <label>Current Rank</label>
                                        <select 
                                            value={formData.currentRank} 
                                            onChange={(e) => setFormData({...formData, currentRank: e.target.value})}
                                        >
                                            {mastersRanks.map(rank => (
                                                <option key={rank} value={rank}>{rank}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Current LP</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="400"
                                            value={formData.currentLP}
                                            onChange={(e) => setFormData({...formData, currentLP: parseInt(e.target.value) || 0})}
                                        />
                                    </div>
                                    <div className="rank-arrow">
                                        <i className="fas fa-arrow-up"></i>
                                    </div>
                                    <div className="form-group">
                                        <label>Desired Rank</label>
                                        <select 
                                            value={formData.desiredRank} 
                                            onChange={(e) => setFormData({...formData, desiredRank: e.target.value})}
                                        >
                                            {mastersRanks.map(rank => (
                                                <option key={rank} value={rank}>{rank}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Desired LP</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="400"
                                            value={formData.desiredLP}
                                            onChange={(e) => setFormData({...formData, desiredLP: parseInt(e.target.value) || 0})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Premium Options */}
                            <div className="form-section">
                                <h3>
                                    <i className="fas fa-star"></i>
                                    Premium Options
                                </h3>
                                <div className="premium-options">
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
                                    <div className="premium-addons">
                                        <div className="addon-option">
                                            <input 
                                                type="checkbox" 
                                                id="playWithBooster"
                                                checked={formData.playWithBooster}
                                                onChange={(e) => setFormData({...formData, playWithBooster: e.target.checked})}
                                            />
                                            <label htmlFor="playWithBooster" className="addon-label">
                                                <div className="addon-header">
                                                    <i className="fas fa-users"></i>
                                                    <span>Play with Booster</span>
                                                    <span className="addon-price">+30%</span>
                                                </div>
                                                <span>Play duo queue with your booster</span>
                                            </label>
                                        </div>
                                        <div className="addon-option">
                                            <input 
                                                type="checkbox" 
                                                id="streaming"
                                                checked={formData.streaming}
                                                onChange={(e) => setFormData({...formData, streaming: e.target.checked})}
                                            />
                                            <label htmlFor="streaming" className="addon-label">
                                                <div className="addon-header">
                                                    <i className="fas fa-video"></i>
                                                    <span>Live Streaming</span>
                                                    <span className="addon-price">+20%</span>
                                                </div>
                                                <span>Watch your boost live on stream</span>
                                            </label>
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
                                            <option value={1}>1 Champion (Free)</option>
                                            <option value={2}>2 Champions (+$5)</option>
                                            <option value={3}>3 Champions (+$10)</option>
                                            <option value={4}>4 Champions (+$15)</option>
                                            <option value={5}>5 Champions (+$20)</option>
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
                                    Special Requirements
                                </h3>
                                <div className="form-group">
                                    <textarea 
                                        placeholder="Any specific champions to avoid, playstyle preferences, or other requirements?"
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
                                        <span>${Math.round((mastersRanks.indexOf(formData.desiredRank) - mastersRanks.indexOf(formData.currentRank)) * 100 / 100 * 50)}</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Speed Multiplier:</span>
                                        <span>×{speeds.find(s => s.name === formData.speed)?.multiplier || 1}</span>
                                    </div>
                                    <div className="price-item">
                                        <span>Champion Bonus:</span>
                                        <span>${formData.champions > 1 ? (formData.champions - 1) * 5 : 0}</span>
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

                            {/* Action Buttons */}
                            <div className="order-actions">
                                <button 
                                    className="btn btn-primary btn-large masters-btn"
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
