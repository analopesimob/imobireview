import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ReviewFlow from './components/ReviewFlow';
import ValidationFlow from './components/ValidationFlow';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { ProfileType } from './types';

type View = 'landing' | 'validation' | 'createReview' | 'auth' | 'profile'| 'about'| 'contact';

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

  const handleAboutClick = () => {
      setCurrentView('about');
  }

  const handleContactClick = () => {
      setCurrentView('contact');
  }

  const renderContent = () => {
    switch (currentView) {
      case 'auth':
          return <AuthPage onLoginClick={resetFlow} />;
      case 'profile':
          return <ProfilePage onAuthClick={handleAuthClick} onStartValidation={handleStartValidation} onBack={resetFlow} onAboutClick={handleAboutClick} />;
      case 'about':
          return <AboutPage onAuthClick={handleAuthClick} onHomeClick={resetFlow} />;
	  case 'contact':
		  return <ContactPage onAuthClick={handleAuthClick} onHomeClick={resetFlow} onAboutClick={handleAboutClick} />;
      case 'validation':
        return (
          <main>
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
              <main>
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
        return <LandingPage onStartValidation={handleStartValidation} onAuthClick={handleAuthClick} onViewProfile={handleViewProfile} onAboutClick={handleAboutClick} onContactClick={handleContactClick} />;
    }
  }

  return (
    <div className="min-h-screen text-primary font-display">

      {renderContent()}
    </div>
  );
};

export default App;