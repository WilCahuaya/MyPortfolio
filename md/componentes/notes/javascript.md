Para ver el tiempo del momento en lenguaje humano

```javascript
console.log(new Date().toLocateTimeString();)
```

# DOM

JavaScript crea un objeto **_document_** para guardar todo el HTML de la web
Es un objeto de javascript construido cuando levantamos una instacia de HTML

```javascript
console.dir(document);
console.dir(document.body);
```

Children .- Todos los que podrian tener hijos
ChildNodes .- Todos los nodos de una estructura HTML

innerHTML .- Tiene todos los elementos del elemento body
innerText .- Tiene todos el continido de texto

![Javascript DOM](https://static.platzi.com/media/user_upload/Ei2AUiIVgAM9th--5a3f8bb6-c2ef-4f67-8e07-8b328ff0cf5d.jpg)

### Pasar NodeList a Array

```javascript
// Los node List No se pueden manipulart coimo arrays en su totalidad
const nodeList = document.querySelectorAll(
  "name className or idName or tagName "
);
// Convertir NodeList a array
const newNodeListArray1 = [...nodeList];
const newNodeListArray2 = Array.from(nodeList);
```

![NodeList to Array](https://static.platzi.com/media/user_upload/class_2-952bbac5-15e7-4374-bcbd-1b8419b5e287.jpg)

# DOM Javascript en pdf

[DOM Javascript](https://wilcahuaya.netlify.app/pdf/javascript_platzi.pdf)

## Crear un elemento

### document.createElemnt

```javascript
h1 = document.createElememt("ELEMENTO"); // h1, p, etc...
```

## Crear un texto

### document.createTextNode

```javascript
texto = document.createTextNode("TEXTO");
```

## Agregar Nodos

## parentElement.appendChild(nodo)

```javascript
h1.appendChild(texto);
div.appendChild(h1);
```

## parentElement.append

## parentElement.insertBefore

## parentElement.insertAdjacentElement
