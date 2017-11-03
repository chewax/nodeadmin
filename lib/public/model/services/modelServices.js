angular.module('nodeAdmin.model')

    .factory('modelServices', ['$http', 'apiServices', function ($http, apiServices) {

        var services = {
            
            getModels: function (modelName) {
                
                // var _data = {
                //     q: searchFilter,
                //     limit: -1,
                //     customer: customerId
                // };

                // var _querystring = _.toQueryString(_data);
                // var endpoint = '/models' + _querystring;
                
                var endpoint = '/models';
                if (modelName) endpoint += '/' + modelName;
                return apiServices.GET(endpoint);
            },

            deleteRecord: function (modelName, recordId) {
                var endpoint = '/models/' + modelName + '/record/' + recordId;
                return apiServices.DELETE(endpoint);
            },

            getSchema: function (modelName) {
                var endpoint = '/models/' + modelName + '/schema/';
                return apiServices.GET(endpoint);
            },

            createRecord: function (modelName, record) {
                var endpoint = '/models/' + modelName;
                return apiServices.POST(endpoint, record);
            },

            updateRecord: function (modelName, record) {
                var endpoint = '/models/' + modelName;
                return apiServices.PUT(endpoint, record);
            },
        };

        return services;
    }]);
