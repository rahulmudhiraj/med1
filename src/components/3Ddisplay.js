// import {React,useRef,useEffect} from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as THREE from 'three';

// function LungModel() {
//   // Load the GLTF model (replace the path with your actual GLTF file URL)
//   const { scene } = useGLTF('http://127.0.0.1:5000/lung_model.gltf');

  
//   console.log(scene)
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       const box = new THREE.BoxHelper(child, 0xffff00);  // Create a bounding box
//       child.add(box);
//     }
//   });
//   return <primitive object={scene} scale={5} />;
// }


// function ThreeDViewPage() {
//   return (
//     <div style={{
//       height: '100vh',
//       backgroundColor: '#f4f4f4',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       <h1 style={{
//         color: '#333',
//         fontSize: '2rem',
//         marginBottom: '20px'
//       }}>
//         3D Lung Model Viewer
//       </h1>
//       <div style={{
//         width: '100%',
//         height: '80%',
//         backgroundColor: '#fff',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//       }}>
//         <Canvas camera={{ position: [0, 0, 5] }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={1} />
//           <OrbitControls />
//           <LungModel />
//         </Canvas>
//       </div>
//     </div>
//   );
// }

// export default ThreeDViewPage;


// import React, { useEffect, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// function ObjModel({ url }) {
//   const objRef = useRef();

//   useEffect(() => {
//     const loader = new OBJLoader();
//     loader.load(
//       url,
//       (obj) => {
//         obj.traverse((child) => {
//           if (child.isMesh) {
//             child.material = new THREE.MeshStandardMaterial({ color: 'orange' });
//           }
//         });
//         objRef.current.add(obj);
//       },
//       undefined,
//       (error) => {
//         console.error('An error happened while loading the OBJ file:', error);
//       }
//     );
//   }, [url]);

//   return <group ref={objRef} />;
// }

// function ThreeDViewPage() {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         backgroundColor: '#f4f4f4',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <h1
//         style={{
//           color: '#333',
//           fontSize: '2rem',
//           marginBottom: '20px',
//         }}
//       >
//         3D OBJ Model Viewer
//       </h1>
//       <div
//         style={{
//           width: '100%',
//           height: '80%',
//           backgroundColor: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Canvas camera={{ position: [0, 2, 10] }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={1} />
//           <OrbitControls />
//           <ObjModel url="http://127.0.0.1:5000/lung_model.obj" />
//         </Canvas>
//       </div>
//     </div>
//   );
// }

// export default ThreeDViewPage;
















// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// function main() {

// 	const canvas = document.querySelector( '#c' );
// 	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

// 	const fov = 45;
// 	const aspect = 2; // the canvas default
// 	const near = 0.1;
// 	const far = 100;
// 	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
// 	camera.position.set( 0, 10, 20 );

// 	const controls = new OrbitControls( camera, canvas );
// 	controls.target.set( 0, 5, 0 );
// 	controls.update();

// 	const scene = new THREE.Scene();
// 	scene.background = new THREE.Color( 'black' );

// 	{

// 		const planeSize = 40;

// 		const loader = new THREE.TextureLoader();
// 		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
// 		texture.wrapS = THREE.RepeatWrapping;
// 		texture.wrapT = THREE.RepeatWrapping;
// 		texture.magFilter = THREE.NearestFilter;
// 		texture.colorSpace = THREE.SRGBColorSpace;
// 		const repeats = planeSize / 2;
// 		texture.repeat.set( repeats, repeats );

// 		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
// 		const planeMat = new THREE.MeshPhongMaterial( {
// 			map: texture,
// 			side: THREE.DoubleSide,
// 		} );
// 		const mesh = new THREE.Mesh( planeGeo, planeMat );
// 		mesh.rotation.x = Math.PI * - .5;
// 		scene.add( mesh );

// 	}

// 	{

// 		const skyColor = 0xB1E1FF; // light blue
// 		const groundColor = 0xB97A20; // brownish orange
// 		const intensity = 2;
// 		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
// 		scene.add( light );

// 	}

// 	{

// 		const color = 0xFFFFFF;
// 		const intensity = 2.5;
// 		const light = new THREE.DirectionalLight( color, intensity );
// 		light.position.set( 5, 10, 2 );
// 		scene.add( light );
// 		scene.add( light.target );

// 	}

// 	function frameArea( sizeToFitOnScreen, boxSize, boxCenter, camera ) {

