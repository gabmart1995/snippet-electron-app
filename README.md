# snippet-electron-app

Aplicación construido sobre electron es un editor de codigo personalizado construido sobre
Vanilla JS utilizando Web Components, el nucleo de electron y electron-forge.


### En desarrollo 
Para construir los modulos de node `yarn install` o `npm i`. Para configurar tailwindcss en modo de desarrollo corre el siguiente comando una vez constuidos los modulos de node en la raiz del proyecto:

`npx tailwindcss -i ./src/frontend/input.css -o ./src/frontend/style.css --watch`