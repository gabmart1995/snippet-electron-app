class SnippetForm extends HTMLElement {
	constructor() {
		super();
	}

	/* props observed */
	static get observedAttributes() {
		return [];
	}

	connectedCallback() {
		fetch('components/snippet-form/snippet-form-component.html')
			.then(response => response.text())
			.then(html => {
				this.innerHTML = html;
				this.render();
			});
	}

	attributeChangedCallback( name, oldValue, newValue ) {
	}

	render() {
		
		/** @type {State} */
		const { addSnippetName } = STORE.getState();

		const form = this.querySelector('form');

		if (!form) return;
		
		form.addEventListener('submit', event => {
			
			const formData = new FormData(form);
			const fileName = formData.get('file-name').toString();
			
			// crea el archivo
			api.createSnippet(fileName);

			// limpia el formulario
			form.reset(); 

			// actualizamos el estado
			addSnippetName(fileName)

			event.preventDefault(); 
		});
	}

	disconnectedCallback() {
	}
}

customElements.define('snippet-form-component', SnippetForm);
	