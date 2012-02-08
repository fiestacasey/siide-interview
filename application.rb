require 'sinatra'
require 'json'
require 'sequel'


# db stuff 
DB = Sequel.connect(ENV['DATABASE_URL'] || 'sqlite:/')

DB.create_table? :todo do
	primary_key :id
	String          :text
	Boolean			:complete
end 

todos = DB[:todo] 

set :logging, true

use Rack::Logger

helpers do
  def logger
    request.logger
  end
end

get '/' do
	File.read(File.join('public', 'index.html'))
end

get '/todos' do
	content_type :json
	todos.all.to_json
end

post '/todos' do
	content_type :json
	request.body.rewind
	t = JSON.parse(request.body.read)
	id = todos.insert(t)
	t["id"] = id
	t.to_json
end

get '/todos/:id' do  
  content_type :json  
  todos.filter(:id=>params[:id]).to_json
end  

put '/todos/:id' do
	request.body.rewind
	t = JSON.parse(request.body.read)
	todo = todos.filter(:id=>params[:id])
	todo.update(t)
	t.to_json
end  

delete '/todos/:id' do
	content_type :json
	todo = todos.filter(:id=>params[:id])
	todo.delete
	todo.to_json
end  

