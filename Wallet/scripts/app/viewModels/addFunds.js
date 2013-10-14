var app = app || {};
app.viewModels = app.viewModels || {};

(function (a) {
    var expenseToAdd = {
        name: "",
        PictureUrl: "http://i.imgur.com/vLNkdqj.jpg",
        price:0,
        latitude: 0,
        longitude: 0,
        categoryName:""
    };
    var container = null;

    function addFunds() {
        if (parseFloat(viewModel.expense.Price) <0) {
            alert("Price should be positive");
            return;
        }

        //app.data.
    }

    function takePicture() {
        viewModel.expense.pictureUrl = "styles/images/loading.gif";
        kendo.bind(container, viewModel);
        
        app.utilities.camera.takePicture().then(function(url) {
            viewModel.expense.pictureUrl = url;
            kendo.bind(container, viewModel);
        }, function() {
            alert("Could not get picture from camera");
        });
    }

    

    var viewModel = kendo.observable({
        expense: expenseToAdd,
        addExpense: addExpense,
        takePicture: takePicture
    });

    function init(e) {
        container = e.view.element;
        kendo.bind(container, viewModel);
    }

    a.addFunds = {
        init: init
    };
}(app.viewModels));