"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const preset_vite_1 = __importDefault(require("@preact/preset-vite"));
const node_path_1 = __importDefault(require("node:path"));
const vite_2 = __importDefault(require("@tailwindcss/vite"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, preset_vite_1.default)({
            prerender: {
                enabled: true,
                renderTarget: '#app',
                additionalPrerenderRoutes: ['/404'],
                previewMiddlewareEnabled: true,
                previewMiddlewareFallback: '/404',
            },
        }),
        (0, vite_2.default)()
    ],
    resolve: {
        alias: {
            "@": node_path_1.default.resolve(__dirname, "./src"),
        },
    },
});
