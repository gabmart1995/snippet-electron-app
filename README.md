# snippet-electron-app

Aplicación construido sobre [electronJS](https://electronjs.org/) es un editor de codigo personalizado construido sobre
Vanilla JS utilizando Web Components, el nucleo de electron y electron-forge para empaquetar.

### En desarrollo 
Para construir los modulos de node `yarn install` o `npm i`. Para configurar tailwindcss en modo de desarrollo corre el siguiente comando una vez constuidos los modulos de node en la raiz del proyecto:

`npx tailwindcss -i ./src/frontend/input.css -o ./src/frontend/style.css --watch`

Para empaquetar la app para produccion `yarn run package`, personalmente se recomienda crear instaladores
personalizados para cada sistema

- Sistemas Windows: [inno-setup](https://jrsoftware.org/isinfo.php) 
- Distribuciones Linux: [AppImage](https://appimage.org/)

Si todavia no te convence puedes empaquetar y luego comprimirlo en un zip, para instalarlo manualmente en tu sistema operativo. 