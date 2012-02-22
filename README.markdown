Technical Interview For [siide.com](http://www.siide.com/)
==========================================================
This is basic project running with Backbone.js front end and a Sinatra backend.

I used:

 * [Backbone.js](http://documentcloud.github.com/backbone/)
 * [Sinatra](http://www.sinatrarb.com/)
 
Requirements:
source 'http://rubygems.org'

gem 'sinatra'
gem 'json'
gem 'sequel'
gem 'sqlite3'

 * Build a single page web app using Sinatra for the backend. 
 * Backbone.js for the front end. 
 * You can use any database backend you'd like. ActiveRecord, Datamapper, Mongoid, straight MongoDB, straight SQL,  SQLite, anything really. At Siide we use Sequel but its not a requirement. You could even store it in memory.
 * Deploy it to Heroku. 
 * Use a public Github account as your repository, you can use a pseudonym if you'd like.
 * Keep track of any issues that got in your way, and roughly how long it took.
 
Application Requirements:

 * Create a Todo
 * List todos
 * Finish a todo
 * Delete a Todo

Notes:

 * I went with a simple few file application, I didn't want to overcomplicate such a simple task
 * Database access is done through Sequel on the Heroku shared postgres database
 * Prior to completing this I had never used Backbone, Sinatra or Sequel though I was familiar with Ruby, HTML and Javascript
	
Issues I ran into along the way:

 * I found that the most frustrating thing was that these technologies are used so much less than others I am used to. This meant there was a lot less documentation out there, but it also meant I was able to figure things out on my own which is much more satisfying.
 * I also had some issues when I started using a database instead of just holding the data in memory on the server.  What happened was when I added the gem for Sequel my request.body was empty, eventually I realized that something must be removing it and I just had to call rewind to get it back.

Time:
<table>
	<tr><td>research</td><td>~2 hours</td></tr>
	<tr><td>writing functional code</td><td>~2 hours</td></tr>
	<tr><td>cleaning up/styling</td><td>~1.5 hours</td></tr>
	<tr><td>adding sequel/database</td><td>~1.5 hours</td></tr>
	<tr><td>deploying</td><td>~0.5 hours</td></tr>
	<tr><td><b>total</b></td><td>~7.5 hours</td></tr>
</table>


To start server:
bundle install
rackup -p 3000 config.ru 