fetch("/md/componentes/index.md").then((response)=>response.text()).then(text=>{
    document.getElementById("content").innerHTML = marked.parse(text);
})
