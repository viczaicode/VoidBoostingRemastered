import React from 'react';

export default function PremiumOptions({
    formData,
    updateField,
    servers,
    speeds
}) {
    return (
        <div className="form-section">
            <h3>
                <i className="fas fa-star"></i>
                Premium Options
            </h3>

            <div className="premium-options">

                {/* Server */}
                <div className="form-group">
                    <label>Server</label>
                    <select
                        value={formData.server}
                        onChange={(e) => updateField('server', e.target.value)}
                    >
                        {servers.map(server => (
                            <option key={server} value={server}>
                                {server}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Speed */}
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
                                    onChange={(e) => updateField('speed', e.target.value)}
                                />

                                <label htmlFor={speed.name} className="speed-label">
                                    <div className="speed-header">
                                        <span className="speed-name">{speed.name}</span>
                                        <span className="speed-multiplier">
                                            ×{speed.multiplier}
                                        </span>
                                    </div>
                                    <span className="speed-time">{speed.time}</span>
                                </label>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Addons */}
                <div className="premium-addons">

                    {/* Play with Booster */}
                    <div className="addon-option">
                        <input
                            type="checkbox"
                            id="playWithBooster"
                            checked={formData.playWithBooster}
                            onChange={(e) =>
                                updateField('playWithBooster', e.target.checked)
                            }
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

                    {/* Streaming */}
                    <div className="addon-option">
                        <input
                            type="checkbox"
                            id="streaming"
                            checked={formData.streaming}
                            onChange={(e) =>
                                updateField('streaming', e.target.checked)
                            }
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
    );
}