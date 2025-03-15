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
exports.SoulPortrait = void 0;
const react_1 = __importStar(require("react"));
const openai_1 = require("@/services/openai");
const SoulPortraitResult_1 = require("./SoulPortraitResult");
const PortraitHistory_1 = require("./PortraitHistory");
const usePortraitHistory_1 = require("../hooks/usePortraitHistory");
const styles_1 = require("../types/styles");
const SoulPortrait = () => {
    const [userInput, setUserInput] = (0, react_1.useState)('');
    const [selectedStyle, setSelectedStyle] = (0, react_1.useState)(styles_1.artStyles[0]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [result, setResult] = (0, react_1.useState)(null);
    const [showHistory, setShowHistory] = (0, react_1.useState)(false);
    const { portraits, savePortrait, deletePortrait, clearHistory } = (0, usePortraitHistory_1.usePortraitHistory)();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const soulPortrait = await (0, openai_1.generateSoulPortrait)(userInput);
            const imageUrl = await (0, openai_1.generateSoulImage)(soulPortrait.imagePrompt, selectedStyle);
            const savedPortrait = savePortrait({
                description: soulPortrait.description,
                imageUrl,
                style: selectedStyle,
            });
            setResult(savedPortrait);
            setUserInput('');
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleReset = () => {
        setResult(null);
        setShowHistory(false);
    };
    if (result) {
        return <SoulPortraitResult_1.SoulPortraitResult portrait={result} onReset={handleReset}/>;
    }
    if (showHistory) {
        return (<div className="max-w-4xl mx-auto p-6">
        <PortraitHistory_1.PortraitHistory portraits={portraits} onDelete={deletePortrait} onClearAll={clearHistory} onSelect={setResult}/>
        <button onClick={() => setShowHistory(false)} className="mt-6 w-full py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
          Powrót do tworzenia
        </button>
      </div>);
    }
    return (<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Portret Duszy</h1>
        <button onClick={() => setShowHistory(true)} className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
          Historia ({portraits.length})
        </button>
      </div>

      <p className="text-gray-600 mb-6 text-center">
        Opisz swoją osobowość, wartości i przekonania, a AI stworzy unikalny portret Twojej duszy.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wybierz styl artystyczny:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {styles_1.artStyles.map((style) => (<button key={style.id} type="button" onClick={() => setSelectedStyle(style)} className={`p-4 rounded-lg border-2 text-left transition-all ${selectedStyle.id === style.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'}`}>
                <h3 className="font-medium text-gray-900">{style.name}</h3>
                <p className="text-sm text-gray-500">{style.description}</p>
              </button>))}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Twój opis:
          </label>
          <textarea id="description" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Opisz siebie... (min. 100 znaków)" minLength={100} required disabled={isLoading}/>
        </div>
        
        {error && (<div className="text-red-500 text-sm mt-2">
            {error}
          </div>)}
        
        <button type="submit" className={`w-full py-3 px-6 bg-indigo-600 text-white rounded-lg transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`} disabled={isLoading}>
          {isLoading ? 'Tworzenie portretu...' : 'Stwórz Portret Duszy'}
        </button>
      </form>
    </div>);
};
exports.SoulPortrait = SoulPortrait;
