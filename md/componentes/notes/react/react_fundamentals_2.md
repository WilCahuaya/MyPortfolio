> React Fundamentals 2 [Repositorio Git Hub](https://github.com/codeableorg/react-fundamentals-2-c10)

# Prop Types

## Create a component with prop types validations

Create a re-usable custom component for Codeable's design Sidebar Item.

SideBar Item

![Task 1 fundamentals 2](../../../../img/notes/React/task_1_fundamentals_2.jpg)

```jsx
| prop    | options                 |
| ------- | ----------------------- |
| href    | string, default: "#"    |
| current | boolean, default: false |
| icon    | svg element             |
```

You should be able to use the Button component like this:

```javascript
const icon = <svg>...</svg>

<SidebarItem href="www.example.com" current={true} icon={icon}>
  Example Page
</SidebarItem>
```

The component should implement the PropTypes feature to show warnings on the console when the props are invalid.

Check [here the Figma file](https://www.figma.com/file/Crqtn0kqnB1EKQWZVXE3of/Expensable-React?node-id=4101%3A1163)

#### Resolución:

```javascript
// Icons
function Icon(props) {
  const { fill = true, name } = props;

  const fillIcon = fill ? "fill" : "line";
  const nameIcon = name ? name : "";

  return <i className={`ri-${nameIcon}-${fillIcon} ri-sm`}></i>;
}

Icon.propTypes = {
  fill: PropTypes.bool,
  name: PropTypes.oneOf(["mail", "user"]),
};

// Add the SidebarItem component here
function SidebarItem(props) {
  const { children, href = "#", icon, current } = props;

  const currentActive = current ? "sidebar-item--active" : "";

  return (
    <a href={href} className={`sidebar-item ${currentActive}`}>
      {icon}
      {children}
    </a>
  );
}

SidebarItem.propTypes = {
  href: PropTypes.string,
  current: PropTypes.bool,
  icon: PropTypes.element,
};

const ui = (
  <div className="container">
    <div className="section">
      <SidebarItem icon={<Icon name="mail" />}>Content Text</SidebarItem>
    </div>
  </div>
);

// Render UI

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(ui);
```

# Render Lists

## Renders a list of SidebarItems

Given an array of objects representing Sidebar Items, render them inside a nav element:

![SideBar Nav](../../../../img/notes/React/task_2_fundamentals_2.jpg)

```javascript
const categoryIcon = <svg>...</svg>;
const transactionIcon = <svg>...</svg>;
const budgetIcon = <svg>...</svg>;

function SidebarNav() {
  const navigation = [
    { name: "Categories", icon: "categoryIcon", href: "#", current: true },
    {
      name: "Transactions",
      icon: "transactionIcon",
      href: "#",
      current: false,
    },
    { name: "Budgets", icon: "budgetIcon", href: "#", current: false },
  ];

  return <nav>{/* // complete your code here */}</nav>;
}
```

Check [here the Figma file](https://www.figma.com/file/Crqtn0kqnB1EKQWZVXE3of/Expensable-React?node-id=4101%3A1163)

#### Resolución:

```javascript
// Icons
function Icon(props) {
  const { fill = true, name } = props;

  const fillIcon = fill ? "fill" : "line";
  const nameIcon = name ? name : "";

  return <i className={`ri-${nameIcon}-${fillIcon} ri-sm`}></i>;
}

Icon.propTypes = {
  fill: PropTypes.bool,
  name: PropTypes.oneOf(["mail", "user"]),
};

function SidebarItem(props) {
  const { children, href = "#", icon, current } = props;

  const currentActive = current ? "sidebar-item--active" : "";

  return (
    <a href={href} className={`sidebar-item ${currentActive}`}>
      {icon}
      {children}
    </a>
  );
}

SidebarItem.propTypes = {
  href: PropTypes.string,
  current: PropTypes.bool,
  icon: PropTypes.element,
};

// Add the SidebarItem component here

function SidebarNav() {
  const navigation = [
    { name: "Categories", icon: "mail", href: "#", current: true },
    { name: "Transactions", icon: "user", href: "#", current: false },
    { name: "Budgets", icon: "mail", href: "#", current: false },
  ];

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {navigation.map((nav, index) => (
        <SidebarItem
          key={`sidebar-${index}`}
          href={nav.href}
          current={nav.current}
          icon={<Icon name={nav.icon} />}
        >
          {nav.name}
        </SidebarItem>
      ))}
    </nav>
  );
}

// Render UI

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SidebarNav />);
```

# React State

## Password component with state

Using react useState hook, create the following component

![Password component](../../../../img/notes/React/task_3_fundamentals_2.gif)

The input should change between `type="text"` and `type="password"` based on the `show` state (true or false)

**_Controlled password_**

Make sure that the input value is controlled by React. What could you do to make sure that the password value could never have whitespaces?

#### Resolución:

```javascript
// Create the Password component here
function Password() {
  // const [show, setShow] = React.useState(false);
  // const [password, setPassword] = React.useState("");
  const [state, setState] = React.useState({
    show: false,
    password: "",
  });

  function handleShow() {
    // setShow(!show);
    setState({
      ...state,
      show: !state.show,
    });
  }

  const message = state.show
    ? "👀 be careful, your password is visible"
    : "👍 no one can see your password";

  const buttonText = state.show ? "hide" : "show";

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type={state.show ? "text" : "password"}
        value={state.password}
        onChange={(event) =>
          setState({
            ...state,
            password: event.target.value.split(" ").join(""),
          })
        }
      />
      <p>{message}</p>
      <button onClick={handleShow}>{buttonText}</button>
    </div>
  );
}

// Render UI
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Password />);
```

# Lifting State

## App with Sidebar Navigation

Put all the pieces together and build an App with a sidebar and main section as following:

![App with SideBar Nav](../../../../img/notes/React/task_4_fundamentals_2.gif)

The following is obviously incomplete but the the idea is to render the SideBarNav and Main components side by side inside a div container

```javascript
function App() {
  // complete the neccesary states

  // pass the neccesary props to SidebarNav and Main components
  return (
    <div>
      <SidebarNav />
      <Main />
    </div>
  );
}
```

Check [here the prototype](https://www.figma.com/proto/Crqtn0kqnB1EKQWZVXE3of/Expensable-React?page-id=4157%3A1881&node-id=4157%3A1882&viewport=241%2C48%2C0.43&scaling=contain&starting-point-node-id=4157%3A1882)

Check [here the Figma page](https://www.figma.com/file/Crqtn0kqnB1EKQWZVXE3of/?node-id=4157%3A1881)

#### Resolución:
