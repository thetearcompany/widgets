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
exports.PublicGallery = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("./types/styles");
// Przykładowe dane do testów
const MOCK_PUBLIC_PORTRAITS = [
    {
        id: '1',
        description: 'Dusza pełna pasji i kreatywności, która wyraża się poprzez sztukę i muzykę. Głęboko empatyczna i wrażliwa na piękno świata.',
        imageUrl: 'https://source.unsplash.com/random/800x600?abstract,art',
        style: styles_1.artStyles[0],
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        description: 'Mistyczna dusza poszukująca harmonii między nauką a duchowością. Fascynacja kosmosem i tajemnicami wszechświata.',
        imageUrl: 'https://source.unsplash.com/random/800x600?space,galaxy',
        style: styles_1.artStyles[1],
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
];
const PublicGallery = ({ onSelect }) => {
    const [portraits, setPortraits] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [selectedStyle, setSelectedStyle] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Symulacja ładowania danych z API
        const fetchPortraits = async () => {
            setIsLoading(true);
            try {
                // TODO: Zastąpić prawdziwym wywołaniem API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPortraits(MOCK_PUBLIC_PORTRAITS);
            }
            catch (error) {
                console.error('Błąd podczas ładowania galerii:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchPortraits();
    }, []);
    const filteredPortraits = selectedStyle
        ? portraits.filter(p => p.style.id === selectedStyle)
        : portraits;
    if (isLoading) {
        return (<div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Galeria Publiczna</h2>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedStyle(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedStyle === null
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Wszystkie
          </button>
          {styles_1.artStyles.map((style) => (<button key={style.id} onClick={() => setSelectedStyle(style.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedStyle === style.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {style.name}
            </button>))}
        </div>
      </div>

      {filteredPortraits.length === 0 ? (<div className="text-center text-gray-500 py-8">
          <p>Brak portretów w wybranej kategorii.</p>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortraits.map((portrait) => (<div key={portrait.id} onClick={() => onSelect(portrait)} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <img src={portrait.imageUrl} alt="Portret Duszy" className="w-full h-48 object-cover"/>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full mb-2">
                  {portrait.style.name}
                </span>
                <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                  {portrait.description}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(portrait.createdAt).toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>))}
        </div>)}
    </div>);
};
exports.PublicGallery = PublicGallery;
