import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Home.Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 bg-black/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Blockchain Bet Brasil. {t('allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;