
class Editor extends HTMLElement {
	constructor() {
		super();
		this.editor = null;
		this.editorListener = null;
		this.container = null;
		this.EXTENSIONS = Object.freeze({
			js: 'js',
			ts: 'ts',
			css: 'css',
			html: 'html',
			json: 'json',
			py: 'py'
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
	createEditor(value = '', selectedSnippetName) {
		require(['vs/editor/editor.main'], () => {
			this.editor = monaco.editor;
			this.editorInstance = this.editor.create(this.container, {
				value,
				language: this.getLanguageEditor(selectedSnippetName),
				theme: 'vs-dark',
				fontSize: 18,
			});
			
			// anadimos el evento de captura de teclado
			this.container.addEventListener('keyup', event => {
				
				// salva el archivo Ctrl + S 	
				if (event.ctrlKey && event.key === 's') { 
					console.log('saved');
					selectedSnippetName = STORE.getState().selectedSnippet.name;
					api.saveSnippet(selectedSnippetName, this.editorInstance.getValue());
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
			
			if (state.selectedSnippet.name.length === 0) {
				this.container.innerHTML = '';
				this.container.innerHTML = (`<h1>No snippet selected</h1>`);
				return;
			}

			if (!this.container || state.selectedSnippet.name === prevState.selectedSnippet.name) return;
			
			// si el editor no existe limpia el contenedor y crea la instancia del editor
			if (!this.editorInstance) {
				this.container.innerHTML = '';
				this.createEditor(state.selectedSnippet.code, state.selectedSnippet.name);
				return
			}
			
			// se cambia el modelo de lenguaje de programacion
			this.editor.setModelLanguage(
				this.editorInstance.getModel(), 
				this.getLanguageEditor(state.selectedSnippet.name)
			);

			// incluye el contenido en el editor
			this.editorInstance.setValue(state.selectedSnippet.code);
		});	
	}

	getLanguageEditor(snippetName = '') {
		const extension = snippetName.split('.')[snippetName.split('.').length - 1];
		
		switch (extension) {
			case this.EXTENSIONS.js:
				return 'javascript';

			case this.EXTENSIONS.ts:
				return 'typescript';
			
			case this.EXTENSIONS.html:
				return this.EXTENSIONS.html;

			case this.EXTENSIONS.css:
				return this.EXTENSIONS.css;

			case this.EXTENSIONS.json:
				return this.EXTENSIONS.json;

			case this.EXTENSIONS.py:
				return 'python';

			default:
				return 'txt';
		}
	}

	disconnectedCallback() {
		this.editorListener();
	}
}

customElements.define('editor-component', Editor);
