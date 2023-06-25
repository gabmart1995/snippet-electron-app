
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
		fetch('components/snippet-item/snippet-item-component.html')
			.then(response => response.text())
			.then(text => {
				this.innerHTML = text;

				// eventos click
				const divElement = this.querySelector('div.snippetName');
				if (!divElement) return;
				
				divElement.addEventListener('click', () => this.dispatchSnippetName(this.name));
				
				const buttonDelete = this.querySelector('#delete-button');
				if (!buttonDelete) return;

				buttonDelete.addEventListener('click', this.deleteSnippet.bind(this));

				this.render();
			});
	}

	attributeChangedCallback( name, oldValue, newValue ) {
		// console.log({ name, oldValue, newValue });
		
		if (oldValue === newValue) return;

		this[name] = newValue;
		this.render();
	}

	render() {
		const titleElement = this.querySelector('h1');
		const divElement = this.querySelector('div.snippetName');

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

	async deleteSnippet(event) {
		event.stopPropagation();

		const { removeSnippetName } = STORE.getState();
		
		const result = window.confirm('Are you sure you want to delete this snippet?');
		if (!result) return;  

		// borramos el snippet y actualizamos el estado
		try {
			await api.deleteSnippet(this.name);
			removeSnippetName(this.name);

		} catch (error) {
			console.error(error);
		
		}
	}

	disconnectedCallback() {
		
		const divElement = this.querySelector('div.snippetName');
		if (!divElement) return;
		
		divElement.removeEventListener('click', () => this.dispatchSnippetName(this.name));
		
		const buttonDelete = this.querySelector('#delete-button');
		if (!buttonDelete) return;

		buttonDelete.removeEventListener('click', this.deleteSnippet.bind(this));	
	}
}

customElements.define('snippet-item-component', SnippetItem);
	