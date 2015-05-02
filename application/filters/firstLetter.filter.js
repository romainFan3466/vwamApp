/**
 * @ngdoc filter
 * @name appModule.filter:firstLetter
 * @kind function
 *
 * @description
 * Creates a new array of string starting with a given character. The elements
 * are taken from the source array. If the provided source array contains objects where the string is required,
 * you must indicate the propriety.
 *
 * @param {Array} input Source array
 * @param {string} letter letter used to sort the source array, use "0-9" for string starting by a digit.
 * @param {string} prop Propriety which contains a string ( optional)
 * @returns {Array} A new sub-array of source array, whith string starting by letter `letter`.
 *     had less than `limit` elements.
 *
 *
 *
 */
AppModule.filter('firstLetter', function () {
    return function (input, letter, prop) {

        input = input || [];
        var out = [];

        if (letter==="0-9") {
            input.forEach(function (item) {
                var itembis = (prop)? item[prop]: item;
                if (/^\d.*/.test(itembis)) {
                    out.push(item);
                }
            });
        }
        else{
            input.forEach(function (item) {
                var itembis = (prop)? item[prop]: item;
                if (itembis.charAt(0).toUpperCase() == letter) {
                    out.push(item);
                }
            });
        }

        return out;
    }
});
