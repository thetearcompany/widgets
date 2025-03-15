import preactLogo from '../../assets/preact.svg';
import './style.css';
import { Button } from "@/components/ui/button"
export function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-svh">
			<Button>Click me</Button>
	  </div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
