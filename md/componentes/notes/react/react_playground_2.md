# React Plaground 2

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Playground 2</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <div id="root">
      <!-- the ui should be rendered here -->
    </div>

    <!-- PropTypes to React -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.js"></script>

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

# PropTypes - START

```javascript
function Button({ size, type, children, list }) {
  const typeClass = type ? `button--${type}` : "";
  const sizeClass = size ? `button--${size}` : "";
  return (
    <button className={`button ${typeClass} ${sizeClass}`}>{children}</button>
  );
}
// Button.propTypes = {
//   size(props, propName, componentName) {
//     const type = typeof props[propName];
//     const validProps = ["lg", "md", "sm"];
//     if (props[propName] === undefined) return;
//     if (type !== "string") {
//       console.error(
//         `El componente ${componentName} espera que el prop ${propName} sea de tipo string, pero recibió el tipo ${type}`
//       );
//     }
//     if (!validProps.includes(props[propName])) {
//       console.error(
//         `El componente ${componentName} espera que el prop ${propName} sea un de los siguientes valores: ${validProps}`
//       );
//     }
//   },
//   type(props, propName, componentName) {
//     const type = typeof props[propName];
//     const validProps = ["primary", "secondary", "subtle"];
//     if (props[propName] === undefined) return;
//     if (type !== "string") {
//       console.error(
//         `El componente ${componentName} espera que el prop ${propName} sea de tipo string, pero recibió el tipo ${type}`
//       );
//     }
//     if (!validProps.includes(props[propName])) {
//       console.error(
//         `El componente ${componentName} espera que el prop ${propName} sea un de los siguientes valores: ${validProps}`
//       );
//     }
//   },
// };
// const PropTypes = {
//   string(props, propName, componentName) {
//     if (typeof props[propName] !== "string") {
//       return new Error(
//         `${componentName} needs the prop ${propName} to be of type string`
//       );
//     }
//   },
// };
Button.propTypes = {
  size: PropTypes.oneOf(["lg", "md", "sm"]),
  type: PropTypes.oneOf(["primary", "secondary", "subtle"]),
  children: PropTypes.any.isRequired,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Button size="lg" type="primary">
    Hola!
  </Button>
);
```

# PropTypes - END

# RenderList - START

```javascript
function Button({ size, type, children }) {
  const typeClass = type ? `button--${type}` : "";
  const sizeClass = size ? `button--${size}` : "";
  return (
    <button className={`button ${typeClass} ${sizeClass}`}>{children}</button>
  );
}
const buttonsData = [
  { size: "lg", type: "primary", children: "Big button" },
  { size: "sm", type: "secondary", children: "Secondary button" },
  { size: "lg", type: "subtle", children: "Subtle button" },
];
const ui = (
  <div>
    {buttonsData.map((button, index) => (
      <Button key={`button-${index}`} size={button.size} type={button.type}>
        {button.children}
      </Button>
    ))}
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(ui);
```

# RenderList - END

# React STATE - START

```javascript
React.useState => Hook!
function Counter() {
  const [number, setNumber] = React.useState(10);
  function handleDecreaseClick() {
    console.log("decrease clicked");
    setNumber(number - 1);
  }
  function handleIncreaseClick() {
    console.log("Increase clicked");
    setNumber(number + 1);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleDecreaseClick}>Decrease</button>
      <button onClick={handleIncreaseClick}>Increase</button>
    </div>
  );
}
function Form() {
  const [name, setName] = React.useState("");
  function handleNameChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" onChange={handleNameChange} />
      {name ? <p>Hello {name}</p> : <p>Please type your name</p>}
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Form />);
React STATE - END
Controlled vs Uncontrolled - START
function Form() {
  const [name, setName] = React.useState("");
  function handleNameChange(event) {
    setName(event.target.value.toUpperCase());
  }
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />
      {name ? <p>Hello {name}</p> : <p>Please type your name</p>}
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Form />);
```

# React STATE - END

# Lifting and colocating the state - START

```javascript
function Name({ name, onNameChange }) {
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />
    </div>
  );
}

function Display({ name }) {
  return <p>{name ? `Hello ${name}` : "Please type your name"}</p>;
}

function App() {
  const [name, setName] = React.useState("");

  function handleNameChange(value) {
    setName(value);
  }

  return (
    <div>
      <Name name={name} onNameChange={handleNameChange} />
      <Display name={name} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

# Lifting and colocating the state - END
