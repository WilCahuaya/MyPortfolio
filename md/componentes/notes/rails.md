# Rails

> Documentacion [Click Here](https://guides.rubyonrails.org/)/

> [Cheap Shet](https://dev.to/ericchapman/my-beloved-ruby-on-rails-cheat-sheet-50pi)

---

## Rails CLI

Create a Rails application from scratch and we added --skip-test to avoid using Minitest (the default test engine) and to be able to add RSpec later.

```ruby
$ rails new . --database postgresql --skip-test
```

Add the gem **rubocop-rails** to the Gemfile and create the file **.rubocop.yml.**

```ruby
# Gemfile

group :development do
  ...
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  ...
end
```

```ruby
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

```ruby
$ git add .
$ git commit -m "Initial commit"
```

Other CLI

```ruby
# Create a new rails app
$ rails new project_name

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
```

## Models

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
