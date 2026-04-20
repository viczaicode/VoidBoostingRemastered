import React from 'react';

export default function Notes({ formData, updateField }) {
    return (
        <div className="form-section">
            <h3>
                <i className="fas fa-comment"></i>
                Special Requirements
            </h3>

            <div className="form-group">
                <textarea
                    placeholder="Any specific champions to avoid, playstyle preferences, or other requirements?"
                    value={formData.notes}
                    onChange={(e) =>
                        updateField('notes', e.target.value)
                    }
                    rows="4"
                />
            </div>
        </div>
    );
}