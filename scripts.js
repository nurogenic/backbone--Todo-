;(function( $, w, d, undefined ){
	$(function(){

		var TodoModel = Backbone.Model.extend({
			
			defaults : {
				title : '',
				completed : false
			},

			initialize: function(){
				this.on('change:title', function(){
					console.log('- Values for this model have changed.');
				});
			},

			setTitle: function(newTitle){
				this.set({ title: newTitle });
			}
		});

		var TodoView = Backbone.View.extend({
			
			tagName: 'li',
			className : 'item-view',
			id : '',
			el : 'itemTemplate',
			
			// Cache the template function for a single item.
			todoTpl: _.template( "#item-template" ),
			
			events: {
				'dblclick label': 'edit',
				'keypress .edit': 'updateOnEnter',
				'blur .edit': 'close',
				'click' : 'click'
			},

			// Rerender the titles of the todo item.
			render: function() {
				this.$el.html( this.todoTpl( this.model.toJSON() ) );
				this.input = this.$('.edit');
				return this;
			},
			
			edit: function() {
				// executed when todo label is double-clicked
			},
			
			close: function() {
				// executed when todo loses focus
			},

			click: function(e) {
				console.log( view.el === e.target );
			},

			updateOnEnter: function( e ) {
				// executed on each keypress when in todo edit mode,
				// but we'll wait for enter to get in action
			}

		});

		var TodoRouter = Backbone.Router.extend({
			/* define the route and function maps for this router */
			routes: {
				"about" : "showAbout",
				"search/:query" : "searchTodos",
				"search/:query/p:page" : "searchTodos"
			},

			showAbout: function(){
				
			},

			searchTodos: function(query, page){
				var page_number = page || 1;
				console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
			}
		});

		var myTodoRouter = new TodoRouter();

		Backbone.history.start();

		var todoView = new TodoView();
		// log reference to a DOM element that corresponds to the view instance

		w.item = new TodoModel({
			title : 'Learn Backbone'
		});

	});
})( jQuery, window, document );