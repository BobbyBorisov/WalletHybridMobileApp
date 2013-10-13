var app = app || {};

app.viewModels = (function(){
    var getExpenses = function () {
            

            app.data.expenses.getExpenses()
            .then(function (result) {
                console.log(result);
                expensesViewModel.set("expenses", result);
            },
            function (errorData) {
                console.log(errorData);
            });
        };
    
    var expensesViewModel = kendo.observable({
        expenses: [],
        category: "football", // TODO : empty string
        
        goToExpenses: function (ev) {
            var id = $(ev.delegateTarget).data("id");
            betMania.router.navigate("/match/" + id);
        },
        init: function(e){
            kendo.bind(e.view.element,expensesViewModel);
            console.log(expensesViewModel);
            getExpenses();
        }
    });
    
    return {
        expensesViewModel: expensesViewModel
    };
}());