# application.rb

require 'sinatra'
require 'json'

set :logging, true

use Rack::Logger

helpers do
  def logger
    request.logger
  end
end

@@data = []
@@count = 0

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/todos' do
  content_type :json
   @@data.to_json
end

post '/todos' do
  content_type :json
  todo = JSON.parse(request.body.string).merge("id" => @@count += 1 )
  @@data << todo  
  todo.to_json
end

get '/todos/:id' do  
  content_type :json
  id = Integer(params[:id])
  if @@count<=id
	  'Sorry, I cannot find that todo'
  else
	@@data[id].to_json
  end
end  


put '/todos/:id' do
  content_type :json
  todo = JSON.parse(request.body.string)
  id = Integer(params[:id])
  index = @@data.index{|x|x["id"]==id}    
  
  @@data[index] = todo
  
end  



delete '/todos/:id' do
  content_type :json
  
  id = Integer(params[:id])
  index = @@data.delete_if{|x|x["id"]==id}    
end  

