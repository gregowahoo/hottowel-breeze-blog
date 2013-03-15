define(['services/logger'], function (logger) {
    // service name is route to the Web API controller
    var serviceName = 'api/BreezeSample';

    // manager is the service gateway and cache holder
    var manager = new breeze.EntityManager(serviceName);

    // define the view model
    var vm = {
        todos: ko.observableArray(),
        includeDone: ko.observable(false),
        save: saveChanges,
        show: ko.observable(false),
        //Code for SignalR
        messageToSend: ko.observable(""),
        messageReceived: ko.observable(""),
        sendMessage: sendMessage,
        //Code for SignalR
        activate: activate
    };

    function activate() {
        // start fetching Todos
        return getTodos();
    }
    // start fetching Todos
    //getTodos(); 

    //Code for signalr below    
    function sendMessage() {
        logger.log("sending message to server: '" + vm.messageToSend() + "'");
        sig.server.hello(vm.messageToSend());
    }

    function refreshPages() {
        logger.log("sending a refresh page to the server");
        sig.server.refreshPages();
    }

    var sig = $.connection.myHub1;

    $.connection.hub.start().done(function () {
        vm.sendMessage;
    });

    sig.client.helloToAll = function (what) {
        vm.messageReceived(what);
        logger.log('Server says: ' + what, null, 'home', true);
    }

    sig.client.refreshToDos = function () {
        logger.log('Server is asking to refresh page', null, 'home', false);
        getTodos();
    }
    //Code for signalr above

    // re-query when "includeDone" checkbox changes
    vm.includeDone.subscribe(getTodos);       

    return vm;

    // bind view to the viewmodel
    //ko.applyBindings(vm);

    //#region private functions

    // get Todos asynchronously
    // returning a promise to wait for     
    function getTodos() {

        logger.log("querying Todos");

        var query = breeze.EntityQuery.from("Todos");

        if (!vm.includeDone()) {
            query = query.where("IsDone", "==", false);
        }

        return manager
            .executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        // reload vm.todos with the results 
        function querySucceeded(data) {
            logger.log("queried Todos");
            vm.todos(data.results);
            vm.show(true); // show the view
        }
    };

    function queryFailed(error) {
        logger.error("Query failed: " + error.message);
    }

    function saveChanges() {
        return manager.saveChanges()
            .then(function () {
                logger.log("changes saved");
                //Code for SignalR below                
                refreshPages();
                //Code for SignalR above
            })
            .fail(saveFailed);
    }

    function saveFailed(error) {
        logger.log("Save failed: " + error.message);
    }
    //#endregion    


});