# Rails

> Documentacion [Click Here](https://guides.rubyonrails.org/)

> [Cheap Shet](https://dev.to/ericchapman/my-beloved-ruby-on-rails-cheat-sheet-50pi)

---

## Rails CLI

Create a Rails application from scratch and we added --skip-test to avoid using Minitest (the default test engine) and to be able to add RSpec later.

```bash
$ rails new . --database postgresql --skip-test
```

Add the gem **rubocop-rails** to the Gemfile and create the file **.rubocop.yml.**

```javascript
# Gemfile

group :development do
  ...
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  ...
end
```

```javascript
# .rubocop.yml

require: rubocop-rails

AllCops:
  NewCops: enable
  Exclude:
    - "db/**/*"
    - "script/**/*"
    - "bin/**/*"
    - "node_modules/**/*"

Style/StringLiterals:
  EnforcedStyle: double_quotes

Style/FrozenStringLiteralComment:
  Enabled: false

Style/Documentation:
  Enabled: false

Metrics/MethodLength:
  Max: 20

Metrics/AbcSize:
  Max: 30

Style/GlobalVars:
  Enabled: false

Style/WordArray:
  MinSize: 10

Style/ClassVars:
  Enabled: false

HasAndBelongsToMany:
  Enabled: false

Layout/LineLength:
  Max: 100
  IgnoredPatterns: ['\s*#']

Metrics/BlockLength:
  Exclude:
    - config/**/*
    - spec/**/*

Lint/AmbiguousBlockAssociation:
  Exclude:
    - spec/**/*

```

Run **bundle install** and the **rubocop -A** to autocorrect minor offenses. Correct any extra offenses and commit your progress.

```bash
$ git add .
$ git commit -m "Initial commit"
```

Other CLI

```bash
# Start the Rails server
$ rails s

# Rails console
$ rails c

# Install dependencies
$ bundle install

# View all routes
$ rails routes

# Toggle rails caching
$ rails dev:cache

# Create db in project Rails
$ rails db:create

# Migrate db in project Rails
$ rails db:migrate
```

## Models

Generate a model and a migration

```bash
$ rails generate model Categories name description photo_count:integer
```

- You can define the type of the field using ¨**:**¨ followed by the data type (no spaces!).
- The most common types are: string, text, integer, decimal, date, time, datetime, boolean, and references.

Generate a model and a migration whit reference

```bash
$ rails g model Photos title description category:references
```

Destroy a model and a migration

```bash
$ rails generate model Categories name description photo_count:integer
```

> Documentacion [Active Record Associations](https://guides.rubyonrails.org/association_basics.html)

### One to many

Model User

```javascript
class User < ApplicationRecord
  # Assocciations
  has_many :critics, dependent: :destroy
end
```

- **dependent: :destroy** If a user is destroyed, all his reviews are deleted.
  Model Critic

```javascript
class Critic < ApplicationRecord
  # Assocciations
  belongs_to :user, counter_cache: true
end
```

### Join tables (Many to many)

1. Image of many-to-many relationship when the intermediate table exists as a model
   ![Alt text](/img/notes/many_to_many.png"Many to many")

2. Create a migration to join two tables via model

![Alt text](/img/notes/Screenshot_20230421_163713.png"No model")

```bash
$ rails g migration CreateJoinTableGameGenre game platforms
```

Migrate

```javascript
class CreateJoinTableGamePlatform < ActiveRecord::Migration[7.0]
  def change
    create_join_table :games, :platforms do |t|
      # t.index [:game_id, :platform_id]
      # t.index [:platform_id, :game_id]
    end
  end
end
```

Schema

```sql
create_table "games_platforms", id: false, force: :cascade do |t|
    t.bigint "game_id", null: false
    t.bigint "platform_id", null: false
  end
```

Model Game

```javascript
class Game < ApplicationRecord
  # Assocciations
  has_and_belongs_to_many :platforms
end
```

Model Platform

```javascript
class Platform < ApplicationRecord
  # Assocciations
  has_and_belongs_to_many :games
end
```

3. Self Joins

   > Documentacion [Self Joins](https://guides.rubyonrails.org/association_basics.html#self-joins)

   A manager has many subordinates but a subordinate has one manager

   ![Self Joins](/img/notes/self_joins.jpeg "Self Joins")

   - Generate a migration AddParentRefToGame
     ![Table Games](/img/notes//table_games.png "Self Joins")

```bash
$ rails g migration addParentRefToGame parent:references
```

Migration

```javascript
class AddParentRefToGame < ActiveRecord::Migration[7.0]
  def change
    # add_reference :games, :parent, null: false, foreign_key: true
    add_reference :games, :parent, foreign_key: { to_table: :games }
  end
end
```

Schema

```sql
create_table "games", force: :cascade do |t|
    t.string "name"
    t.text "summary"
    t.date "release_date"
    t.integer "category", default: 0
    t.decimal "rating"
    t.string "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "parent_id"
    t.index ["name"], name: "index_games_on_name", unique: true
    t.index ["parent_id"], name: "index_games_on_parent_id"
end

add_foreign_key "games", "games", column: "parent_id"
```

Model Game

```javascript
class Game < ApplicationRecord
  # Self-join Assocciations
  has_many :expansions, class_name: "Game",
                        foreign_key: "parent_id",
                        dependent: :destroy,
                        inverse_of: "parent"

  belongs_to :parent, class_name: "Game", optional: true
end
```

- Way to add values associated to has_many

![Add values associated](/img/notes/add_values_associated.png)

4. Polymorphic table

   > Documentation [Polymorphic table](https://guides.rubyonrails.org/association_basics.html#polymorphic-associations)

![polymorphic table](/img/notes/polymorphic_table.jpeg)

Create a polymorphic migration

```bash
$ rails g migration AddRefCriticableToCritic criticable:references{polymorphic}
```

Migration

```javascript
class AddRefCriticableToCritic < ActiveRecord::Migration[7.0]
  def change
   // # rails g migration AddRefCriticableToCritic criticable:references{polymorphic}
    add_reference :critics, :criticable, polymorphic: true, null: false
  end
end
```

Schema

```sql
create_table "critics", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "criticable_type", null: false
    t.bigint "criticable_id", null: false
    t.index ["criticable_type", "criticable_id"], name: "index_critics_on_criticable"
    t.index ["user_id"], name: "index_critics_on_user_id"
  end
```

Model Critic

```javascript
class Critic < ApplicationRecord
  # Assocciations
  belongs_to :criticable, polymorphic: true
end
```

Model Game

```javascript
class Game < ApplicationRecord

  # Associations
  has_many :critics, as: :criticable, dependent: :destroy
end
```

Model Company

```javascript
class Company < ApplicationRecord
  has_many :critics, as: :criticable, dependent: :destroy
end
```

Create a Critics

```javascript
irb(main):021:0> criticGame = Critic.create(title: 'Critic Game', criticable: game)
irb(main):021:0> criticCompany = Critic.create(title: 'Critic Company', criticable: company)
```

Consult

```javascript
company.critics;
game.critics;

criticGame.criticable;
criticCompany.criticable;
```

## Controllers

## views

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
