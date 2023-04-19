# PostgreSQL

> Documentation [`Click Here`](https://www.postgresql.org/docs/)

> Pasos para instalar [postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart#step-1-installing-postgresql)

> PostgreSQL [Cheat Sheet](https://www.postgresqltutorial.com/wp-content/uploads/2018/03/PostgreSQL-Cheat-Sheet.pdf)

---

Start postgresql service:

```bash
$ sudo service postgresql start
```

Then you can connect using:

```bash
$ psql -d db_name
psql (13.0)
Type "help" for help.
db_name=#
```

From here you can start writing your [queries](https://www.postgresqltutorial.com/postgresql-cheat-sheet/):

```bash
movielens=# SELECT * FROM table_name;
 id |    name
----+-------------
  1 | Action
  2 | Adventure
  3 | Animation
  4 | Childrens
  5 | Comedy
  6 | Crime
  7 | Documentary
  8 | Drama
(8 rows)
```
