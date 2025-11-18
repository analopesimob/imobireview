import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ReviewFlow from './components/ReviewFlow';
import ValidationFlow from './components/ValidationFlow';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import { ProfileType } from './types';

type View = 'landing' | 'validation' | 'createReview' | 'auth' | 'profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [validationData, setValidationData] = useState({
    revieweeIdentifier: '', // CPF/CNPJ of the one being reviewed
    reviewerRole: null as ProfileType | null,
  });

  const handleStartValidation = (identifier: string) => {
    setValidationData({ ...validationData, revieweeIdentifier: identifier });
    setCurrentView('validation');
  };

  const handleValidationSuccess = (role: ProfileType) => {
    setValidationData({ ...validationData, reviewerRole: role });
    setCurrentView('createReview');
  };

  const resetFlow = () => {
    setValidationData({ revieweeIdentifier: '', reviewerRole: null });
    setCurrentView('landing');
  }

  const handleAuthClick = () => {
      setCurrentView('auth');
  }

  const handleViewProfile = () => {
      setCurrentView('profile');
  }

  const renderContent = () => {
    switch (currentView) {
      case 'auth':
          return <AuthPage onLoginClick={resetFlow} />;
      case 'profile':
          return <ProfilePage onAuthClick={handleAuthClick} onStartValidation={handleStartValidation} onBack={resetFlow} />;
      case 'validation':
        return (
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ValidationFlow 
              revieweeIdentifier={validationData.revieweeIdentifier} 
              onValidationSuccess={handleValidationSuccess} 
              onCancel={resetFlow} 
            />
          </main>
        );
      case 'createReview':
        // The reviewer role must be set to proceed here
        if (validationData.reviewerRole) {
            return (
              <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ReviewFlow 
                  reviewerRole={validationData.reviewerRole} 
                  onCancel={resetFlow} 
                />
              </main>
            );
        }
        // Fallback to landing if state is inconsistent
        resetFlow();
        return null;
      case 'landing':
      default:
        return <LandingPage onStartValidation={handleStartValidation} onAuthClick={handleAuthClick} onViewProfile={handleViewProfile} />;
    }
  }

  return (
    <div className="min-h-screen bg-background-light text-primary font-display">
      {renderContent()}
    </div>
  );
};

export default App;