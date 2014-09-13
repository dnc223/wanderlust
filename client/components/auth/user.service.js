'use strict';

angular.module('wanderlustApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      addTour: {
        method: 'PUT',
        params: {
          id:'add'
        }
      }
    });
  });
