
class SnippetList extends HTMLElement {
	constructor() {
		super();
		this.listenerFiles = null;
	}

	/* props observed */
	static get observedAttributes() {
		return [];
	}

	connectedCallback() {
		fetch('components/snippet-list/snippet-list-component.html')
			.then(response => response.text())
			.then(text => {
				this.innerHTML = text;
				this.render();
			})
	}

	attributeChangedCallback( name, oldValue, newValue ) {
	}

	render() {
		api.readDir()
			.then(files => {
				const { setSnippetsNames } = STORE.getState();			

				// establecemos los valores en el estado
				const fileNames = files.map(file => file.name);
				setSnippetsNames(fileNames);
			});

		// listener
		this.listenerFiles = STORE.subscribe(state => {    
			
			/** @type {HTMLDivElement | null} */
			const container = document.querySelector('#snippetNames');
			
			if (!container || state.snippetNames.length === 0) return
			
			container.innerHTML = '';
			container.innerHTML += state.snippetNames.map(snippetName => (`
				<div><h1>${snippetName}</h1></div>
			`)).join('');
		});
	}

	disconnectedCallback() {
		this.listenerFiles(); // deja de escuchar los eventos
	}
}

customElements.define('snippet-list-component', SnippetList);
	