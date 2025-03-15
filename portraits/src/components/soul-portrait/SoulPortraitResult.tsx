import React, { useRef } from 'react';
import { SavedPortrait } from './hooks/usePortraitHistory';
import { generatePortraitPDF } from './services/pdf';

interface SoulPortraitResultProps {
  portrait: SavedPortrait;
  onReset: () => void;
}

export const SoulPortraitResult: React.FC<SoulPortraitResultProps> = ({ portrait, onReset }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const text = encodeURIComponent('Odkryj swój Portret Duszy! 🎨✨');
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleDownload = async () => {
    if (!portrait.imageUrl) return;
    
    try {
      const response = await fetch(portrait.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portret-duszy.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Błąd podczas pobierania obrazu:', error);
    }
  };

  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    try {
      await generatePortraitPDF(portrait, contentRef.current);
    } catch (error) {
      console.error('Błąd podczas generowania PDF:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" ref={contentRef}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Twój Portret Duszy</h1>
        <p className="text-gray-600">Styl: {portrait.style.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={portrait.imageUrl}
            alt="Portret Duszy"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Opis Twojej Duszy</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{portrait.description}</p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Wygenerowano: {new Date(portrait.createdAt).toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={handleDownload}
          className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Pobierz Obraz
        </button>
        <button
          onClick={handleExportPDF}
          className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Eksportuj do PDF
        </button>
        <button
          onClick={() => window.print()}
          className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Drukuj
        </button>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => handleShare('facebook')}
          className="text-blue-600 hover:text-blue-700"
        >
          Udostępnij na Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="text-blue-400 hover:text-blue-500"
        >
          Udostępnij na Twitter
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="text-blue-800 hover:text-blue-900"
        >
          Udostępnij na LinkedIn
        </button>
      </div>

      <button
        onClick={onReset}
        className="mt-8 w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        Stwórz Nowy Portret
      </button>
    </div>
  );
}; 