"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = Home;
const SoulPortrait_1 = require("../../components/soul-portrait/SoulPortrait");
require("./style.css");
function Home() {
    return (<div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-indigo-900 mb-4">
						Odkryj Swoją Duszę
					</h1>
					<p className="text-xl text-indigo-600">
						Pozwól sztucznej inteligencji stworzyć unikalny portret Twojej duszy
					</p>
				</div>
				
				<SoulPortrait_1.SoulPortrait />
			</div>
		</div>);
}
function Resource(props) {
    return (<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>);
}
