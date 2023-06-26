/**
 * @typedef State
 * @type {Object}
 * @property {Array<string>} snippetNames
 * @property {{ name: string, code: string }} selectedSnippet
 * @property {(name: string) => void} addSnippetName
 * @property {(names: Array<string>) => void} setSnippetsNames
 * @property {(snippet: {name: string, code: string }) => void} setSelectedSnippet
 * @property {(name: string) => void} removeSnippetName
 */

/** definicion del estado global de la aplicacion  */
const STORE = zustandVanilla.createStore((set) => {
    
    /** @type {State} */
    const STATE = {
        snippetNames: [],
        selectedSnippet: {
            name: '',
            code: ''
        },
        addSnippetName: (name) => set(state => ({...state, snippetsName: [...state.snippetsName, name] })),
        setSnippetsNames: (names) => set({ snippetNames: names }),
        setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
        removeSnippetName: (name) => set(state => ({
            ...state, 
            snippetNames: state.snippetNames.filter(snippetName => snippetName !== name), 
        })),
    }

    return STATE;
});


