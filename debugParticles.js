var debugParticles = function(options) {
    var self = this instanceof debugParticles ? this : Object.create(debugParticles.prototype);

    var vertices = options.vertices;
    var normals = options.normals;

    var geometry = new THREE.Geometry();
    for(var i = 0 ; i < vertices.length; i ++){
        geometry.vertices.push(vertices[i]);
    }

    var particles = new THREE.PointCloud(geometry,new THREE.PointCloudMaterial({size:0.01}));
    scene.add(particles);

    return self;
};