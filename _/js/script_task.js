(function(){

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Helpers: {}
	};

	App.Helpers.template = function(id){
		return _.template( $( '#' + id ).html() );
	}

	App.Models.Task = Backbone.Model.extend({
		validate: function( attrs ){
			if( ! $.trim(attrs.title) ){
				return "A task requires a value.";
			}
		}
	});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		initialize: function(){
			this.collection.on('add', this.addOne, this);
		},

		render: function(){
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(task){
			var taskView = new App.Views.Task( {model: task} );
			this.$el.append(taskView.render().el);
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName : 'li',

		template: App.Helpers.template('taskTemplate'),

		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		events : {
			'click .edit' : 'editTask',
			'click .delete' : 'destroy'
		},

		editTask: function(){
			var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title') );

			if(!newTaskTitle) return;

			this.model.set('title', newTaskTitle, {validate: true});
		},

		destroy: function(){
			this.model.destroy();
		},

		remove: function(){
			this.$el.remove();
		},

		render: function(){
			var template = this.template( this.model.toJSON() );
			this.$el.html( template );
			return this;
		}
	});

	App.Views.AddTask = Backbone.View.extend({
		el : '#addTask',

		events : {
			'submit' : 'submit'
		},

		initialize: function(){

		},

		submit: function(e){
			e.preventDefault();
			
			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
			var task = new App.Models.Task({ title: newTaskTitle});
			this.collection.add(task);
			
			$(e.currentTarget).find('input[type=text]').val('');
		}
	});

	var tasksCollection = new App.Collections.Tasks([
		{
			title: 'Go to the store',
			priority: 4
		},
		{
			title: 'Go to the mall',
			priority: 3
		},
		{
			title: 'Get to work',
			priority: 5
		}
	]);

	var addTaskView = new App.Views.AddTask({ collection: tasksCollection});

	var tasksView = new App.Views.Tasks({ collection: tasksCollection});
	$('#myTasks').html(tasksView.render().el);

})();