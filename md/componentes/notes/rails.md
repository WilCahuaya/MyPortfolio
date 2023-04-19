# Rails

> Documentacion [Click Here](https://guides.rubyonrails.org/)/

> [Cheap Shet](https://dev.to/ericchapman/my-beloved-ruby-on-rails-cheat-sheet-50pi)

---

<!--
## Rails

Abrir servidor en un nuevo puerto
```ruby
rails s -p 3001
```

- agregar index a dos columnas como username y email columna

```ruby
rails g migration AddIndexUsernameEmailToUser username:string:uniq email:string:uniq
```

- agragar la propiedad unico a una columna

```ruby
rails g migration AddIndexNameToGame name:string:uniq
```

- convinar dos columnas como unico y validar
> esto es en el modelo

```ruby
# company_id and game_id should be a unique combination
  validates :company, uniqueness: { scope: :game, message: "and Game combination already taken" }
```

> esto es en el migrate

```ruby
class AddIndexCompanyGameToInvolvedCompany < ActiveRecord::Migration[7.0]
  def change
    # add_index :companies, :name, unique: true
    add_index :involved_companies, [:game_id, :company_id], unique: true
  end
end
```
borrar todo una fila 'ctrl + shift + k'

# Controladores y rutas

> generar un controldor
```ruby
rails generate controller companies
```
- Rutas
```ruby
get ¨/companies¨, to: ¨companies#index¨
```
- Controller
```ruby

```
-->
