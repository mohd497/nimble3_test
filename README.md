## Nimbl3 Search
This project will extract data from google search page having specific keywords. Generate a report showing counts of various links and url of those links. 

### System dependencies
* Ruby 2.3.1
* Postgresql
* Redis

### Gems 
* rails 4.2.6
* devise 
* doorkeeper
* sidekiq
* bootstrap-sass

### Setup guide
* change in database.yml file to your local credentials

```console
bundle install
rake db:create db:migrate
bundle exec sidekiq 

```
