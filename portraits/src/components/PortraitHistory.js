"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortraitHistory = void 0;
const react_1 = __importDefault(require("react"));
const PortraitHistory = ({ portraits, onDelete, onClearAll, onSelect, }) => {
    if (portraits.length === 0) {
        return (<div className="text-center text-gray-500 py-8">
        <p>Twoja historia portretów jest pusta.</p>
        <p className="text-sm">Stwórz swój pierwszy portret duszy!</p>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Historia portretów ({portraits.length})
        </h2>
        <button onClick={onClearAll} className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200">
          Wyczyść historię
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portraits.map((portrait) => (<div key={portrait.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {portrait.imageUrl && (<div className="relative aspect-video">
                <img src={portrait.imageUrl} alt="Portret Duszy" className="w-full h-full object-cover cursor-pointer" onClick={() => onSelect(portrait)}/>
                <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                  {portrait.style.name}
                </span>
              </div>)}
            
            <div className="p-4">
              <p className="text-gray-600 text-sm line-clamp-3">
                {portrait.description}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(portrait.createdAt).toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })}
                </span>
                
                <button onClick={() => onDelete(portrait.id)} className="text-red-600 hover:text-red-700 transition-colors duration-200" aria-label="Usuń portret">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>))}
      </div>
    </div>);
};
exports.PortraitHistory = PortraitHistory;
