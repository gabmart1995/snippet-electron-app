/** definicion del estado global de la aplicacion  */
const STORE = zustandVanilla.createStore((set) => {
    return {
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
    }; 
});


