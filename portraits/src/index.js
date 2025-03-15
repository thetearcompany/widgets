"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
exports.prerender = prerender;
const preact_iso_1 = require("preact-iso");
const Header_jsx_1 = require("./components/Header.jsx");
const index_jsx_1 = require("./pages/Home/index.jsx");
const _404_jsx_1 = require("./pages/_404.jsx");
require("./style.css");
function App() {
    return (<preact_iso_1.LocationProvider>
			<Header_jsx_1.Header />
			<main>
				<preact_iso_1.Router>
					<preact_iso_1.Route path="/" component={index_jsx_1.Home}/>
					<preact_iso_1.Route default component={_404_jsx_1.NotFound}/>
				</preact_iso_1.Router>
			</main>
		</preact_iso_1.LocationProvider>);
}
if (typeof window !== 'undefined') {
    (0, preact_iso_1.hydrate)(<App />, document.getElementById('app'));
}
async function prerender(data) {
    return await (0, preact_iso_1.prerender)(<App {...data}/>);
}
