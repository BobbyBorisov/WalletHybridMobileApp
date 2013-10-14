var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var container = null;

    function loadExpenseLocation(expense) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            expense.latitude + ',' + expense.longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                var address = data.results[0];
                expense.address = address.formatted_address;
                expense.mapAddress = "http://maps.google.com/maps?z=15&t=m&q=loc:" +
                    expense.latitude + "+" + expense.longitude;
                
                viewModel.expense = expense;
                app.application.navigate("views/singleExpense.html");
            }
        };
        
        request.send();
    }

    var viewModel = kendo.observable({
        expense: {}
    });

    function init(e) {
        container = e.view.element;
        kendo.bind(container, viewModel);
    }

    a.singleExpense = {
        init: init,
        loadExpenseLocation: loadExpenseLocation
    };
}(app.viewModels));