var _ = require('underscore')
var async = require('async')
var Carapace = require('carapace')
var Crop = require('../lib/')
var should = require('should')

should.not.exist(null)

describe('browser', function(){

    var original
    var cropped

    before(function(done){
        original = Carapace.Image.create('/magritte.png')
        cropped = Carapace.Image.create('/magritte-cropped.png')
        async.parallel([
            _.bind(original.load, original),
            _.bind(cropped.load, cropped)
        ], done)
    })

    it('should crop the canvas', function(done){
        original.el.width.should.equal(1600)
        original.el.height.should.equal(1064)
        Carapace
            .create(original.el)
            .run([
                Crop.create({
                    width: 400,
                    height: 400,
                    left: 400,
                    top: 400
                })
            ], function(err, canvas){
                if (err) throw err
                canvas.width.should.equal(400)
                canvas.height.should.equal(400)
                Carapace.util
                    .compare(canvas, Carapace.Canvas.create(cropped.el))
                    .should.equal(true)
                return done()
            })
    })

})
