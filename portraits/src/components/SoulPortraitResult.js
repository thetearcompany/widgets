"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoulPortraitResult = void 0;
const react_1 = __importDefault(require("react"));
const SoulPortraitResult = ({ portrait, onReset }) => {
    const handleShare = async (platform) => {
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
        if (!portrait.imageUrl)
            return;
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
        }
        catch (error) {
            console.error('Błąd podczas pobierania obrazu:', error);
        }
    };
    return (<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Twój Portret Duszy</h2>
      
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
          Styl: {portrait.style.name}
        </span>
      </div>
      
      {portrait.imageUrl && (<div className="mb-6">
          <img src={portrait.imageUrl} alt="Portret Duszy" className="w-full h-64 object-cover rounded-lg shadow-md"/>
        </div>)}
      
      <div className="prose prose-indigo max-w-none mb-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {portrait.description}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={handleDownload} className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          <span className="mr-2">💾</span>
          Pobierz obraz
        </button>
        
        <button onClick={() => window.print()} className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          <span className="mr-2">🖨️</span>
          Drukuj
        </button>
      </div>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => handleShare('facebook')} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200" aria-label="Udostępnij na Facebook">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
        </button>
        
        <button onClick={() => handleShare('twitter')} className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors duration-200" aria-label="Udostępnij na Twitter">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.58v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
          </svg>
        </button>
        
        <button onClick={() => handleShare('linkedin')} className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200" aria-label="Udostępnij na LinkedIn">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
      </div>
      
      <div className="text-center">
        <button onClick={onReset} className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
          <span className="mr-2">↺</span>
          Stwórz nowy portret
        </button>
      </div>
    </div>);
};
exports.SoulPortraitResult = SoulPortraitResult;
