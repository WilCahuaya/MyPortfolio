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

5. Enums fields

Documentation [Enums Fields](https://api.rubyonrails.org/v5.1/classes/ActiveRecord/Enum.html)

**Category** is the name of the column that is of type integer that by default is 0
Model Game

```sql
class Game < ApplicationRecord
  enum category: { main_game: 0, expansion: 1 }

  # gta_exp = Game.create(name: "GTA Expansion", parent: gta, category: "expansion")
end
```

```sql
# create some games
main_game = Game.create(name: 'New game', category: 'main_game')
expansion_game = main_game.expansions.create(name: 'New expansion', category: 'expansion')
# check the 'enum' methods
main_game.category # => 'main_game'
main_game.main_game? # => true
main_game.expansion? # => false

expansion_game.category # => 'expansion'
expansion_game.main_game? # => false
expansion_game.expansion? # => true

# to list all the games that are expansions
Game.expansion

# to list all the games that are main_games
Game.main_game

# create some platforms
arcade = Platform.create(name: 'Play Station 5', category: 'arcade')
portable = Platform.create(name: 'Nintendo Switch', category: 'portable_console')
# check the 'enum' methods
arcade.category # => 'arcade'
arcade.arcade? # => true
arcade.portable_console? # => false

portable.category # => 'portable_console'
portable.arcade? # => false
portable.portable_console? # => true

# to list all the platforms that are arcade
Platform.arcade

# to list all the platforms that are portable_console
Platform.portable_console
```

![Enums Fields](/img/notes/enums_fields.png)

6. Callbacks

Documentation [Active Record Callbacks](https://guides.rubyonrails.org/active_record_callbacks.html)

![Callbacks](/img/notes/callbacks.png)

**counter_cache** It does the same as the code commented below

```sql
class Critic < ApplicationRecord

  # Assocciations
  belongs_to :user, counter_cache: true

  belongs_to :criticable, polymorphic: true

  # after_create :increment_critics_count
  # after_destroy :decrement_critics_count

  # private

  # def increment_critics_count
  #   critic_user = user #=> self.user #=> critic.user
  #   critic_user.critics_count += 1
  #   critic_user.save
  # end

  # def decrement_critics_count
  #   critic_user = user #=> self.user #=> critic.user
  #   critic_user.critics_count -= 1
  #   critic_user.save
  # end
end
```

![Callback with name parameter count](/img/notes/callback_with_name.jpeg)

```sql
class Critic < ApplicationRecord

  belongs_to :user, counter_cache: :count_of_books
end
```

7. Ejm. Validates

Critic:

- title, body: required
- title: max 40 characters

```sql
class Critic < ApplicationRecord
  # Validations
  # title, body: required
  validates :body, presence: true
  validates :title, presence: true, length: { maximum: 40 }
end
```

Game:

- name, category: required
- name: unique
- rating: between 0 and 100 (if provided)
- parent_id: if the category is expansion, parent_id should be a valid game_id. If a category is main_game, parent_id should be null.

```sql
class Critic < ApplicationRecord
  # Validations
  # title, body: required
  validates :body, presence: true
  validates :title, presence: true, length: { maximum: 40 }
end
```

User:

- username, email: required and unique
- birth_date: before 16 years from now. Message: You should be 16 years old to create an account (this one requires custom validations)

Platform:

- name, category: required
- name: unique

Genre:

- name: required and unique

Company:

- name: required and unique

InvolvedCompany:

- developer, publisher: required
- company_id and game_id should be a unique combination
- Test your models in the Rails console. Remember that the methods valid?, create and save trigger the validations. Use entity.errors, entity.errors.messages or entity.errors.full_messages to see the the entity errors.

## Controllers

## views

## Migration

Add default category to game

```bash
  $ rails g migration AddDefaultCategoryToGame
```

Migration

Documentation [change column default](https://apidock.com/rails/v5.2.3/ActiveRecord/ConnectionAdapters/SchemaStatements/change_column_default)

```sql
class AddDefaultCategoryToGame < ActiveRecord::Migration[7.0]
  def change
    # reversible do |dir|
    #   dir.up { change_column :games, :category, :integer, default: 0 }
    #   dir.down { change_column :games, :category, :integer, default: nil }
    # end

    change_column_default :games, :category, from: nil, to: 0
  end
end
```

When it is **uniquess: true** you must add a unique id in the field with a migration

```sql
class AddIndexNameToGame < ActiveRecord::Migration[7.0]
  # rails g migration AddIndexNameToGame name:string:uniq
  def change
    add_index :games, :name, unique: true
  end
end
```

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

==============================================================

#Authentication with Bcrypt

[Video de la clase eith Bcrypt](https://www.youtube.com/watch?v=u0eeldQpTwg&list=PLg-HAfJ6LTqXbEhcgIbUhHmos5wgdH8Ui&index=93)
[Video de la clase eith Bcrypt2](https://www.youtube.com/watch?v=Qx1Qeuf830c&list=PLg-HAfJ6LTqXbEhcgIbUhHmos5wgdH8Ui&index=94)
[Video de la clase eith Bcrypt device](https://us02web.zoom.us/rec/play/KlV95Z7b2uDMuEat-GrRJTPyxG47qG6gYSWG6wjeIvbPSwSYW5fUSP55k74ZDAIDvmMd4279VQpaANau.zhXwLk0By7r6bIBe?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fus02web.zoom.us%2Frec%2Fshare%2FzK-7xSBRd-PPxOt6hFp8DDdpmFy5cZ8p-_5UKjs0zuvZ-1-e8rPzgTsMZf_Ayh2r.P0AeBsonbHmFHo8U)

> Documentation [Bcrypt](https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password)

> 15 step to Authentication with Bcrypt [tutorial based ](https://gist.github.com/thebucknerlife/10090014)

**Apply this step if you already had the user table created**

```bash
rails g migration AddPasswordDigestToUser password_digest:string:uniq
```

Model User

```sql
class User < ApplicationRecord

  # => Macro
  has_secure_password
end
```

para utilizar en todos los controladores este id logueado lo creamos un metodo en aplication controller

en method create se captura la cookis y se agrega el usuario logueado por user id
![cookis](/img/notes/cookid.png)

#Authentication with Devise

[Video de la clase eith Bcrypt device en 1:06:24](https://us02web.zoom.us/rec/play/KlV95Z7b2uDMuEat-GrRJTPyxG47qG6gYSWG6wjeIvbPSwSYW5fUSP55k74ZDAIDvmMd4279VQpaANau.zhXwLk0By7r6bIBe?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fus02web.zoom.us%2Frec%2Fshare%2FzK-7xSBRd-PPxOt6hFp8DDdpmFy5cZ8p-_5UKjs0zuvZ-1-e8rPzgTsMZf_Ayh2r.P0AeBsonbHmFHo8U)

documentacion [Devise](https://github.com/heartcombo/devise#getting-started)

#Authentication with OmniAuth

[video de la clase de OmniAuth](https://us02web.zoom.us/rec/play/oviQJtTeh28FIWNpAq8cDI3cTbxXm3ctXRoaW1k1PTX1InQUALL9-Pfs0avQoVLmI6H8O3exOa7nEoGZ.dWDtx6y2cB54yGx8?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fus02web.zoom.us%2Frec%2Fshare%2FS3L5fKtSBlyyV6R3-8ONIrnS5VbWarpiiFnU3iv2WF_4jVMYNil72DhVZt0gEmG4.wmXqs-jolhV1-7k7)

Agregar el gem para correr .env

[OmniAuth GitHub](https://github.com/omniauth/omniauth-github)

[Register a new OAuth application](https://github.com/settings/applications/new)

[omniauth/omniauth](https://github.com/omniauth/omniauth/wiki)

##Tareas

> binding --blogs hacer

tarea SSR vs CSR
Cada vista de rails tiene un CSRF token
![tokens ssr](/img/notes/Token_ssr.png)

Look up a Rails HTTP Status Code
[Status Code](http://www.railsstatuscodes.com/unprocessable_entity.html)

necesitas aprender flash[:message] = "user logueado"
necesiatas cdocumentarte en los callbacks before_action y skip_before_action
