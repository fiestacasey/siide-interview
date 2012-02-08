require 'rubygems'
require 'sinatra.rb'
require './application'

set :env, (ENV['RACK_ENV'] ? ENV['RACK_ENV'].to_sym : :development)


run Sinatra::Application
