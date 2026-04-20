import React from 'react';

export default function AccountInfo({
    formData,
    updateField,
    updateAccount
}) {
    return (
        <div className="form-section">
            <h3>
                <i className="fas fa-user-lock"></i>
                Account Information
            </h3>

            <div className="account-info">

                {/* Discord */}
                <div className="form-group">
                    <label>Discord Tag</label>
                    <input
                        type="text"
                        placeholder="Username#1234"
                        value={formData.discordTag}
                        onChange={(e) =>
                            updateField('discordTag', e.target.value)
                        }
                    />
                </div>

                {/* Username */}
                <div className="form-group">
                    <label>Account Username</label>
                    <input
                        type="text"
                        placeholder="Your LoL username"
                        value={formData.accountInfo.username}
                        onChange={(e) =>
                            updateAccount('username', e.target.value)
                        }
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label>Account Password</label>
                    <input
                        type="password"
                        placeholder="Your LoL password"
                        value={formData.accountInfo.password}
                        onChange={(e) =>
                            updateAccount('password', e.target.value)
                        }
                    />
                </div>

            </div>
        </div>
    );
}