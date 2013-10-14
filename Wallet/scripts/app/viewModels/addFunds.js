var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var fundsToAdd = {
        amount: "",
        balance:"",
    };
    
    var container = null;
    
    
    function addFunds() {
        if (parseFloat(viewModel.fund.amount) <0) {
            alert("Amount should be positive");
            return;
        }
        var amount = parseFloat(viewModel.fund.amount);
        var oldBalance = parseFloat(app.data.balance());
        //app.data.balance(newBalance);
        var newBalance = amount + oldBalance;
        app.data.balance(newBalance);
    }

    var viewModel = kendo.observable({
        fund: fundsToAdd,
        addFunds: addFunds
    });

    function init(e) {
        container = e.view.element;
        kendo.bind(container, viewModel);
        viewModel.fund.balance = parseFloat(app.data.balance());
    }

    a.addFunds = {
        init: init
    };
}(app.viewModels));