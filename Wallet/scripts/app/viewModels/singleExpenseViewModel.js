var app = app || {};

app.viewModels = (function(){
    var singleExpenseViewModel = kendo.observable({
        expense:[],
        init: function(e){
            kendo.bind(e.element.view,singleExpenseViewModel);
        }
       
    });
    
    return {
        singleExpenseViewModel: singleExpenseViewModel
    };
}());