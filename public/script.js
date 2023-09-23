import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
// import {
//   OrbitControls
// } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FontLoader.js';


let camera, scene, renderer;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init( ) {

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 0, 600 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  const loader = new FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

    const color = 0x0066FF;

    const matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    const matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    const message = 'DcKim';

    const shapes = font.generateShapes( message, 100 );

    const geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    const text = new THREE.Mesh( geometry, matLite );
    text.position.z = - 150;
    scene.add( text );

    // make line shape ( N.B. edge view remains visible )

    const holeShapes = [];

    for ( let i = 0; i < shapes.length; i ++ ) {

      const shape = shapes[ i ];

      if ( shape.holes && shape.holes.length > 0 ) {

        for ( let j = 0; j < shape.holes.length; j ++ ) {

          const hole = shape.holes[ j ];
          holeShapes.push( hole );

        }

      }

    }

    shapes.push.apply( shapes, holeShapes );

    const lineText = new THREE.Object3D();

    for ( let i = 0; i < shapes.length; i ++ ) {

      const shape = shapes[ i ];

      const points = shape.getPoints();
      const geometry = new THREE.BufferGeometry().setFromPoints( points );

      geometry.translate( xMid, 0, 0 );

      const lineMesh = new THREE.Line( geometry, matDark );
      lineText.add( lineMesh );

    }

    scene.add( lineText );

    // render();

  } ); //end load function

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // const controls = new OrbitControls( camera, renderer.domElement );
  // controls.target.set( 0, 0, 0 );
  // controls.update();

  // controls.addEventListener( 'change', render );
  document.addEventListener( 'mousemove', onDocumentMouseMove );
  window.addEventListener( 'resize', onWindowResize );

} // end init

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}
function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );
}

function animate() {

  requestAnimationFrame( animate );
  render();

}
function render() {
  camera.position.x += ( mouseX - camera.position.x ) * 0.03;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.03;

  camera.lookAt( scene.position );
  renderer.render( scene, camera );

}