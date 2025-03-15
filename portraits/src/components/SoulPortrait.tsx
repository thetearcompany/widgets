import React, { useState } from 'react';
import { generateSoulPortrait, generateSoulImage } from '@/services/openai';
import { SoulPortraitResult } from './SoulPortraitResult';
import { PortraitHistory } from './PortraitHistory';
import { usePortraitHistory, SavedPortrait } from '../hooks/usePortraitHistory';
import { artStyles, ArtStyle } from '../types/styles';

export const SoulPortrait: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(artStyles[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SavedPortrait | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
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
    setShowHistory(false);
  };

  if (result) {
    return <SoulPortraitResult portrait={result} onReset={handleReset} />;
  }

  if (showHistory) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <PortraitHistory
          portraits={portraits}
          onDelete={deletePortrait}
          onClearAll={clearHistory}
          onSelect={setResult}
        />
        <button
          onClick={() => setShowHistory(false)}
          className="mt-6 w-full py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Powrót do tworzenia
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Portret Duszy</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
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
            onChange={(e) => setUserInput((e.target as any).value)}
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
  );
}; 