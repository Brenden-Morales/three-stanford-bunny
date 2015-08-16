/**
 * Created by brenden on 8/15/2015.
 */
var TriangulationPoints = function(options) {
    var self = this instanceof TriangulationPoints ? this : Object.create(TriangulationPoints.prototype);

    var numPoints = options.numPoints;
    var pointScalar = options.pointScalar;


    return self;
};