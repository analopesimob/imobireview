import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ReviewFlow from './components/ReviewFlow';
import ValidationFlow from './components/ValidationFlow';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import { ProfileType } from './types';

type View = 'landing' | 'validation' | 'createReview' | 'auth' | 'profile' | 'about' | 'contact' | 'privacy' | 'terms';

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

  const handlePrivacyClick = () => {
      setCurrentView('privacy');
  }

  const handleTermsClick = () => {
      setCurrentView('terms');
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
      case 'privacy':
          return <PrivacyPolicyPage onAuthClick={handleAuthClick} onHomeClick={resetFlow} onAboutClick={handleAboutClick} onContactClick={handleContactClick} />;
      case 'terms':
          return <TermsOfServicePage onAuthClick={handleAuthClick} onHomeClick={resetFlow} onAboutClick={handleAboutClick} onTermsClick={handleTermsClick} />;
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
        resetFlow();
        return null;
      case 'landing':
      default:
        return <LandingPage 
            onStartValidation={handleStartValidation} 
            onAuthClick={handleAuthClick} 
            onViewProfile={handleViewProfile} 
            onAboutClick={handleAboutClick} 
            onContactClick={handleContactClick}
            onPrivacyClick={handlePrivacyClick}
            onTermsClick={handleTermsClick}
        />;
    }
  }

  return (
    <div className="min-h-screen bg-background-light text-primary font-display">
      {renderContent()}
    </div>
  );
};

export default App;