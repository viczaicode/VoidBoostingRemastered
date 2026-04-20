import React from 'react';

export default function RankSelection({
    formData,
    updateField,
    mastersRanks
}) {
    return (
        <div className="form-section">
            <h3>
                <i className="fas fa-crown"></i>
                High Elo Rank Selection
            </h3>

            <div className="rank-selection">

                {/* Current Rank */}
                <div className="form-group">
                    <label>Current Rank</label>
                    <select
                        value={formData.currentRank}
                        onChange={(e) => updateField('currentRank', e.target.value)}
                    >
                        {mastersRanks.map(rank => (
                            <option key={rank} value={rank}>
                                {rank}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Current LP */}
                <div className="form-group">
                    <label>Current LP</label>
                    <input
                        type="number"
                        min="0"
                        max="400"
                        value={formData.currentLP}
                        onChange={(e) =>
                            updateField('currentLP', parseInt(e.target.value) || 0)
                        }
                    />
                </div>

                {/* Arrow */}
                <div className="rank-arrow">
                    <i className="fas fa-arrow-up"></i>
                </div>

                {/* Desired Rank */}
                <div className="form-group">
                    <label>Desired Rank</label>
                    <select
                        value={formData.desiredRank}
                        onChange={(e) => updateField('desiredRank', e.target.value)}
                    >
                        {mastersRanks.map(rank => (
                            <option key={rank} value={rank}>
                                {rank}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Desired LP */}
                <div className="form-group">
                    <label>Desired LP</label>
                    <input
                        type="number"
                        min="0"
                        max="400"
                        value={formData.desiredLP}
                        onChange={(e) =>
                            updateField('desiredLP', parseInt(e.target.value) || 0)
                        }
                    />
                </div>

            </div>
        </div>
    );
}