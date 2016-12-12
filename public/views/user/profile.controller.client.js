(function () {
    angular
        .module("Connexion")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, PageService, $location, $rootScope, PostService, UserService, $mdSidenav, ToastService) {

        var vm = this;
        vm.user = {};
        vm.data = [];
        vm.posts = [];
        vm.loggedInUser = '0';
        vm.userId = $routeParams.userId;
        init();


        vm.typeOfPost = typeOfPost;
        vm.goToSearch = goToSearch;
        vm.goToCreatePost = goToCreatePost;
        vm.goToPostDetails = goToPostDetails;
        vm.editThisProfile = editThisProfile;
        vm.deleteThisProfile = deleteThisProfile;
        vm.isThisMine = isThisMine;
        vm.isLoggedIn = isLoggedIn;
        vm.openPost = openPost;
        vm.logout = logout;
        vm.goBack = goBack;
        vm.slider = {
            value: 5,
            options: {
                id: 'slider-id',
                onStart: function(id) {
                },
                onChange: function(id) {
                },
                onEnd: function(id) {
                    updateRating();
                }
            }
        };
        var updateRating = function() {
            if(typeof(vm.user.rating) === "object") {
                vm.user.rating[vm.loggedInUser._id] = vm.slider.value;
            } else {
                vm.user.rating = {};
                vm.user.rating[vm.loggedInUser._id] = vm.slider.value;
            }
            var sum = 0;
            var count = 0;
            for (var key in vm.user.rating) {
                sum+= Number(vm.user.rating[key]);
                count++;
            }
            if(count == 0)
                vm.rating = new Array(1);
            else {
                vm.rating = new Array(Math.floor(sum / count));
            }
            UserService.updateUser(vm.user)
                .success(function (succ) {

                }).error(function (err) {

            });
        };

        function getRating() {
            var sum = 0;
            var count = 0;
            for (var key in vm.user.rating) {
                sum+= Number(vm.user.rating[key]);
                count++;
            }
            if(count == 0)
                vm.rating = new Array(1);
            else {
                vm.rating = new Array(Math.floor(sum / count));
            }

            return vm.rating;
        }


        vm.toggleLeft = toggleLeft('left');
        function toggleLeft(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }

        function isLoggedIn() {
            return vm.loggedInUser !== '0';
        }

        function isThisMine() {
            return vm.loggedInUser._id === vm.userId || vm.loggedInUser.role==="admin";

        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                })
        }

        function deleteThisProfile() {
            UserService
                .deleteUser(vm.userId)
                .success(function (page) {
                    $location.url("/login");
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        function init() {

            UserService
                .getLoggedInUser()
                .success(function (user) {
                    vm.loggedInUser = user;
                });

            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    // vm.slider.value = getRating();
                    var sum = 0;
                    var count = 0;
                    for (var key in user.rating) {
                        sum+= Number(user.rating[key]);
                        count++;
                    }
                    if(count == 0)
                        vm.rating = new Array(1);
                    else
                        vm.rating = new Array(Math.floor(sum / count));
                    PostService
                        .getPostCreatedByUserId(user._id)
                        .success(function (posts) {
                            vm.posts = posts;
                        })
                        .error(function (err) {
                            console.log(err);
                        });
                })
                .error(function (err) {
                    console.log(err);
                });

            PostService.getPostByUserId(vm.userId)
                .success(function (posts) {
                    vm.data = posts;
                })
                .error(function (err) {
                    console.log(err);
                });
        }


        function goBack() {
            $location.url(PageService.getPrevPage());
        }
        function editThisProfile() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url("/user/profile/"+ vm.userId +"/edit");
        }

        function goToPostDetails(post) {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url('/user/post/' + post._id);
        }

        function openPost(post) {
            return post.isOpen ? "green" : "blue";
        }

        function typeOfPost(post, type) {
            if ( type === 1) {
                var index = post.going.indexOf(vm.userId);
                return index !== -1
            } else if ( type === 2) {
                var index = post.interested.indexOf(vm.userId);
                return index !== -1
            } else if ( type === 3) {
                return post.creatorId === vm.userId;
            }
        }

        function goToSearch() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            $location.url('/user/search');
        }

        function goToCreatePost() {
            PageService.setPrevPage('/user/profile/'+ vm.userId);
            if (vm.loggedInUser !== '0' ) {
                $location.url('/user/post/new');
            } else {
                ToastService.showToast('You need to login!');
            }
        }
    }
})();