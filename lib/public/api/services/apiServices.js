(function () {
    /**
     * @ngdoc function
     * @name nodeAdmin.api
     * @description
     * Services of the griffinApp API
     */
    angular.module('nodeAdmin.api')

        .factory('apiServices', function ($http, $rootScope) {

            var APIServices = {

                /**
                 * Deprecated
                 * @param req
                 * @returns {*}
                 */
                apiRequest: function (req) {
                    req = addHeaders(req);
                    return $http(req);
                },

                _request: function (method, endpoint, data, params) {

                    var req = {
                        method: method,
                        url: $rootScope._config.baseURL + $rootScope._config.apiVersion + endpoint
                    };

                    if (typeof params != "undefined") req.params = params;
                    if (typeof data != "undefined") req.data = data;


                    req = addHeaders(req);

                    return $http(req);
                },

                GET: function (endpoint, params) {
                    return APIServices._request("GET", endpoint, undefined, params);
                },

                POST: function (endpoint, data, params) {
                    return APIServices._request("POST", endpoint, data, params);
                },

                PUT: function (endpoint, data, params) {
                    return APIServices._request("PUT", endpoint, data, params);
                },

                PATCH: function (endpoint, data, params) {
                    return APIServices._request("PATCH", endpoint, data, params);
                },

                DELETE: function (endpoint, data, params) {
                    return APIServices._request("DELETE", endpoint, data, params);
                }

            };

            function addHeaders (req) {

                req.headers = {};
                req.headers["Content-Type"] = 'application/json';
                return req;
            }

            return APIServices;
        });

})();
