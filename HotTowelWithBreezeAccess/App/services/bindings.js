define(['services/logger'], function (logger) {
    logger.log('about to do binding');
    ko.bindingHandlers.wordCount = {
        update: function (elem, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var a = value.split(' ');
            $(elem).text(a.length);
        }
    }
});