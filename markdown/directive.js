app.directive('markdown', ['$window', '$compile', function($window, $compile){
  var marked = $window.marked;
  var hljs = $window.hljs;

  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      var md = (function() {
        marked.setOptions({
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          highlight: function(code, lang) {
            return lang ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
          }
        });

        // options should be {parseCheckboxes: true} if we want to
        // parse checkboxes in a readme
        var toHtml = function(markdown, options) {
          if (markdown === undefined) {
            return '';
          }

          if (options && options.parseCheckboxes) {
            markdown = parseCheckboxes(markdown);
          }
          if (options && options.parseHashLinks) {
            markdown = parseHashLinks(markdown);
          }

          return marked(markdown);
        };

        var parseHashLinks = function(mdText) {
          var m;
          var r = /\[(.*)\]\(#([0-9a-zA-Z\-]+)\)/;

          while (mdText && mdText.match(r)) {
            m = mdText && mdText.match(r);
            mdText = mdText.replace(r, '<a ng-click="scrollTo(\'' + m[2] + '\')">' + m[1] + '</a>');
          }

          return mdText;
        };

        var parseCheckboxes = function(mdText) {
          var m;
          var i = 0;
          var r = /^(\s*(?:\-|\*|\d+\.)\s*)\[\s*[xX]?\s*\]\s*/m;

          while (mdText && mdText.match(r)) {
            m = mdText && mdText.match(r);
            mdText = mdText.replace(r, m[1] + '<input type="checkbox" class="readme-checkbox" name="task-' + (i += 1) + '">');
          }

          return mdText;
        };

        hljs.tabReplace = '  ';

        return {
          toHtml: toHtml,
          parseCheckboxes: parseCheckboxes
        };
      }());
      scope.$watch(attrs.ngModel, function(value) {
        // Relative paths that have colons in them are perceived as protocols
        var html = md.toHtml(value, {
          parseCheckboxes: true,
          parseHashLinks: true
        });

        html = html.replace(/href="(http)?(.+)"/gi, function(match) {
          if(arguments[1]) return match;
          return match.replace(/href=".+"/gi, 'href="http://localhost:3000/app?branch=master&widget=test&children=markdown&data=http://54.191.127.180,master,' + arguments[2] + '.md"');
        });
        element.html(html);

        $compile(element.contents())(scope);
      });
    }
  }
}]);
