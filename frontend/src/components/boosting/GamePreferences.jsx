import React from 'react';

export default function GamePreferences({
    formData,
    updateField,
    roles
}) {
    return (
        <div className="form-section">
            <h3>
                <i className="fas fa-gamepad"></i>
                Game Preferences
            </h3>

            <div className="game-preferences">

                {/* Champions */}
                <div className="form-group">
                    <label>Number of Champions</label>
                    <select
                        value={formData.champions}
                        onChange={(e) =>
                            updateField('champions', parseInt(e.target.value))
                        }
                    >
                        <option value={1}>1 Champion (Free)</option>
                        <option value={2}>2 Champions (+$5)</option>
                        <option value={3}>3 Champions (+$10)</option>
                        <option value={4}>4 Champions (+$15)</option>
                        <option value={5}>5 Champions (+$20)</option>
                    </select>
                </div>

                {/* Roles */}
                <div className="form-group">
                    <label>Preferred Role</label>
                    <select
                        value={formData.roles}
                        onChange={(e) =>
                            updateField('roles', e.target.value)
                        }
                    >
                        {roles.map(role => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
}