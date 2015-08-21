/**
 * Created by brenden on 8/15/2015.
 */

var renderer,camera,controls,scene,stats,points;

var initialize = function(){
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    //camera
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.1,100);
    camera.position.y = 30;

    //controls
    controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.staticMoving = false;

    //scene
    scene = new THREE.Scene();

    //stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    //get the bunny
    var req = new XMLHttpRequest();
    req.open("GET","bunnyobj.txt",true);
    req.onload = function(){
        var lines = this.responseText.split("\n");
        var vertices = [];
        var normals = [];
        var vertexNormals = [];
        var faces = [];

        //VERRTEX / NORMAL MAP TO REMOVE VERTICES WITHOUT NORMALS / AREN'T INCLUDED IN FACES?
        var vertexMap = {};

        var scale = 50;

        for(var i = 0; i < lines.length; i ++){
            if(lines[i].indexOf("vn ") === 0 ){
                var coords = lines[i].split(" ");
                normals.push(new THREE.Vector3(parseFloat(coords[1]),parseFloat(coords[2]),parseFloat(coords[3])));
            }
            else if (lines[i].indexOf("v ") === 0){
                var coords = lines[i].split(" ");
                vertices.push(new THREE.Vector3(parseFloat(coords[1]) * scale,parseFloat(coords[2]) * scale,parseFloat(coords[3]) * scale));
            }
            else if (lines[i].indexOf("f ") === 0){
                var coords = lines[i].split(" ");
                for(var j = 1; j < coords.length; j ++){
                    var vertNorm = coords[j].split("//");
                    var index = parseInt(vertNorm[0]) - 1;
                    vertexMap[index.toString()] = {
                        v : vertices[index],
                        n : normals[parseInt(vertNorm[1]) - 1]
                    }
                }
            }
        }

        var tempVerts = [];
        var tempNormals = [];
        for(var vert in vertexMap){
            if(vertexMap.hasOwnProperty(vert)){
                tempVerts.push(vertexMap[vert].v);
                tempNormals.push(vertexMap[vert].n);
            }
        }
        var p = new debugParticles({
            vertices : tempVerts,
            normals : tempNormals
        })
    };
    req.send();

    //start render loop
    animate();
};


function onWindowResize() {
    console.log("windowresize");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    stats.update();
    controls.update();
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}