const likesAnita = [
  "No me gusta dormir con mi gato porque se pasa de cariñoso y te lame hasta tu cara",
  "Me gusta como soy",
  "Digo que canta feo, pero en realidad canta bonito",
  "No me gusta que escriban con mayuscula",
  "Quiero hacer ejercicios",
  "Me gusta mi cabello de color negro",
  "No me gusta ver sufrir a los demas",
  "Me gusta que me alaguen",
  "Me gusta mi carrera y que no me miro haciendo otra cosa que no sea ser medico",
  "Me gusta jugar volley",
  "Me gusta las personas con lentes por que se les ve mas intelectuales",
  "Al despertar soy hermosa",
  "No me gusta que mi papa es temperamental",
  "Me dificulta elegir mi aufit",
  "Me gusta estudiar sin  presion",
  "Me gusta ser competetiva",
  "Me gustaria irme a otro pais",
  "Me gusta las peliculas de terror",
  "Me gusta escuchar a la Pastora Lisney de Font por que cuenta historias de demonios",
  "Me gusta la Causa Acevichada",
  "Me gusta la medicina por que ayudas a las personas con tu conocimiento",
  "Me gusta el chocolate",
  "Admiro a mi hermano mayor",
  "Me gustaria enseñar a niños y jovenes. En cualquier ministerio me adapataria",
  "Me gusta el clima frio y vivir en el campo",
  "Me gusta leer libros apocalipticos",
  "Me gusta el clima lluvioso",
  "Me gusta todas las alabanzas que tocamos y no tengo favoritos",
  "Soy una mujer fuerte",
  "Me gusta sentir nuevas experiencias",
  "Prefiero tener hijos varones pero no descarto tener hijas",
  "Me gusta los abarazos",
  "No me gusta que me vean llorar",
  "El color que me gusta es blanco y verde",
  "No me gusta utilizar mis lentes",
  "Me gusta bailar",
  "Me gusta las joyas",
  "Me gusta los gatos cariñosos pero no tan melosos",
  "Me gusta tener las uñas largas",
  "No me gusta juzgar a los demas porque se que hay un pasado detras de esa actitud",
  "Me gusta la CocaCola",
  "No me gusta mucho los gatos pero si su ternura",
  "Me gusta dormir",
  "Me gusta un emoji que mueve su toto",
  "Me gusta la lluvia mas que el sol y el frio mas que el calor",
  "Me gusta leer la biblia",
  "Me gusta jugar el ajedres con mi papa",
  "Tambien me gusta las peliculas comedias",
  "Antes me gustaba el desorden de su cuarto era caotico",
  "Me gusta las peliculas de disney",
  "No me gusta tomar pastillas",
  "Me gusta estar sola y ver el cielo",
  "No me gusta dirigir los cultos",
  "Me gustaria que me digan doctora Bujaico",
  "Me gusta la musica clasica",
  "Me gusta ver los partidos de futbol solo si son interesantes",
];

const contLikes = document.querySelector(".contLikes");

likesAnita.forEach((element) => {
  const div = document.createElement("div");
  div.classList.add("contLikes__div");
  const h1 = document.createElement("h1");
  const content = document.createTextNode(element);
  h1.appendChild(content);
  div.appendChild(h1);
  contLikes.appendChild(div);
});
