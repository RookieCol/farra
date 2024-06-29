import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SDFGeometryGenerator } from 'three/examples/jsm/geometries/SDFGeometryGenerator';
import Stats from 'stats.js';

const SDFGeometry = () => {
  const mountRef = useRef(null);
  const settings = {
    res: 4,
    bounds: 1,
    autoRotate: true,
    wireframe: true,
    material: 'depth',
    vertexCount: '0'
  };

  useEffect(() => {
    let renderer, stats, meshFromSDF, scene, camera, clock;

    const shader = /* glsl */`
      float dist(vec3 p) {
        p.xyz = p.xzy;
        p *= 1.2;
        vec3 z = p;
        vec3 dz=vec3(0.0);
        float power = 8.0;
        float r, theta, phi;
        float dr = 1.0;
        
        float t0 = 1.0;
        for(int i = 0; i < 7; ++i) {
          r = length(z);
          if(r > 2.0) continue;
          theta = atan(z.y / z.x);
          #ifdef phase_shift_on
          phi = asin(z.z / r) ;
          #else
          phi = asin(z.z / r);
          #endif
          
          dr = pow(r, power - 1.0) * dr * power + 1.0;
        
          r = pow(r, power);
          theta = theta * power;
          phi = phi * power;
          
          z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;
          
          t0 = min(t0, r);
        }

        return 0.5 * log(r) * r / dr;
      }
    `;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0.01, 1600);
      camera.position.z = 1100;

      scene = new THREE.Scene();
      clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
      renderer.setAnimationLoop(animate);
      mountRef.current.appendChild(renderer.domElement);

      stats = new Stats();
      stats.dom.style.display = 'none'; // Hide the stats
      mountRef.current.appendChild(stats.dom);

      window.addEventListener('resize', onWindowResize);

      compile();
    };

    const compile = () => {
      const generator = new SDFGeometryGenerator(renderer);
      const geometry = generator.generate(Math.pow(2, settings.res + 2), shader, settings.bounds);
      geometry.computeVertexNormals();

      if (meshFromSDF) {
        meshFromSDF.geometry.dispose();
        meshFromSDF.geometry = geometry;
      } else {
        meshFromSDF = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
        scene.add(meshFromSDF);

        const scale = Math.min(window.innerWidth, window.innerHeight) / 2 * 0.66;
        meshFromSDF.scale.set(scale, scale, scale);

        setMaterial();
      }

      settings.vertexCount = geometry.attributes.position.count;
    };

    const setMaterial = () => {
      meshFromSDF.material.dispose();

      if (settings.material === 'depth') {
        meshFromSDF.material = new THREE.MeshDepthMaterial();
      } else if (settings.material === 'normal') {
        meshFromSDF.material = new THREE.MeshNormalMaterial();
      }

      meshFromSDF.material.wireframe = settings.wireframe;
    };

    const onWindowResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      renderer.setSize(w, h);

      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;

      camera.updateProjectionMatrix();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (settings.autoRotate) {
        meshFromSDF.rotation.y += Math.PI * 0.05 * clock.getDelta();
      }

      render();
      stats.update();
    };

    init();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      mountRef.current.removeChild(stats.dom);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="relative flex justify-center w-full h-[90%]" />;
};

export default SDFGeometry;