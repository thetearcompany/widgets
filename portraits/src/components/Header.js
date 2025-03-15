"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const preact_iso_1 = require("preact-iso");
function Header() {
    const { url } = (0, preact_iso_1.useLocation)();
    return (<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>
			</nav>
		</header>);
}
