import { useState, useEffect } from 'react';
import { ArtStyle } from '../types/styles';

export interface SavedPortrait {
  id: string;
  description: string;
  imageUrl: string;
  style: ArtStyle;
  createdAt: string;
}

const STORAGE_KEY = 'soul-portraits-history';

export function usePortraitHistory() {
  const [portraits, setPortraits] = useState<SavedPortrait[]>([]);

  // Wczytaj historię przy montowaniu komponentu
  useEffect(() => {
    const savedPortraits = localStorage.getItem(STORAGE_KEY);
    if (savedPortraits) {
      try {
        setPortraits(JSON.parse(savedPortraits));
      } catch (error) {
        console.error('Błąd podczas wczytywania historii:', error);
      }
    }
  }, []);

  // Zapisz nowy portret
  const savePortrait = (portrait: Omit<SavedPortrait, 'id' | 'createdAt'>) => {
    const newPortrait: SavedPortrait = {
      ...portrait,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedPortraits = [newPortrait, ...portraits];
    setPortraits(updatedPortraits);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPortraits));
    return newPortrait;
  };

  // Usuń portret
  const deletePortrait = (id: string) => {
    const updatedPortraits = portraits.filter(p => p.id !== id);
    setPortraits(updatedPortraits);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPortraits));
  };

  // Wyczyść całą historię
  const clearHistory = () => {
    setPortraits([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    portraits,
    savePortrait,
    deletePortrait,
    clearHistory,
  };
} 