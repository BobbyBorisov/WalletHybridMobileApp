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

    function addExpense() {
        if(viewModel.expense.name.toString().length < 5) {
            alert("Name should be at least 5 characters");
            return;
        }
        
        if (viewModel.expense.categoryName.toString().length < 5) {
            alert("Category name should be at least 5 characters");
            return;
        }
        
        if (parseFloat(viewModel.expense.Price) <0) {
            alert("Price should be positive");
            return;
        }

        app.utilities.geolocation.getPosition()
            .then(function (position) {
                viewModel.expense.latitude = parseFloat(position.coords.latitude);
                viewModel.expense.longitude = parseFloat(position.coords.longitude);
                viewModel.expense.Price = parseFloat(viewModel.expense.Price);
                
                app.data.expenses.addNew(viewModel.expense)
                    .then(function () {
                        alert("Expenses added");
                        navigator.notification.vibrate(1000);
                        app.application.navigate("views/expenses.html");
                    }, function (error) {
                        alert("Error while adding a place");
                    });
            }, function (error) {
                alert("Could not retrieve your location.");
            });
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

    a.addExpense = {
        init: init
    };
}(app.viewModels));