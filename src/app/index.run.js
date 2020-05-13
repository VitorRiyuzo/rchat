(function() {
  'use strict';

  angular
    .module('rchat')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
