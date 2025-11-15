import React, { useState, useCallback } from 'react';
import { ProfileType } from '../types';
import { UploadCloudIcon, CheckCircleIcon } from './icons';

interface ValidationFlowProps {
  revieweeIdentifier: string;
  onValidationSuccess: (role: ProfileType) => void;
  onCancel: () => void;
}

const RoleButton: React.FC<{label: string, selected: boolean, onClick: () => void}> = ({ label, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'bg-primary text-white border-primary shadow-lg scale-105'
          : 'bg-background text-text-secondary border-gray-200 hover:border-primary hover:text-primary'
      }`}
    >
      <span className="font-semibold">{label}</span>
    </button>
);

const FileUploader: React.FC<{onFileUpload: (file: File) => void}> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFile = (file: File | null) => {
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            setUploadedFile(file);
            onFileUpload(file);
        } else {
            alert('Please upload a valid file (PDF, JPG, PNG).');
        }
    }

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    }

    if (uploadedFile) {
        return (
            <div className="flex items-center justify-center text-center p-8 rounded-lg border-2 border-dashed border-accent bg-green-50 text-accent">
                <CheckCircleIcon className="w-8 h-8 mr-4" />
                <div>
                    <p className="font-semibold">{uploadedFile.name}</p>
                    <p className="text-sm">File uploaded successfully!</p>
                </div>
            </div>
        )
    }

    return (
        <div 
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={`relative p-8 rounded-lg border-2 border-dashed transition-colors duration-300 ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 bg-background'}`}
        >
            <input 
                type="file" 
                id="file-upload" 
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={onFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center text-center cursor-pointer">
                <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="font-semibold text-text-primary">Drag-and-drop your contract here</p>
                <p className="text-text-secondary text-sm">or click to browse</p>
                <p className="text-xs text-gray-500 mt-2">PDF, JPG, or PNG accepted</p>
            </label>
        </div>
    )
}

const ValidationFlow: React.FC<ValidationFlowProps> = ({ revieweeIdentifier, onValidationSuccess, onCancel }) => {
    const [reviewerRole, setReviewerRole] = useState<ProfileType | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!reviewerRole || !uploadedFile) return;

        setIsSubmitting(true);
        // Simulate a delay for document validation
        setTimeout(() => {
            onValidationSuccess(reviewerRole);
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-text-primary">Prove Your Connection</h1>
            <p className="text-text-secondary mt-2 mb-6">
                To ensure all reviews are authentic, please confirm your role and upload a proof of your contractual relationship with <span className="font-semibold text-primary">{revieweeIdentifier}</span>.
            </p>

            <div className="space-y-8">
                {/* Step 1: Identify your role */}
                <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-3">1. Identify Your Role</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[ProfileType.Tenant, ProfileType.Landlord, ProfileType.Agency].map(role => (
                            <RoleButton
                                key={role}
                                label={role}
                                selected={reviewerRole === role}
                                onClick={() => setReviewerRole(role)}
                            />
                        ))}
                    </div>
                </div>

                {/* Step 2: Upload Document */}
                <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-3">2. Upload Contract Document</h2>
                    <FileUploader onFileUpload={(file) => setUploadedFile(file)} />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={onCancel}
                    className="bg-gray-200 text-text-secondary font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!reviewerRole || !uploadedFile || isSubmitting}
                    className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-opacity-90 transition-all disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Validating...' : 'Proceed to Review'}
                </button>
            </div>
        </div>
    );
};

export default ValidationFlow;
