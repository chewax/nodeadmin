'use strict';

angular.module('nodeAdmin.core')

    .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
        var $ctrl = this;
        
        $ctrl.ok = function () {
            $uibModalInstance.close();
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

});