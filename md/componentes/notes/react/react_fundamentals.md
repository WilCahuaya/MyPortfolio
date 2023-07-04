> React Fundamentals [Repositorio Git Hub](https://github.com/codeableorg/react-fundamentals-c10)

## React Api

Using React raw API (`React.createElement()`), render the following UI inside `<div id="root">`:

```html
<div class="article">
  <h3 class="article__title">Postula a Codeable</h3>
  <p class="article__body">
    Aprende a construir aplicaciones web profesionales
  </p>
  <a class="article__link" href="https://www.codeable.la/" target="blank">
    Haz click aqui
  </a>
</div>
```

#### Resolución:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React API</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="root"></div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script type="module" src="index.js"></script>
  </body>
</html>
```

```javascript
const article = React.createElement(
  "div",
  { className: "article" },
  React.createElement(
    "h3",
    { className: "article__title" },
    "Postula a Codeable"
  ),
  React.createElement(
    "p",
    { className: "article__body" },
    "Aprende a construir aplicaciones web profesionales"
  ),
  React.createElement(
    "a",
    {
      className: "article__link",
      href: "https://www.codeable.la/",
      target: "_blank",
    },
    "Haz click aquí"
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(article);
```

## jsx

Using JSX and te power of Babel, render the following UI inside `<div id="root">`:

```html
<div class="article">
  <h3 class="article__title">Postula a Codeable</h3>
  <p class="article__body">
    Aprende a construir aplicaciones web profesionales
  </p>
  <a class="article__link" href="https://www.codeable.la/" target="blank"
    >Haz click aqui</a
  >
</div>
```

#### Resolución:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JSX</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="root">
      <!-- the ui should be rendered here -->
    </div>

    <!-- import Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- import React and ReactDOM libraries -->
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script type="text/babel" src="index.js"></script>
  </body>
</html>
```

```javascript
const article = (
  <div className="article">
    <h3 className="article__title">Postula a Codeable</h3>
    <p className="article__body">
      Aprende a construir aplicaciones web profesionales
    </p>
    <a className="article__link" href="https://www.codeable.la/" target="blank">
      Haz click aquí
    </a>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(article);
```

## Custom Components

Create the following custom components:

- Article
- Title
- Body
- Link

After creating each component you should be able to use them as following:

```html
<Article>
  <Title>Postula a Codeable</Title>
  <Body>
    Aprende a construir aplicaciones web profesionales
  </Body>
  <Link url="https://www.codeable.la/">Haz click aqui</Link>
</Article>
```

The result should be the same as before 🙂

#### Resolución:

Con el mismo html de jsx

```javascript
function Title({ children }) {
  return <h3 className="article__title">{children}</h3>;
}

function Body(props) {
  return <p className="article__body">{props.children}</p>;
}

function Link(props) {
  return (
    <a className="article__link" href={props.url} target="_blank">
      {props.children}
    </a>
  );
}

function Article(props) {
  return <div className="article">{props.children}</div>;
}

const article = (
  <Article>
    <Title>Postula a Codeable!</Title>
    <Body>Aprende a construir aplicaciones web profesionales</Body>
    <Link url="https://www.codeable.la/">Haz click aqui</Link>
  </Article>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(article);
```

## Styling components

Create a re-usable custom component for Codeable's design button. The button should receive props that change its style. It could take the combination of type, leftIcon, rightIcon, and size.

```sql
prop        | options
------------+-----------------------------
type        | primary | secondary | subtle
------------+-----------------------------
size        | sm | md | lg Default: md
------------+-----------------------------
leftIcon    | svg element
------------+-----------------------------
rightIcon   | svg element
------------+-----------------------------
```

You should be able to use the Button component like this:

```javascript
const icon = <svg>...</svg>

<Button size="sm" type="primary" leftIcon={icon}>
  Click here!
</Button>
```

It should be able to receive custom class names and inline styles as well:

```javascript
<Button
  size="lg"
  type="subtle"
  style={{ backgroundColor: "orange" }}
  className="extra-bold"
>
  {" "}
  Click here! >{" "}
</Button>
```

Don't forget to add the required css rules on styles.css

#### Resolución:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Styling Components</title>
    <link rel="stylesheet" href="css/style.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root">
      <!-- the ui should be rendered here -->
    </div>

    <!-- import Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- import React and ReactDOM libraries -->
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <script type="text/babel" src="index.js"></script>
  </body>
</html>
```

```javascript
function Button(props) {
  const { children, type, size, leftIcon, rightIcon, className, style } = props;

  const typeClass = type ? `button--${type}` : "button--subtle";
  const sizeClass = size ? `button--${size}` : "";

  return (
    <button
      style={style}
      className={`button ${typeClass} ${sizeClass} ${className}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

function Icon(props) {
  const { type, name } = props;

  const typeIcon = type ? type : "line";
  const nameIcon = name ? name : "";

  if (!nameIcon) {
    console.error(
      "Make sure to add a valid icon, see more in https://remixicon.com/"
    );
  }

  return <i className={`ri-${nameIcon}-${typeIcon} ri-sm`}></i>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Button
      type="primary"
      size="sm"
      leftIcon={<Icon type="line" name="user" />}
    >
      Hola!!
    </Button>
    <Button
      type="secondary"
      size="md"
      rightIcon={<Icon type="line" name="user-2" />}
    >
      Hola!!
    </Button>
    <Button size="lg">
      <Icon type="fill" name="home" />
      Hola!!
    </Button>
  </div>
);
```
