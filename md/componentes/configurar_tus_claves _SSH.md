# Cómo Obtener y Configurar tus Claves SSH para Git y GitHub
![Cómo Obtener y Configurar tus Claves SSH para Git y GitHub](https://www.freecodecamp.org/espanol/news/content/images/size/w2000/2020/12/photo-1550527882-b71dea5f8089.jpg)

Si usas GitHub sin configurar una clave SSH, realmente te estás perdiendo de algo genial. Piensa en todo el tiempo que pasaste introduciendo tu correo electrónico y tu contraseña en la consola cada vez que haces un commit podrías haberlo pasado programando.

Bueno, ya no más. Aquí hay una guía rápida para generar y configurar una clave SSH con GitHub para que nunca más tengas que autentificarte a la antigua.

### Comprobar si existe una clave SSH

Primero, comprueba si ya has generado las claves SSH para tu máquina. Abre una terminal e introduce el siguiente comando:

```
ls -al ~/.ssh
```

Si ya has generado las claves SSH, deberías ver una salida similar a esta:

```
-rw-------  1 usuario usuario  1766 Jul  7  2018 id_rsa
-rw-r--r--  1 usuario usuario   414 Jul  7  2018 id_rsa.pub
-rw-------  1 usuario usuario 12892 Feb  5 18:39 known_hosts
```

Si tus claves ya existen, pasa a la sección **Copia tu clave pública de SSH** abajo.

Si no ves ninguna salida o ese directorio no existe (obtienes un mensaje de `No such file or directory`), entonces ejecuta:

```
mkdir $HOME/.ssh
```

Luego genera un nuevo conjunto de claves con:

```
ssh-keygen -t rsa -b 4096 -C tu@correo.com
```

Ahora comprueba que tus claves existen con el comando `ls -al ~/.ssh` y asegúrate de que la salida es similar a la anterior.

**Nota:** Las claves SSH siempre se generan como un par de claves públicas (`id_rsa.pub`) y privadas (`id_rsa`). Es extremadamente importante que **nunca reveles tu clave privada**, y que **sólo uses tu clave pública** para cosas como la autenticación de GitHub. Puedes leer más sobre cómo funcionan los pares de claves SSH / RSA [aquí](https://www.freecodecamp.org/news/a-top-down-introduction-to-ssh-965f4fadd32e/).

### Agrega tu clave SSH a ssh-agent

`ssh-agent` es un programa que se inicia cuando te conectas y almacena tus claves privadas. Para que funciones correctamente, debe estar ejecutándose y tener una copia de tu clave privada.

Primero, asegúrate de que `ssh-agent` se está ejecutando con:

```
eval "$(ssh-agent -s)" # para Mac y Linux
```

o:

```
eval `ssh-agent -s`
ssh-agent -s # para Windows
```

Entonces, agrega tu clave privada a `ssh-agent` con:

```
ssh-add ~/.ssh/id_rsa
```

### Copia tu clave pública de SSH

A continuación, tienes que copiar tu clave pública de SSH en el portapapeles.

Para Linux o Mac, imprime el contenido de tu clave pública en la consola con:

```
cat ~/.ssh/id_rsa.pub # Linux
```

Luego resalta y copia la salida.

O para Windows, simplemente ejecuta:

```
clip < ~/.ssh/id_rsa.pub # Windows
```

### Agrega tu clave SSH pública a GitHub

Ve a la página de [configuración](https://github.com/settings/keys) de tu GitHub y haz clic en el botón "New SSH key":

Luego dale a tu clave un título reconocible y pégala en tu clave pública (`id_rsa.pub`):

![image-15](https://www.freecodecamp.org/news/content/images/2020/02/image-15.png)

Finalmente, prueba la autenticación con:

```
ssh -T git@github.com
```

Si has seguido todos estos pasos correctamente, deberías ver este mensaje:

```
Hi tu_usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

### Más información sobre SSH:

-   [Ultimate guide to SSH](https://www.freecodecamp.org/news/the-ultimate-guide-to-ssh-setting-up-ssh-keys/)
-   [A top-down intro to SSH](https://www.freecodecamp.org/news/a-top-down-introduction-to-ssh-965f4fadd32e/)

Traducido del artículo - [**How to Get and Configure Your Git and GitHub SSH Keys**](https://www.freecodecamp.org/news/git-ssh-how-to/)

___

___

Aprende a codificar de forma gratuita. El plan de estudios de código abierto de freeCodeCamp ha ayudado a más de 40,000 personas a obtener trabajos como desarrolladores. [Empezar](https://www.freecodecamp.org/espanol/learn/)