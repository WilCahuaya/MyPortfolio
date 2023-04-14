var app = document.querySelector('#content');
var md = fetch("/instructions.md").then((response)=>response.text()).then(text=>{
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    app.innerHTML = html;
})
