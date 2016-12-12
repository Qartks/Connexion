(function () {
    angular.module('Connexion').
    filter('searchpost', function() {
        return function(posts, searchText) {
            var out = [];
            var flag = 0;
            searchText = searchText.toUpperCase();
            angular.forEach(posts, function (post, key) {
                if (post.postName.toUpperCase().indexOf(searchText) !== -1) {
                    out.push(post);
                    return;
                }

                angular.forEach(post.tags, function (tag, key) {
                    if (tag.toUpperCase().indexOf(searchText) !== -1) {
                        flag = 1;
                        return;
                    }
                });

                if (flag === 1) {
                    out.push(post);
                    flag = 0;
                    return;
                }
            });


            return out;
        }
    });
})();