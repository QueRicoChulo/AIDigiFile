import React from 'react';
import { ConfigProvider } from '../contexts/ConfigContext';
import OnboardingStepper from '../components/OnboardingStepper';
import ModelConfigForm from '../components/ModelConfigForm';
import CustomOptionsForm from '../components/CustomOptionsForm';
import ReviewSettings from '../components/ReviewSettings';

const OnboardingInner: React.FC = () => {
  const [step, setStep] = React.useState(0);

  return (
    <div style={{ padding: 16 }}>
      <h1>Onboarding & Configuration</h1>
      <OnboardingStepper current={step} />

      <div style={{ marginTop: 16 }}>
        {step === 0 && <ModelConfigForm onNext={() => setStep(1)} />}
        {step === 1 && (
          <CustomOptionsForm onNext={() => setStep(2)} onBack={() => setStep(0)} />
        )}
        {step === 2 && <ReviewSettings onBack={() => setStep(1)} />}
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  return (
    <ConfigProvider>
      <OnboardingInner />
    </ConfigProvider>
  );
};

export default Onboarding;
