import React, { useState, useMemo, useEffect } from 'react';
import StarRating from './StarRating';
import { 
    TENANT_REVIEWING_AGENCY_CRITERIA,
    LANDLORD_REVIEWING_TENANT_CRITERIA,
    TENANT_REVIEWING_LANDLORD_CRITERIA,
    LANDLORD_REVIEWING_AGENCY_CRITERIA,
    AGENCY_REVIEWING_TENANT_CRITERIA,
    AGENCY_REVIEWING_LANDLORD_CRITERIA,
} from '../constants';
import { ThumbsUpIcon } from './icons';
import { ProfileType } from '../types';

interface ReviewFlowProps {
  reviewerRole: ProfileType;
  onCancel: () => void;
}

type FormData = {
    reviewerRole: ProfileType;
    revieweeRole: ProfileType | null;
    contractStart: string;
    contractEnd: string;
    overallScore: number;
    criteriaScores: { [key: string]: number };
    title: string;
    comment: string;
    justification: string;
    isAnonymous: boolean;
};

const RoleButton: React.FC<{label: string, selected: boolean, onClick: () => void, disabled?: boolean}> = ({ label, selected, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        selected
          ? 'bg-primary text-white border-primary shadow-lg scale-105'
          : 'bg-background text-text-secondary border-gray-200 hover:border-primary hover:text-primary'
      }`}
    >
      <span className="font-semibold">{label}</span>
    </button>
  );

const ReviewFlow: React.FC<ReviewFlowProps> = ({ reviewerRole, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    reviewerRole: reviewerRole,
    revieweeRole: null,
    contractStart: '',
    contractEnd: '',
    overallScore: 0,
    criteriaScores: {},
    title: '',
    comment: '',
    justification: '',
    isAnonymous: false,
  });

  // FIX: Moved `reviewCriteria` declaration before `useEffect` to fix block-scoped variable error.
  const reviewCriteria = useMemo(() => {
    const { reviewerRole, revieweeRole } = formData;
    if (reviewerRole === ProfileType.Tenant && revieweeRole === ProfileType.Agency) return TENANT_REVIEWING_AGENCY_CRITERIA;
    if (reviewerRole === ProfileType.Tenant && revieweeRole === ProfileType.Landlord) return TENANT_REVIEWING_LANDLORD_CRITERIA;
    if (reviewerRole === ProfileType.Landlord && revieweeRole === ProfileType.Tenant) return LANDLORD_REVIEWING_TENANT_CRITERIA;
    if (reviewerRole === ProfileType.Landlord && revieweeRole === ProfileType.Agency) return LANDLORD_REVIEWING_AGENCY_CRITERIA;
    if (reviewerRole === ProfileType.Agency && revieweeRole === ProfileType.Tenant) return AGENCY_REVIEWING_TENANT_CRITERIA;
    if (reviewerRole === ProfileType.Agency && revieweeRole === ProfileType.Landlord) return AGENCY_REVIEWING_LANDLORD_CRITERIA;
    return [];
  }, [formData.reviewerRole, formData.revieweeRole]);

  // Initialize criteria scores when criteria change
  useEffect(() => {
      const initialScores = reviewCriteria.reduce((acc, crit) => ({...acc, [crit]: 0}), {});
      setFormData(prev => ({...prev, criteriaScores: initialScores}));
  }, [reviewCriteria]);
  
  const handleRoleChange = (roleType: 'revieweeRole', value: ProfileType) => {
    setFormData(prev => ({ ...prev, [roleType]: value }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({...prev, isAnonymous: e.target.checked }));
  }

  const handleScoreChange = (name: string, score: number) => {
    if (name === 'overallScore') {
      setFormData(prev => ({ ...prev, overallScore: score }));
    } else {
      setFormData(prev => ({
        ...prev,
        criteriaScores: {
          ...prev.criteriaScores,
          [name]: score
        }
      }));
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const getRevieweeOptions = (reviewer: ProfileType): ProfileType[] => {
      switch(reviewer) {
          case ProfileType.Tenant:
              return [ProfileType.Landlord, ProfileType.Agency];
          case ProfileType.Landlord:
              return [ProfileType.Tenant, ProfileType.Agency];
          case ProfileType.Agency:
              return [ProfileType.Tenant, ProfileType.Landlord];
          default:
              return [];
      }
  }
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Start Your Review</h2>
                <p className="text-text-secondary mb-6">Your profile is identified as <span className="font-semibold text-primary">{formData.reviewerRole}</span>. Now, please select who you are reviewing.</p>
                <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">I am reviewing a...</h3>
                    <div className="space-y-3 max-w-sm">
                        {getRevieweeOptions(formData.reviewerRole).map(role => (
                            <RoleButton
                                key={role}
                                label={role}
                                selected={formData.revieweeRole === role}
                                onClick={() => handleRoleChange('revieweeRole', role)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Contract Information</h2>
            <p className="text-text-secondary mb-6">Please provide the contract period with the <span className="font-semibold">{formData.revieweeRole?.toLowerCase()}</span>.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contractStart" className="block mb-2 font-semibold text-text-secondary">Contract Start</label>
                <input type="date" name="contractStart" id="contractStart" value={formData.contractStart} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="contractEnd" className="block mb-2 font-semibold text-text-secondary">Contract End</label>
                <input type="date" name="contractEnd" id="contractEnd" value={formData.contractEnd} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Your Review</h2>
            <p className="text-text-secondary mb-6">Assign an overall score and rate the specific criteria for the {formData.revieweeRole?.toLowerCase()}.</p>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg">
                <label className="block mb-2 text-lg font-semibold text-text-secondary">Overall Score</label>
                <StarRating rating={formData.overallScore} onRating={(score) => handleScoreChange('overallScore', score)} size="lg" />
              </div>
              {reviewCriteria.map(criterion => (
                 <div key={criterion} className="p-4 bg-background rounded-lg flex flex-col sm:flex-row justify-between sm:items-center">
                  <label className="block mb-2 sm:mb-0 text-lg font-semibold text-text-secondary">{criterion}</label>
                  <StarRating rating={formData.criteriaScores[criterion]} onRating={(score) => handleScoreChange(criterion, score)} size="lg" />
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Describe Your Experience</h2>
            <p className="text-text-secondary mb-6">Details help other people make better decisions.</p>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 font-semibold text-text-secondary">Review Title</label>
                <input type="text" name="title" id="title" placeholder="e.g., Great service and agility" value={formData.title} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2 font-semibold text-text-secondary">Your Experience</label>
                <textarea name="comment" id="comment" rows={6} placeholder="Tell us the details of your experience..." value={formData.comment} onChange={handleInputChange} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              {formData.overallScore > 0 && formData.overallScore <= 3 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label htmlFor="justification" className="block mb-2 font-semibold text-yellow-800">Justification for the low score (Required)</label>
                  <p className="text-sm text-yellow-700 mb-3">To ensure the quality of reviews, please explain the reasons for assigning a score of 3 stars or less.</p>
                  <textarea name="justification" id="justification" rows={4} placeholder="e.g., There were several maintenance issues that took too long to resolve..." value={formData.justification} onChange={handleInputChange} className="w-full p-2 bg-white border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>
              )}
            </div>
          </div>
        );
      case 5:
        return (
            <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Review and Confirm</h2>
                <p className="text-text-secondary mb-6">Check the details of your review before publishing.</p>
                <div className="space-y-4 p-6 bg-background rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-primary">{formData.title}</h3>
                    <div className="flex items-center gap-2">
                        <StarRating rating={formData.overallScore} mode="display" />
                        <span className="font-bold text-text-primary">{formData.overallScore.toFixed(1)}</span>
                    </div>
                    <p className="text-text-secondary italic">"{formData.comment}"</p>
                    
                    {formData.justification && (
                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                        <h4 className="font-semibold text-yellow-800">Justification for low score:</h4>
                        <p className="text-yellow-700">{formData.justification}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-text-secondary mb-2">Criteria Scores:</h4>
                        <ul className="list-disc list-inside text-text-secondary">
                            {Object.entries(formData.criteriaScores).map(([key, value]) => (
                                <li key={key}>{key}: <span className="font-bold">{value || 0} of 5</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleCheckboxChange} className="form-checkbox h-5 w-5 bg-gray-100 border-gray-300 text-primary focus:ring-primary rounded" />
                            <span className="text-text-secondary">Publish anonymously</span>
                        </label>
                    </div>
                </div>
            </div>
        );
      case 6:
        return (
            <div className="text-center py-10">
                <ThumbsUpIcon className="h-20 w-20 text-accent mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-text-primary mb-2">Review Submitted!</h2>
                <p className="text-text-secondary max-w-md mx-auto">Thank you for contributing to a more transparent and reliable real estate community. Your review helps thousands of people.</p>
            </div>
        )
      default:
        return null;
    }
  };

  const totalSteps = 5;
  const isNextDisabled = () => {
      if (step === 1) return !formData.revieweeRole;
      if (step === 2) return !formData.contractStart || !formData.contractEnd;
      if (step === 3) return formData.overallScore === 0 || Object.values(formData.criteriaScores).some(s => s === 0);
      if (step === 4) {
          if (!formData.title.trim() || !formData.comment.trim()) return true;
          if (formData.overallScore <= 3 && !formData.justification.trim()) return true;
          return false;
      }
      return false;
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        {step <= totalSteps && (
            <div className="flex-grow">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                </div>
            </div>
        )}
      </div>

      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      {step <= totalSteps && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={step === 1 ? onCancel : prevStep}
            className="bg-gray-200 text-text-secondary font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={nextStep}
            disabled={isNextDisabled()}
            className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-all disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Confirm and Submit' : 'Next'}
          </button>
        </div>
      )}
      {step > totalSteps && (
        <div className="text-center mt-8">
            <button
                onClick={onCancel}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all"
            >
                Back to Dashboard
            </button>
        </div>
      )}
    </div>
  );
};

export default ReviewFlow;