class Editor extends HTMLElement {
	constructor() {
		super();
		this.editor = undefined;
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
				this.configMonaco();	
				this.render();
			})
	}

	// configuramos require global para el path de monaco
	configMonaco() {
		require.config({ 
			paths: { vs: 'assets/monaco-editor/min/vs' } 
		});

		require(['vs/editor/editor.main'], () => {
			this.editor = monaco.editor.create(this.querySelector('#container'), {
				// value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
				language: 'javascript',
				theme: 'vs-dark',
				fontSize: 20,
			});
		});
	}

	attributeChangedCallback( name, oldValue, newValue ) {
	}

	render() {
		
	}

	disconnectedCallback() {
	}
}

customElements.define('editor-component', Editor);
	