(function(){

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id){
		return _.template( $( '#' + id ).html() );
	}

	App.Models.Person = Backbone.Model.extend({
		defaults : {
			name : 'John Doe',
			age : 30,
			occupation : 'worker'
		},

		fullName : function(){
			return this.firstName + " " + this.lastName;
		}
	});

	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person
	});

	App.Views.People = Backbone.View.extend({
		tagName : 'ul',

		render: function(){
			this.collection.each(function(person){
				var personView = new App.Views.Person({model: person});
				this.$el.append(personView.render().el);
			}, this);
			return this;
		}
	});

	App.Views.Person = Backbone.View.extend({
		tagName : "li",

		template: template('personTemplate'),

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});

	var peopleCollection = new App.Collections.People([
		{
			name: 'Don Desroches',
			age: 27,
			occupation: 'Developer'
		},
		{
			name: 'Susan Wells',
			age: 23,
			occupation: 'Barista'
		},
		{
			name: 'Meg Bish',
			age: 26,
			occupation: 'Designer'
		}]);

	var peopleView = new App.Views.People( {collection: peopleCollection} );

	$(document.body).append(peopleView.render().el);
})();