'use strict';

angular.module('nodeAdmin.model')

    .controller('EditRecordCtrl', function ($uibModalInstance, $scope) {
        var $ctrl = this;

        $ctrl.newRecord = $scope.editingRecord;
        
        $ctrl.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        $ctrl.altInputFormats = ['M!/d!/yyyy'];
        
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.newRecord);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        $ctrl.openDateTime = function(field) {
            $ctrl.newRecord[field.path]['opened'] = true;
        };
});