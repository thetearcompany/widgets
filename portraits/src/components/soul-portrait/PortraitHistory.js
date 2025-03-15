"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortraitHistory = void 0;
const react_1 = __importDefault(require("react"));
const PortraitHistory = ({ portraits, onDelete, onClearAll, onSelect, }) => {
    if (portraits.length === 0) {
        return (<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Historia jest pusta</h2>
        <p className="text-gray-600">
          Stwórz swój pierwszy portret duszy, aby zobaczyć go tutaj.
        </p>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">Moje Portrety Duszy</h2>
        <button onClick={onClearAll} className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors duration-200">
          Wyczyść historię
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portraits.map((portrait) => (<div key={portrait.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <img src={portrait.imageUrl} alt="Portret Duszy" className="w-full h-48 object-cover cursor-pointer" onClick={() => onSelect(portrait)}/>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                  {portrait.style.name}
                </span>
                <button onClick={() => onDelete(portrait.id)} className="text-red-500 hover:text-red-600" aria-label="Usuń portret">
                  ✕
                </button>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                {portrait.description}
              </p>
              <p className="text-gray-500 text-xs">
                {new Date(portrait.createdAt).toLocaleDateString('pl-PL')}
              </p>
            </div>
          </div>))}
      </div>
    </div>);
};
exports.PortraitHistory = PortraitHistory;
