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
		const form = this.querySelector('form');

		if (!form) return
		
		form.addEventListener('submit', event => {
			
			const formData = new FormData(form);
			
			api.createSnippet(`${formData.get('file-name')}.json`);
			
			form.reset(); // limpia el formulario
			event.preventDefault(); // cancela el evento de envio
		});
	}

	disconnectedCallback() {
	}
}

customElements.define('snippet-form-component', SnippetForm);
	