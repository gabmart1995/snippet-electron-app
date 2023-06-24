
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
		const { setSnippetsNames, setSelectedSnippet } = STORE.getState();			
		
		// establecemos los valores en el estado
		api.readDir()
			.then(files => {
				const fileNames = files.map(file => file.name);
				setSnippetsNames(fileNames);
			});

		
		this.listenerFiles = STORE.subscribe(({ snippetNames }) => {    
			
			/** @type {HTMLDivElement | null} */
			const container = this.querySelector('#snippetNames');
			
			if (!container || snippetNames.length === 0) return;
			
			// actualizamos la lista de nombres del snippet
			container.innerHTML = '';
			container.innerHTML += snippetNames.map(snippetName => (`
				<div class="snippetName py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer">
					<h1>${snippetName}</h1>
				</div>
			`)).join('');


			// anadimos un evento por cada item y al hacer click actualizamos el estado
			const listSnippetItem = Array.from(container.querySelectorAll('.snippetName'));
			
			listSnippetItem.forEach(snippetItem => {

				snippetItem.addEventListener('click', () => {
					const snippetElement = snippetItem.querySelector('h1');

					if (!snippetElement) return;
					
					const snippetName = snippetElement.innerText; 
					setSelectedSnippet(snippetName);
				});
			});
		});
	}

	disconnectedCallback() {
		this.listenerFiles(); // deja de escuchar los eventos
	}
}

customElements.define('snippet-list-component', SnippetList);
	