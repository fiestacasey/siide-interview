$(function(){
  window.Todo = Backbone.Model.extend({

    defaults: function() {
      return {
        complete:  false
      };
    },
    toggle: function() {
      this.save({complete: !this.get("complete")});
    }

  });

  window.TodoList = Backbone.Collection.extend({
    model: Todo,
    url:'/todos',
    complete: function() {
      return this.filter(function(todo){ return todo.get('complete'); });
    },    
    remaining: function() {
      return this.without.apply(this, this.complete());
    }
  });

  window.Todos = new TodoList;
  window.TodoView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($('#item-template').html()),
    events: {
      "click a.todo-text": "edit",
      "click a.todo-destroy": "clear",
      "click a.todo-complete": "toggleComplete",
      "keypress .todo-input": "updateOnEnter"
    },

    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },
    setText: function() {
      var text = this.model.get('text');
      this.$('.todo-text').text(text);
      this.input = this.$('.todo-input');
      this.input.bind('blur', _.bind(this.close, this)).val(text);
    },
    toggleComplete: function() {
      this.model.toggle();
    },
    edit: function() {
		if(this.model.get("complete")) // can't edit if complete
			return false
      $(this.el).addClass("editing");
      this.input.focus();
    },
    close: function() {
      this.model.save({text: this.input.val()});
      $(this.el).removeClass("editing");
    },
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
    remove: function() {
      $(this.el).remove();
    },
    clear: function() {
      this.model.destroy();
    }
  });

  window.AppView = Backbone.View.extend({
    el: $("#content"),
    events: {
      "keypress #new-todo":  "enterred"
    },
    initialize: function() {
      this.input    = this.$("#new-todo");

      Todos.bind('add',   this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all',   this.render, this);

      Todos.fetch();
    },

    render: function() {
      
      
    },
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      $("#todo-list").append(view.render().el);
    },
    addAll: function() {
      Todos.each(this.addOne);
    },
    enterred: function(e) {
      var text = this.input.val();
      if (!text || e.keyCode != 13) return;
      Todos.create({text: text});
      this.input.val('');
    }
  });
  window.App = new AppView;

});
