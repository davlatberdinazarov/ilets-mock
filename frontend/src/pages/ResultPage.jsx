import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation();
  const result = state || null;
  if (!result) return (
    <div>
      <p>Natija topilmadi. Avval test topshiring.</p>
      <Link to="/test" className="btn">Start Test</Link>
    </div>
  );

  const pct = Math.round((result.score / result.total) * 100);
  return (
    <div>
      <h3>Result</h3>
      <p>
        Score: <strong>{result.score}</strong> / {result.total} ({pct}%)
      </p>
      <div>
        {result.details?.map((d, i) => (
          <div key={i} className="result-item">
            <span className="badge">Q{i + 1}</span>{' '}
            {d.correct ? (
              <span className="success">Correct ✓</span>
            ) : (
              <span className="error">Wrong ✗</span>
            )}
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              Selected: {String.fromCharCode(65 + d.selectedIndex)} • Correct: {String.fromCharCode(65 + d.correctIndex)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/test" className="btn">Retake</Link>
      </div>
    </div>
  );
}