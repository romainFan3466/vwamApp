/**
 * @ngdoc filter
 * @name appModule.filter:byType
 * @kind function
 *
 * @description
 * Creates a new array of string which contain a given type (or search filter).  The elements
 * are taken from the source array.You have to provide an object as `types` which the filter will use and create
 * and array by comparing patterns.
 *
 * @param {Array} input Source array where each object have to own a proprity `type`.
 * @param {object} types Object type of boolean like :
 * <pre>
    var types = {
        outside : true,
        inside : false,
        other , false
    };
 * @returns {Array} A new sub-array with type filter is applied.
 *
 */
AppModule.filter('byType', function () {
    return function (items, types) {
        var out=[];

        angular.forEach(items, function (item, key) {
            if (types[item.type] === true) {
                out.push(item);
            }
        });

        return out;
    };
});
