/// <reference path="../libs/_references.js" />
var app = app || {};

app.data = (function () {
    var balance = function (newBalance) {
        if (newBalance) {
            localStorage.setItem("balance", newBalance);
        }
        else {
            return localStorage.getItem("balance");
        }
    };

    var saveUserData = function(user){
        localStorage.setItem("Authorization", user.sessionKey);
        localStorage.setItem("nickname", user.nickname);
        balance(user.balance);
    }

    var clearUserData = function () {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("nickname");
        localStorage.removeItem("balance")
    }

    var loadUserData = function(){
        sessionKey = localStorage.getItem("Authorization");
    }

    var getNickname = function(){
        return localStorage.getItem("nickname");
    }

    var getSessionKey = function () {
        return localStorage.getItem("Authorization");
    }
    
    var isUserLogged = function(){
        var sessionkey = localStorage.getItem("Authorization");
        var nickname = localStorage.getItem("nickname");

        if (!sessionkey || !nickname) {
            return false;
        }
        return true;
    }

    var DataPersister = Class.create({
        init: function (baseUrl) {
            this.baseUrl = baseUrl;
            this.users = new UsersPersister(baseUrl);
            this.expenses = new ExpensesPersister(baseUrl + "/Purchases");
        },
        isUserLogged: function(){            
            return isUserLogged();
        },
        loadUserData:function(){
            loadUserData();
        },
        getNickname: function(){
            return getNickname();
        },
        balance: balance
    });

    var UsersPersister = Class.create({
        init: function(baseUrl){
            this.baseUrl = baseUrl;
        },
        login: function(username, password){
            var user = {
                username: username,
                password: CryptoJS.SHA1(username + password).toString(),
                grand_type:"password"
            }

            return betMania.requester.postJSON(this.baseUrl + "/oauth/token", user)
                .then(function (result) {
                    saveUserData(result);
                    return result;
                });
        },
        register: function (username, password, nickname,email) {
            var user = {
                username: username,
                displayname: nickname,
                email: email,
                password: CryptoJS.SHA1(username + password).toString()
                
            }

            return app.requester.postJSON(this.baseUrl + "/Users", user).
                then(function (result) {
                    saveUserData(result);
                    return result;
                });
        },
        logout: function () { 
            var headers = {
                "X-sessionKey": getSessionKey()
            }

            return app.requester.putJSON(this.baseUrl + "logout", {}, headers)
                .then(function () {
                    clearUserData();
                });
        },
        addMoney: function (ammount) {
            var headers = {
                "X-sessionKey": getSessionKey()
            }

            return app.requester
                .putJSON(this.baseUrl + "addmoney/" + ammount, {}, headers)
                .then(function (result) {
                    var newBalance = parseFloat(result);
                    balance(newBalance);
                    return newBalance;
                });
        },
    });

    var ExpensesPersister = Class.create({
        init: function (baseUrl) {
            this.baseUrl = baseUrl;
        },
        /* takes options {} with properties category, status, my, page, take
        * {category:"football",my:true}
        */
        getExpenses: function (options) {
            var headers = {
                "Authorization": "Bearer ${"+getSessionKey()+"}"
            };

            return app.requester.getJSON(this.baseUrl, headers);           
        },

        getSingleExpense: function (id) {
            var headers = {
                "Authorization": "Bearer ${"+getSessionKey()+"}"
            }
            var url = this.baseUrl + id;
            return app.requester.getJSON(url, headers);
        },

        addNew: function (expense) {
            if (!expense) {
                throw new {"message":"expense is undefined!"}
            }

            var headers = {
                "Authorization":  "Bearer ${"+getSessionKey()+"}"
            }

            return app.requester.postJSON(this.baseUrl, expense, headers);
        },

    });   

    return new DataPersister("https://api.everlive.com/v1/B9dkUUz4uliHPfwQ"); 
}());
