
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

		
		// se subscribe unicamente a snippetNames
		this.listenerFiles = STORE.subscribe((state, prevState) => {    
			
			/** @type {HTMLDivElement | null} */
			const container = this.querySelector('#snippetNames');
			
			if (!container || state.snippetNames.length === 0) return;
			
			// actualiza la lista si el estado y el anterior son diferentes
			if (state.snippetNames === prevState.snippetNames) return;

			// actualizamos la lista de nombres del snippet
			container.innerHTML = '';
			container.innerHTML += state.snippetNames.map(snippetName => (`
				<snippet-item-component name="${snippetName}"></snippet-item-component>
			`)).join('')

			// anadimos un evento por cada item y al hacer click actualizamos el estado
			const listSnippetItem = Array.from(container.querySelectorAll('snippet-item-component'));
			
			listSnippetItem.forEach((snippetItem, _, items) => {			
				
				snippetItem.addEventListener('snippet', event => {
					const { snippetName } = event.detail; 
					setSelectedSnippet(snippetName);

					const { selectedSnippet } = STORE.getState();
					snippetItem._selectedSnippet = selectedSnippet;

					this.changeOptionSelected(items, selectedSnippet);	
				});
			});
		});
	}

	changeOptionSelected(items, selectedSnippet) {
		items
			.map(item => ({
				element: item,
				snippetName: item._name
			}))
			.forEach(item => {	
				if (item.snippetName !== selectedSnippet) {
					item.element._selectedSnippet = '';
				}
			});
	}

	disconnectedCallback() {
		this.listenerFiles(); // deja de escuchar los eventos
	}
}

customElements.define('snippet-list-component', SnippetList);
	