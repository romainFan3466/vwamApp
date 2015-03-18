AppModule.controller("CreateInvoiceController",[
    "$scope", "$log",
    function ($scope, $log) {

        $scope.companies = [

   { name: "sandroller",zip:"566"},
            { name: "interieur caisse",zip:"566"},
            { name: "interieur benne",zip:"566"},
            { name: "exterieur benne",zip:"566"},
            { name: "interieur remorque",zip:"566"},
   { name: "prestruggle",zip:""},
   { name: "mirepoix",zip:"6789"},
   { name: "montenegro",zip:""},
   { name: "sulpha",zip:""},
   { name: "cornfed",zip:"4567"},
   { name: "nonjudicable",zip:""},
   { name: "amadan",zip:""},
   { name: "dilater",zip:""},
   { name: "parvenu",zip:""},
   { name: "hypothecating",zip:""},
   { name: "wollongong",zip:""},
   { name: "dupont",zip:""},
   { name: "rounder",zip:""},
   { name: "semihibernation",zip:"4567"},
   { name: "asunci",zip:""},
   { name: "unissued",zip:""},
   { name: "goldcup",zip:""},
   { name: "nonexculpation",zip:""},
   { name: "administrable",zip:""},
   { name: "gregg",zip:""},
   { name: "uncolorable",zip:"3422"},
   { name: "pseudoparalysis",zip:""},
   { name: "vitalizing",zip:""},
   { name: "nonhistoric",zip:""},
   { name: "theocratically",zip:""},
   { name: "peroxy",zip:""},
   { name: "nutcase",zip:""},
   { name: "pawnbroker",zip:""},
   { name: "civvy",zip:""},
   { name: "blankbook",zip:""},
   { name: "unapplausive",zip:""},
   { name: "reeler",zip:""},
   { name: "toffy",zip:""},
   { name: "recondite",zip:""},
   { name: "illinois",zip:""},
   { name: "fossarian",zip:""},
   { name: "rabblement",zip:""},
   { name: "unblurred",zip:""},
   { name: "broadloom",zip:""},
   { name: "peddlingly",zip:""},
   { name: "metastable",zip:""},
   { name: "kittyhawk",zip:""},
   { name: "bushpig",zip:""},
   { name: "unfitness",zip:""},
   { name: "arillate",zip:""},
   { name: "jockey",zip:""},
   { name: "bullpen",zip:""},
    {name:  "nonsimulate",zip:""}
        ];

        $scope.coordonnate = {
            address : "rue des printemps",
            zip : "60000",
            contry : "france"
        };

        $scope.value ="";

        $scope.onSelect = function ($item, $model, $label) {
            $scope.item = $item;
        };


    }
]);
