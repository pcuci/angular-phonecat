'use strict';
// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('hello').
  component('hello', {
    templateUrl: 'core/hello/hello.template.html',
    controller: ['$routeParams', function helloController($routeParams) {
        var self = this;
        self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });
