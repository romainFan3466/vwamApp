/**
 * @ngdoc filter
 * @name appModule.filter:slice
 * @kind function
 *
 * @description
 * Note : This filter is taken from AngularJs 1.4 RC, with some fixes.
 * ----
 *
 * Creates a new array or string containing only a specified number of elements. The elements
 * are taken from either the beginning or the end of the source array, as specified by
 * the value of `limit` and `begin`.
 *
 * @param {Array} input Source array or string to be limited.
 * @param {string|number} limit The limit from the source array
 * @param {string|number} begin The offset from the source array
 *
 * @returns {Array} A new sub-array  of length `limit` or less if input array
 *     had less than `limit` elements
 *
 */
AppModule.filter('slice', function() {
    return function(input, limit, begin) {
        if (Math.abs(parseInt(limit)) === Infinity) {
            limit = parseInt(limit);
        } else {
            limit = parseInt(limit);
        }
        if (isNaN(limit)) return input;
        if (angular.isNumber(input)) input = input.toString();
        if (!angular.isArray(input) && !angular.isString(input)) return input;

        begin = (!begin || isNaN(begin)) ? 0 : parseInt(begin);
        begin = (begin < 0 && begin >= -input.length) ? input.length + begin : begin;

        if (limit >= 0) {
            return input.slice(begin, limit);
        } else {
            if (begin === 0) {
                return input.slice(limit, input.length);
            } else {
                return input.slice(Math.max(0, begin + limit), begin);
            }
        }
    };
});