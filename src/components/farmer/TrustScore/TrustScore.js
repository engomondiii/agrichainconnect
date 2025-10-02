import React from 'react';
import './TrustScore.css';

const TrustScore = ({ score = 0, showDetails = false }) => {
  // Normalize score to 0-100 if it's out of 1000
  const normalizedScore = score > 100 ? Math.round((score / 1000) * 100) : score;
  
  // Determine score category
  const getScoreCategory = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'excellent' };
    if (score >= 60) return { label: 'Good', color: 'good' };
    if (score >= 40) return { label: 'Fair', color: 'fair' };
    return { label: 'Building', color: 'building' };
  };

  const category = getScoreCategory(normalizedScore);

  // Mock breakdown data - replace with actual data from props
  const breakdown = {
    deliveries: { score: 85, weight: 40, description: 'Successful deliveries' },
    quality: { score: 75, weight: 25, description: 'Quality ratings from buyers' },
    timeliness: { score: 90, weight: 20, description: 'On-time delivery rate' },
    communication: { score: 80, weight: 15, description: 'Communication & responsiveness' }
  };

  return (
    <div className="trust-score">
      <div className={`trust-score-display ${category.color}`}>
        <div className="score-circle">
          <svg viewBox="0 0 100 100">
            <circle
              className="score-circle-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="score-circle-progress"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDasharray: `${normalizedScore * 2.827}, 282.7`
              }}
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{normalizedScore}</span>
            <span className="score-max">/100</span>
          </div>
        </div>
        <div className="score-label">
          <span className="score-category">{category.label}</span>
          <span className="score-title">Trust Score</span>
        </div>
      </div>

      {showDetails && (
        <div className="trust-score-details">
          <h3>Score Breakdown</h3>
          <div className="score-breakdown">
            {Object.entries(breakdown).map(([key, data]) => (
              <div key={key} className="breakdown-item">
                <div className="breakdown-header">
                  <span className="breakdown-label">{data.description}</span>
                  <span className="breakdown-score">{data.score}%</span>
                </div>
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill" 
                    style={{ width: `${data.score}%` }}
                  />
                </div>
                <span className="breakdown-weight">{data.weight}% of total score</span>
              </div>
            ))}
          </div>

          <div className="score-tips">
            <h4>How to Improve</h4>
            <ul>
              <li>Complete deliveries on time and in full</li>
              <li>Maintain high crop quality standards</li>
              <li>Respond quickly to buyer messages</li>
              <li>Get positive reviews from buyers</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustScore;