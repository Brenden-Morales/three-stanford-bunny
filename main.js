/**
 * Created by brenden on 8/15/2015.
 */

var renderer,camera,controls,scene,stats;

var initialize = function(){
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement);

    //camera
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,200);
    camera.position.z = 5;

    camera.position.y = 5;
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

    //add initial cube
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

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