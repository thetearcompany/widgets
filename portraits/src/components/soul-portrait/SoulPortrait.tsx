import React, { useState } from 'react';
import { generateSoulPortrait, generateSoulImage } from './services/openai';
import { SoulPortraitResult } from './SoulPortraitResult';
import { PortraitHistory } from './PortraitHistory';
import { PublicGallery } from './PublicGallery';
import { usePortraitHistory, SavedPortrait } from './hooks/usePortraitHistory';
import { artStyles, ArtStyle } from './types/styles';

type View = 'create' | 'history' | 'gallery';

export const SoulPortrait: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(artStyles[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SavedPortrait | null>(null);
  const [currentView, setCurrentView] = useState<View>('create');
  
  const { portraits, savePortrait, deletePortrait, clearHistory } = usePortraitHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const soulPortrait = await generateSoulPortrait(userInput);
      const imageUrl = await generateSoulImage(soulPortrait.imagePrompt, selectedStyle);
      
      const savedPortrait = savePortrait({
        description: soulPortrait.description,
        imageUrl,
        style: selectedStyle,
      });

      setResult(savedPortrait);
      setUserInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentView('create');
  };

  if (result) {
    return <SoulPortraitResult portrait={result} onReset={handleReset} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setCurrentView('create')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentView === 'create'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Stwórz Portret
        </button>
        <button
          onClick={() => setCurrentView('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentView === 'history'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Moje Portrety ({portraits.length})
        </button>
        <button
          onClick={() => setCurrentView('gallery')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentView === 'gallery'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Galeria Publiczna
        </button>
      </div>

      {currentView === 'create' && (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Stwórz Portret Duszy
          </h1>

          <p className="text-gray-600 mb-6 text-center">
            Opisz swoją osobowość, wartości i przekonania, a AI stworzy unikalny portret Twojej duszy.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wybierz styl artystyczny:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedStyle.id === style.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{style.name}</h3>
                    <p className="text-sm text-gray-500">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Twój opis:
              </label>
              <textarea
                id="description"
                value={userInput}
                onChange={(e) => setUserInput((e.target as HTMLTextAreaElement).value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Opisz siebie... (min. 100 znaków)"
                minLength={100}
                required
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className={`w-full py-3 px-6 bg-indigo-600 text-white rounded-lg transition-colors duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Tworzenie portretu...' : 'Stwórz Portret Duszy'}
            </button>
          </form>
        </div>
      )}

      {currentView === 'history' && (
        <PortraitHistory
          portraits={portraits}
          onDelete={deletePortrait}
          onClearAll={clearHistory}
          onSelect={setResult}
        />
      )}

      {currentView === 'gallery' && (
        <PublicGallery onSelect={setResult} />
      )}
    </div>
  );
}; 