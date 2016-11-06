## Nimbl3 Search
This project will extract large amounts of data from the Google search results page and generate report.

### System dependencies
* Ruby 2.3.1
* Postgresql
* Redis

### Gems 
* rails 4.2.6
* authentication: devise, doorkeeper
* background process: sidekiq
* view & assets: bootstrap-sass

### Setup guide
* change in database.yml file to your local credentials

```console
bundle install
rake db:create db:migrate
bundle exec sidekiq 

```
