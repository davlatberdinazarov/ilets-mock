import React from 'react';

export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <div className="question">
      <div><strong>Question:</strong> {question.text}</div>
      <div className="options">
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            className={["option", selected === idx ? 'selected' : ''].join(' ')}
            onClick={() => onSelect(idx)}
          >
            {String.fromCharCode(65 + idx)}. {opt}
          </div>
        ))}
      </div>
    </div>
  );
}