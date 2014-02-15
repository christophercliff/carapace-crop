var _ = require('underscore')
var assert = require('assert')
var Carapace = require('carapace')

module.exports = Carapace.Job.extend({

    id: 'crop',

    runSync: function (canvas, options) {

        assert(_.isNumber(options.width) && options.width > 0, '`width` option must be a number')
        assert(_.isNumber(options.height) && options.height > 0, '`height` option must be a number')
        assert(!options.left || _.isNumber(options.left), '`left` option should be a number')
        assert(!options.top || _.isNumber(options.top), '`top` option should be a number')

        var scratch = Carapace.Canvas.create()
        var context = scratch.getContext('2d')

        options.left = options.left || 0
        options.top = options.top || 0

        scratch.width = options.width
        scratch.height = options.height

        context.drawImage(canvas, options.left, options.top, options.width, options.height, 0, 0, options.width, options.height)

        return scratch
    }

})
