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
			})
	}

	attributeChangedCallback( name, oldValue, newValue ) {
	}

	render() {
		const { addSnippetName } = STORE.getState();
		const form = this.querySelector('form');

		if (!form) return;
		
		form.addEventListener('submit', event => {
			
			const formData = new FormData(form);
			const fileName = formData.get('file-name').toString();
			api.createSnippet(fileName);

			form.reset(); // limpia el formulario

			// actualizamos el estado
			addSnippetName(fileName)

			event.preventDefault(); // cancela el evento de envio
		});
	}

	disconnectedCallback() {
	}
}

customElements.define('snippet-form-component', SnippetForm);
	