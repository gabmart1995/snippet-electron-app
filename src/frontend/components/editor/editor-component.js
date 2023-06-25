class Editor extends HTMLElement {
	constructor() {
		super();
		this.editor = null;
		this.editorListener = null;
		this.container = null;
	}

	/* props observed */
	static get observedAttributes() {
		return [];
	}

	connectedCallback() {
		fetch('components/editor/editor-component.html')
			.then(response => response.text())
			.then(text => {
				this.innerHTML = text;
				this.render();
			})
		}
		
	// configuramos require global para el path de monaco
	createEditor(value = '') {
		require(['vs/editor/editor.main'], () => {
			this.editor = monaco.editor.create(this.container, {
				value,
				language: 'javascript',
				theme: 'vs-dark',
				fontSize: 18,
			});

			// anadimos el evento de captura de teclado
			this.container.addEventListener('keyup', event => {					
				if (event.ctrlKey && event.key === 's') { // salva el archivo Ctrl + S 
					const fileContent = this.editor.getValue(); 
					console.log(fileContent);
				}
			});
		});
	}
	
	attributeChangedCallback( name, oldValue, newValue ) {
	}
	
	render() {
		this.container = this.querySelector('#container');
		
		// nos subscribimos a selected snippet
		this.editorListener = STORE.subscribe((state, prevState) => {
			
			// console.log({ state, prevState });

			if (!this.container || state.selectedSnippet === prevState.selectedSnippet) return;
			
			if (state.selectedSnippet.length === 0) {
				this.container.innerHTML = '';
				this.container.innerHTML = (`<h1>No snippet selected</h1>`);
				return;
			}
			
			// si el editor no existe limpia el contenedor y crea la instancia del editor
			if (!this.editor) {
				this.container.innerHTML = '';
				this.createEditor('');
				return
			}
			
			// se actualiza el valor del editor
			this.editor.setValue('');
		});	
	}

	disconnectedCallback() {
		this.editorListener();
	}
}

customElements.define('editor-component', Editor);
	