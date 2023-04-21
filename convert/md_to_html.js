function md_to_html(path){
    // Crear un nuevo objeto Showdown.js
    var converter = new showdown.Converter();

    // Obtener el contenido del archivo Markdown
    fetch(path)
      .then((response) => response.text())
      .then((markdownText) => {
        // Convertir el archivo Markdown a HTML
        var htmlText = converter.makeHtml(markdownText);

        // Insertar el HTML generado en el documento
        document.getElementById("content").innerHTML = htmlText;

        // Resaltar la sintaxis de código utilizando Prism.js
        Prism.highlightAll();
      });
}