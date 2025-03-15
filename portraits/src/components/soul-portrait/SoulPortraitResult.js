"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoulPortraitResult = void 0;
const react_1 = __importStar(require("react"));
const pdf_1 = require("./services/pdf");
const SoulPortraitResult = ({ portrait, onReset }) => {
    const contentRef = (0, react_1.useRef)(null);
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
    const handleExportPDF = async () => {
        if (!contentRef.current)
            return;
        try {
            await (0, pdf_1.generatePortraitPDF)(portrait, contentRef.current);
        }
        catch (error) {
            console.error('Błąd podczas generowania PDF:', error);
        }
    };
    return (<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" ref={contentRef}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Twój Portret Duszy</h1>
        <p className="text-gray-600">Styl: {portrait.style.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <img src={portrait.imageUrl} alt="Portret Duszy" className="w-full rounded-lg shadow-lg"/>
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
        <button onClick={handleDownload} className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          Pobierz Obraz
        </button>
        <button onClick={handleExportPDF} className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          Eksportuj do PDF
        </button>
        <button onClick={() => window.print()} className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          Drukuj
        </button>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-700">
          Udostępnij na Facebook
        </button>
        <button onClick={() => handleShare('twitter')} className="text-blue-400 hover:text-blue-500">
          Udostępnij na Twitter
        </button>
        <button onClick={() => handleShare('linkedin')} className="text-blue-800 hover:text-blue-900">
          Udostępnij na LinkedIn
        </button>
      </div>

      <button onClick={onReset} className="mt-8 w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
        Stwórz Nowy Portret
      </button>
    </div>);
};
exports.SoulPortraitResult = SoulPortraitResult;
