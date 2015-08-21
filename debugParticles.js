var debugParticles = function(options) {
    var self = this instanceof debugParticles ? this : Object.create(debugParticles.prototype);

    var vertices = options.vertices;
    var normals = options.normals;

    //first do points
    var geometry = new THREE.Geometry();
    for(var i = 0 ; i < vertices.length; i ++){
        geometry.vertices.push(vertices[i]);
    }

    var particles = new THREE.PointCloud(geometry,new THREE.PointCloudMaterial({size:0.01}));
    scene.add(particles);

    //then do normals
    var lineGeometry = new THREE.BufferGeometry();
    var lineMaterial = new THREE.LineBasicMaterial({color:0xff0000});

    var positions = new Float32Array(vertices.length * 2 * 3);

    for(var i = 0; i < vertices.length; i ++){
        positions[i*6] = vertices[i].x;
        positions[i*6+1] = vertices[i].y;
        positions[i*6+2] = vertices[i].z;

        var norm = normals[i];
        if(norm !== undefined){
            norm = norm.normalize();
            norm = norm.divideScalar(50);
        }
        else{
            norm = new THREE.Vector3(0.25,0.25,0.25);
        }

        positions[i*6+3] = vertices[i].x + norm.x;
        positions[i*6+4] = vertices[i].y + norm.y;
        positions[i*6+5] = vertices[i].z + norm.z;
    }

    lineGeometry.addAttribute("position",new THREE.BufferAttribute(positions,3));
    var lineMesh = new THREE.Line(lineGeometry,lineMaterial,THREE.LinePieces);
    scene.add(lineMesh);

    return self;
};