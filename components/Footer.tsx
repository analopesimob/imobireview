import React from 'react';
import {
	Facebook,
	Instagram,
	Linkedin
} from "lucide-react";

interface FooterProps {
    onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
    return (
        <footer className="flex flex-col gap-8 px-5 py-10 text-center bg-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#">Política de Privacidade</a>
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#">Termos de Serviço</a>
                <a className="text-grey-soft hover:text-primary text-sm font-medium" href="#" onClick={(e) => { e.preventDefault(); onContactClick && onContactClick(); }}>Contact Us</a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                <a className="text-grey-soft hover:text-primary" href="#">
                    <Facebook />
                </a>
                <a className="text-grey-soft hover:text-primary" href="#">
                    <Instagram />
                </a>
                <a className="text-grey-soft hover:text-primary" href="#">
                    <Linkedin />
                </a>
            </div>
            <p className="text-grey-soft text-sm font-normal leading-normal">© 2024 ImobiReview. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
