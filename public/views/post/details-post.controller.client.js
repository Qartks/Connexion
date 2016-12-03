/**
 * Created by Vineeth on 12/2/16.
 */
(function () {
    angular
        .module("Connexion")
        .controller("DetailsPostController", DetailsPostController);
    function DetailsPostController() {
        var vm = this;

        function init(){
            jQuery(function(){
                jQuery('#details').show();
                jQuery('#images').hide();
                jQuery('#location').hide();

                jQuery('#details-button').click(function(){
                    jQuery('#details').show();
                    jQuery('#images').hide();
                    jQuery('#location').hide();
                });
                jQuery('#images-button').click(function(){
                    jQuery('#details').hide();
                    jQuery('#images').show();
                    jQuery('#location').hide();
                });
                jQuery('#location-button').click(function(){
                    jQuery('#details').hide();
                    jQuery('#images').hide();
                    jQuery('#location').show();
                });
            });
        }
        init()
        vm.post = {
            postName: "Pizza and Beer",
            isOpen: true,
            organizer: "Super Organizers",
            email: "superoganizers@superstar.com",
            phone: "+1 007007007",
            address: "381 Huntington Ave, Boston Ma",
            description: "Lore Ipsum Lore IpsumLore IpsumLore IpsumLore IpsumLore IpsumLore IpsumLore " +
            "IpsumLore IpsumLore IpsumLore IpsumLore IpsumLore IpsumLore Ipsum IpsumLore IpsumLore IpsumLore IpsumLore " +
            "IpsumLore IpsumLore Ipsum" ,
            dateCreated:  Date.now(),
            dateOfEvent: Date.now(),
            pictures: [
                {
                    type : "http://lorempixel.com/800/600/"
                },{
                    type : "http://lorempixel.com/800/600/"
                },{
                    type : "http://lorempixel.com/800/600/"
                }
            ],
            tags: [
                {
                    type : "food"
                }
            ],
            noOfPeopleInvited: 10,
            noOfPeopleGoing: 20,
            noOfPeopleTalkingAbout: 11,
            rating: 5
        }
        vm.sampleData = [
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Bob",
                "additional": "There are many variations of passages of Lorem"
            },
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Stephen",
                "additional": "There are many variations of passages of Lorem"
            },
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Remainder",
                "additional": "There are many variations of passages of Lorem"
            },
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Theorem",
                "additional": "There are many variations of passages of Lorem"
            },
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Flex",
                "additional": "There are many variations of passages of Lorem"
            },
            {
                "url":"http://lorempixel.com/800/600/",
                "comment":"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
                "name":"Andria",
                "additional": "There are many variations of passages of Lorem"
            },
        ];
    }
})();

