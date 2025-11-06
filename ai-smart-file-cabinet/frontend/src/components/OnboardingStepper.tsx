import React from 'react';

const steps = ['Model', 'Options', 'Review'] as const;

const OnboardingStepper: React.FC<{ current: number }> = ({ current }) => {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {steps.map((s, i) => (
        <div
          key={s}
          style={{
            padding: 8,
            border: i === current ? '2px solid #333' : '1px solid #ccc',
            borderRadius: 6,
            minWidth: 90,
            textAlign: 'center',
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default OnboardingStepper;
