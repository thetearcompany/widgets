"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePortraitHistory = usePortraitHistory;
const react_1 = require("react");
const STORAGE_KEY = 'soul-portraits-history';
function usePortraitHistory() {
    const [portraits, setPortraits] = (0, react_1.useState)([]);
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
    const deletePortrait = (id) => {
        const updatedPortraits = portraits.filter(p => p.id !== id);
        setPortraits(updatedPortraits);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPortraits));
    };
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
