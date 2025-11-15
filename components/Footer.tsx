import React from 'react';
import { FacebookIcon, TwitterIcon, LinkedInIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-col gap-8 px-5 py-10 text-center bg-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#">Privacy Policy</a>
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#">Terms of Service</a>
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#">Contact Us</a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                <a className="text-grey-soft hover:text-primary" href="#">
                    <FacebookIcon />
                </a>
                <a className="text-grey-soft hover:text-primary" href="#">
                    <TwitterIcon />
                </a>
                <a className="text-grey-soft hover:text-primary" href="#">
                    <LinkedInIcon />
                </a>
            </div>
            <p className="text-grey-soft text-sm font-normal leading-normal">© 2024 ImobiReview. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
