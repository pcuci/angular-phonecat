'use strict';

xdescribe("Directive:", function () {
  describe("templates test", function () {
    var $compile;
    var $scope;
    var $httpBackend;
    var $templateCache;

    // Angular strips the underscores when injecting
    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_) {
       $compile = _$compile_;
       $scope = _$rootScope_.$new();
       $templateCache = _$templateCache_;

       $templateCache.put('app/core/hello/hello.template.html', '<div><h1>{{header}}</h1><p>{{text}}</p></div>');
    }));

    it("should render the header and text as passed in by $scope",
      inject(function() {
        // $compile the template, and pass in the $scope.
        // This will find your directive and run everything
        var template = $compile($templateCache.get('app/core/hello/hello.template.html'))($scope);

        // Set some values on your $scope
        $scope.header = "This is a header";
        $scope.text = "Lorem Ipsum";

        // Run a $digest cycle to update template with new data
        console.log('templateAsHtml', template.html());
        $scope.$digest();

        // Render the template as a string
        var templateAsHtml = template.html();

        // Verify that the $scope variables are in the template
        expect(templateAsHtml).toContain($scope.header);
        expect(templateAsHtml).toContain($scope.text);

        // Do it again with new values
        var previousHeader = $scope.header;
        var previousText = $scope.text;
        $scope.header = "A completely different header";
        $scope.text = "Something completely different";

        console.log('templateAsHtml', templateAsHtml);
        // Run the $digest cycle again
        $scope.$digest();
        templateAsHtml = template.html();
        console.log('templateAsHtml', templateAsHtml);
        expect(templateAsHtml).toContain($scope.header);
        expect(templateAsHtml).toContain($scope.text);
        expect(templateAsHtml).not.toContain(previousHeader);
        expect(templateAsHtml).not.toContain(previousText);
      }));
  });
});
