"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePortraitHistory = usePortraitHistory;
const react_1 = require("react");
const STORAGE_KEY = 'soul-portraits-history';
function usePortraitHistory() {
    const [portraits, setPortraits] = (0, react_1.useState)([]);
    // Wczytaj historię przy montowaniu komponentu
    (0, react_1.useEffect)(() => {
        const savedPortraits = localStorage.getItem(STORAGE_KEY);
        if (savedPortraits) {
            try {
                setPortraits(JSON.parse(savedPortraits));
            }
            catch (error) {
                console.error('Błąd podczas wczytywania historii:', error);
            }
        }
    }, []);
    // Zapisz nowy portret
    const savePortrait = (portrait) => {
        const newPortrait = {
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
    const deletePortrait = (id) => {
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
