var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '3278',
	'X-Auth-Token': 'a56217af5b304ef4fe88a2b3f021dd73'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.addCard(cardObj);
	})
}
