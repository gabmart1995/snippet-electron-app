
class SnippetItem extends HTMLElement {
	constructor() {
		super();
		this.name = '';
		this.snippet = '';
	}

	get _name() {
		return this.getAttribute('name') || '';
	}

	set _name(name) {
		this.setAttribute('name', name);
	}

	get _selectedSnippet() {
		return this.getAttribute('snippet') || '';
	}

	set _selectedSnippet(snippetName) {
		this.setAttribute('snippet', snippetName);
	}

	/* props observed */
	static get observedAttributes() {
		return ['name', 'snippet'];
	}

	connectedCallback() {
		const divElement = document.createElement('div');
		divElement.className = 'snippetName bg-zinc-950 py-2 px-4 hover:bg-sky-500 hover:cursor-pointer';

		// evento click
		divElement.addEventListener('click', () => this.dispatchSnippetName(this.name));

		const titleElement = document.createElement('h1');
		titleElement.innerText = this.name
		
		divElement.appendChild(titleElement);
		this.appendChild(divElement);

		this.render();
	}

	attributeChangedCallback( name, oldValue, newValue ) {
		// console.log({ name, oldValue, newValue });
		
		if (oldValue === newValue) return;

		this[name] = newValue;
		this.render();
	}

	render() {
		const titleElement = this.querySelector('h1');
		const divElement = this.querySelector('div');

		if (!titleElement || !divElement) return;

		titleElement.innerText = this.name;

		// selected item style
		if (this.name === this.snippet) {
			divElement.classList.replace('bg-zinc-950', 'bg-sky-500');
		
		} else {
			divElement.classList.replace('bg-sky-500', 'bg-zinc-950');
		} 
	}

	async dispatchSnippetName(snippetName) {
		
		// leemos el archivo
		try {
			const code = await api.readSnippet(snippetName);
			const customEvent = new CustomEvent('snippet', {
				bubbles: true,
				cancelable: true,
				detail: {
					name: snippetName,
					code
				},
			});
	
			this.dispatchEvent(customEvent);

		} catch (error) {
			console.error(error);
		
		}
	}

	disconnectedCallback() {
	}
}

customElements.define('snippet-item-component', SnippetItem);
	