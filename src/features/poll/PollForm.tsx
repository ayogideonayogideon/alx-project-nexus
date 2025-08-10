import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createPoll } from './pollSlice';

interface PollFormProps {}

const PollForm: React.FC<PollFormProps> = () => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [error, setError] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const validate = () => {
    if (!question.trim()) {
      setError('Question is required.');
      return false;
    }
    if (options.length < 2) {
      setError('At least two options are required.');
      return false;
    }
    if (options.some((opt) => !opt.trim())) {
      setError('All options must be filled.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(createPoll({ question, options }));
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Poll</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Options:</label>
        {options.map((opt, idx) => (
          <div key={idx}>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => handleRemoveOption(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
      </div>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollForm;
