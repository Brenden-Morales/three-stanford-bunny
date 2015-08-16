/**
 * Created by brenden on 8/15/2015.
 */
var TriangulationPoints = function(options) {
    var self = this instanceof TriangulationPoints ? this : Object.create(TriangulationPoints.prototype);

    var numPoints = options.numPoints;
    var pointScalar = options.pointScalar;
    var pointSize = options.pointSize;

    self.points = [];

    for(var i = 0; i < numPoints; i++){
        //add initial cube
        var geometry = new THREE.BoxGeometry( pointSize, pointSize, pointSize);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.z = (Math.random() * pointScalar) - (pointScalar / 2);
        cube.position.x = (Math.random() * pointScalar) - (pointScalar / 2);
        self.points.push(cube);
    }

    return self;
};