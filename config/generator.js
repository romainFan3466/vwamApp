(function (_) {

	/**
	 * @param grunt
	 * @returns {Array} An array of tasks if specified, an array containing 'default' if none.
	 * @private
	 */
	var _getTasks = function (grunt) {
		var tasks = grunt.cli.tasks;
		if (tasks.length === 0) {
			tasks = grunt.cli.tasks = ["default"];
		}
		return tasks;
	};


	/**
	 * @param {Array} tasks An array of tasks.
	 * @returns {Boolean} true if the current task needs a target, false otherwise.
	 * @private
	 */
	var _needTarget = function (tasks) {
		return _.contains(tasks, "deploy")
			|| _.contains(tasks, "doc")
			|| _.contains(tasks, "default")
			|| _.contains(tasks, "archive");
	};


	/**
	 * @param grunt
	 * @param {Object} appConfig The app config file.
	 * @param {Object} targets A Map of targets.
	 * @param {String} targetName The specified target to retrieve.
	 * @returns {Object} The specified target with global keys appended.
	 * @private
	 */
	var _getTarget = function(grunt, appConfig, targetName) {
		var target= appConfig[targetName];
        grunt.log.write(appConfig.targetHost);
        return target;
	};


	// Public interface

	exports.getTasks = _getTasks;
	exports.needTarget = _needTarget;
	exports.getTarget = _getTarget;

})(require("lodash"));
