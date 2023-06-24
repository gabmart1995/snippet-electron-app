class Editor extends HTMLElement {
	constructor() {
		super();
		this.editor = undefined;
		this.container = null;
		this.editorListener = null;

		// configuracion del require
		require.config({ 
			paths: { vs: 'assets/monaco-editor/min/vs' } 
		});
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
		});
	}
	
	attributeChangedCallback( name, oldValue, newValue ) {
	}
	
	render() {
		this.container = this.querySelector('#container');
		
		// nos subscribimos a selected snippet
		this.editorListener = STORE.subscribe(({ selectedSnippet }) => {
			
			if (!this.container) return;
			
			if (selectedSnippet.length === 0) {
				this.container.innerHTML = '';
				this.container.innerHTML = (`<h1>No snippet selected</h1>`);
				return;
			}
			
			// si el editor no existe limpia el contenedor y crea la instancia del editor
			if (!this.editor) {
				this.container.innerHTML = '';
				this.createEditor('hello world');
				return
			}
			
			// se actualiza el valor del editor
			this.editor.setValue('prueba');
		});	
	}

	disconnectedCallback() {
		this.editorListener();
	}
}

customElements.define('editor-component', Editor);
	