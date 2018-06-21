function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'Untitled';
	this.element = createCard();

	function createCard() {
		var card = $('<li>').addClass('card');
		var cardDescription = $('<p>').addClass('card-description').text(self.name);
		var cardDelete = $('<button>').addClass('btn-delete').text('x');
		var cardEdit = $('<button>').addClass('btn-edit').text('/')

		cardDelete.click(function(){
			self.removeCard();
		});

		cardEdit.click(function(){
      		self.editCard();
   		 });

		card.append(cardDelete)
			.append(cardEdit)
			.append(cardDescription);

		return card;
	}
}
editCard: function() {
    var self = this;
    var newName = prompt('Enter a new name of card',
      this.element.children('.card-description').text());
    var columnId = this.element.closest('.column').attr('id');
    
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'PUT',
      data: {
        id: self.id,
        name: newName,
        bootcamp_kanban_column_id: columnId
      },
      success: function(response) {
        self.element.children('.card-description').text(newName);
      }
    });
  }

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove();
			}
		});	
	}
}