(function() {
    /**
     * @ngdoc function
     * @name classbuzz.errors
     * @description
     * Services of the class buzz errors
     */
    angular.module('classbuzz.errors')
        .factory('errorServices', ['$rootScope',  'apiServices', 'authenticationServices',
            function ($rootScope, apiServices, authenticationServices) {

                function postError(e){

                    var data = {err:e};
                    var _endpoint = '/public/logger';
                    return apiServices.POST(_endpoint, data);
                }


            var services = {

                logError: function(err, action){

                    var loggedUser = authenticationServices.getProfile();

                    var reason = null;
                    if (typeof err.data != "undefined") reason = err.data;

                    var e = {
                        statusCode: 500,
                        userMessage: reason,
                        timestamp: Date.now(),
                        message: action,
                        user: loggedUser.id,
                        origin: "Mobile APP",
                        platform: ionic.Platform.platform(),
                        stack: err.stack,
                        err: err
                    };


                    if (ionic.Platform.platforms[0] == "browser") {
                        console.error(e);
                    }

                    return postError(e);
                }

            };

            return services;
        }]);

})();

