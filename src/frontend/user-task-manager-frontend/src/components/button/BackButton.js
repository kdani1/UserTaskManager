import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton({ handleCustomBack }) {
  const navigate = useNavigate();

  const goBack = () => {
    // If a custom back handler is provided, use it
    if (handleCustomBack) {
      handleCustomBack();
    } else {
      // Otherwise, just navigate back
      navigate(-1);
    }
  };

  return (
    <button onClick={goBack} className="btn btn-secondary me-2">
      Back
    </button>
  );
}

export default BackButton;