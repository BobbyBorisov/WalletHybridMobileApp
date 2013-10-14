var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    function getAllExpenses() {
        app.data.expenses.getExpenses()
        .then(function (data) {
            
            viewModel.set("expenses", data.Result);
            console.log(data);
        }, function (error) {
            alert(error);
        });
    }

    function selectPlace(param) {
        app.viewModels.singleExpense.loadExpenseLocation(param.data);
    }

    var viewModel = kendo.observable({
        expenses: [],
        kilometers: "",
        selectPlace: selectPlace,
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        getAllExpenses();
    }

    a.expenses = {
        init: init
    };
}(app.viewModels));