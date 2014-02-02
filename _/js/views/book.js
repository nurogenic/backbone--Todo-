var app = app || {};
app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template( $('#bookTemplate').html() ),
	render: function() {
		// tmpl is a function that takes a JSON object and returns html
		// this.el is what we defined in tagName. use $el to get access
		// to jQuery html() function
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
});