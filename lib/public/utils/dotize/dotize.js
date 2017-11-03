(function() {
    angular.module('dotize', [])
        .factory(
            '$dotize',
            function() {

                //return $window._;
                var d = window.dotize;

                // OPTIONAL: Delete the global reference to make sure
                // that no one on the team gets lazy and tries to reference the library
                // without injecting it.
                delete(window.dotize);

                // Return the [formerly global] reference so that it can be injected
                // into other aspects of the app.
                return (d);
            });
})();
