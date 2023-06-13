# React Playground

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Playground</title>
    <style>
      .red {
        color: red;
      }
      .default-box {
        color: orange;
        padding: 1rem;
        background-color: gray;
        font-size: 2rem;
        margin: 5px 0px;
      }
      .white {
        color: white;
      }

      .box {
        background-color: blue;
      }

      .box--sm {
        font-size: 0.5rem;
      }

      .box--md {
        font-size: 1rem;
      }

      .box--lg {
        font-size: 2rem;
      }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>

    <div id="root">
      <!-- <div class="container">
        <h1 id="hello-title">Hello Codeable</h1>
        <p>This is the content</p>
      </div> -->
    </div>

    <script type="text/babel">
      const container = document.getElementById("root");
      const root = ReactDOM.createRoot(container);

      function Box({ style, classNameProps, children, size }) {
        const sizeClass = size ? `box--${size}` : "";

        return (
          <div
            style={style}
            className={`default-box box ${sizeClass} ${classNameProps}`}
          >
            {children}
          </div>
        );
      }

      const ui = (
        <div>
          <Box classNameProps="box box--sm">Hello!!</Box>
          <Box classNameProps="box box--md">Hello!!</Box>
          <Box classNameProps="box box--md">Hello!!</Box>

          <Box size="sm" classNameProps="white">
            Hello!!
          </Box>
          <Box size="md" classNameProps="white">
            Hello!!
          </Box>
          <Box size="md" classNameProps="white">
            Hello!!
          </Box>
        </div>
      );

      // root.append(div);
      root.render(ui);
    </script>
  </body>
</html>
```
