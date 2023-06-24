/** definicion del estado global de la aplicacion  */
const STORE = zustandVanilla.createStore((set) => {
    return {
        snippetNames: [],
        selectedSnippet: '',
        addSnippetName: (name) => set(state => ({...state, snippetsName: [...state.snippetsName, name] })),
        setSnippetsNames: (names) => set({ snippetNames: names }),
        setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet })
    }; 
});