// 		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
// 		const halfFovY = THREE.MathUtils.degToRad( camera.fov * .5 );
// 		const distance = halfSizeToFitOnScreen / Math.tan( halfFovY );
// 		// compute a unit vector that points in the direction the camera is now
// 		// in the xz plane from the center of the box
// 		const direction = ( new THREE.Vector3() )
// 			.subVectors( camera.position, boxCenter )
// 			.multiply( new THREE.Vector3( 1, 0, 1 ) )
// 			.normalize();

// 		// move the camera to a position distance units way from the center
// 		// in whatever direction the camera was from the center already
// 		camera.position.copy( direction.multiplyScalar( distance ).add( boxCenter ) );

// 		// pick some near and far values for the frustum that
// 		// will contain the box.
// 		camera.near = boxSize / 100;
// 		camera.far = boxSize * 100;

// 		camera.updateProjectionMatrix();

// 		// point the camera to look at the center of the box
// 		camera.lookAt( boxCenter.x, boxCenter.y, boxCenter.z );

// 	}

// 	{

// 		const gltfLoader = new GLTFLoader();
// 		gltfLoader.load( 'http://localhost:5000/lung_model.glb', ( gltf ) => {

// 			const root = gltf.scene;
// 			scene.add( root );

// 			// compute the box that contains all the stuff
// 			// from root and below
// 			const box = new THREE.Box3().setFromObject( root );

// 			const boxSize = box.getSize( new THREE.Vector3() ).length();
// 			const boxCenter = box.getCenter( new THREE.Vector3() );

// 			// set the camera to frame the box
// 			frameArea( boxSize * 0.5, boxSize, boxCenter, camera );

// 			// update the Trackball controls to handle the new size
// 			controls.maxDistance = boxSize * 10;
// 			controls.target.copy( boxCenter );
// 			controls.update();

// 		} );

// 	}

// 	function resizeRendererToDisplaySize( renderer ) {

// 		const canvas = renderer.domElement;
// 		const width = canvas.clientWidth;
// 		const height = canvas.clientHeight;
// 		const needResize = canvas.width !== width || canvas.height !== height;
// 		if ( needResize ) {

// 			renderer.setSize( width, height, false );

// 		}

// 		return needResize;

// 	}

// 	function render() {

// 		if ( resizeRendererToDisplaySize( renderer ) ) {

// 			const canvas = renderer.domElement;
// 			camera.aspect = canvas.clientWidth / canvas.clientHeight;
// 			camera.updateProjectionMatrix();

// 		}

// 		renderer.render( scene, camera );

// 		requestAnimationFrame( render );

// 	}

// 	requestAnimationFrame( render );

// }

// main();
















import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { cameraPosition, modelDirection } from 'three/webgpu';

function ThreeDDisplay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const fov = 45;
    const aspect = 2; // canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    // Plane
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = Math.PI * -0.5;
    scene.add(plane);

    // Lights
    const skyColor = 0xb1e1ff;
    const groundColor = 0xb97a20;
    const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, 5);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(5, 10, 2);
    scene.add(dirLight);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    // Load GLTF
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      'http://localhost:5000/lung_model.glb',
      (gltf) => {
        const root = gltf.scene;
        console.log(root)
        console.log(root.children)
        root.traverse((node) => {
            if (node.isMesh && node.material) {
              console.log("Entered isMesh and material")
              node.material.color.set(0xff0000); // Green color
              node.material.needsUpdate = true; // Ensure the change is applied
            }
          });
        scene.add(root);
        scene.background = new THREE.Color('black')


        console.log('Scene:', scene);
        console.log('Camera:', camera);
        console.log('Model:', gltf.scene);
        const boxHelper = new THREE.BoxHelper(root, 0xff0000); // Red box
        scene.add(boxHelper);
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White light, full intensity
        scene.add(ambientLight);
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(10, 10, 10);
        // Adjust camera and controls to fit the model
        const box = new THREE.Box3().setFromObject(root);
        console.log('Model Bounding Box:', box);
        console.log('Model Center:', box.getCenter(new THREE.Vector3()));
        const cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());
        root.position.sub(boxCenter)
        const halfSizeToFitOnScreen = boxSize * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // camera.position.copy(new THREE.Vector3().subVectors(camera.position, boxCenter).normalize().multiplyScalar(distance).add(boxCenter));
        // camera.position.copy(boxCenter.clone().add(new THREE.Vector3(0, distance*2, distance*2)));
        camera.position.set(boxCenter.x,boxCenter.y+distance,boxCenter.z+distance)
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      }
    );

    // Resize renderer to fit display size
    function resizeRendererToDisplaySize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    // Render loop
    function render() {
      if (resizeRendererToDisplaySize()) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default ThreeDDisplay;