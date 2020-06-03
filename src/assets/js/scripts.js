import { EventDispatcher, WebGLRenderer, PerspectiveCamera, Scene} from "three";
import Plexus from "./plexus";


const eventDispatcher = new EventDispatcher();
window.eventDispatcher = eventDispatcher;


window.addEventListener("load", ()=>{

  let params = {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    fov: 45
  }

  const plexus = new Plexus();

  // renderer
  const renderer = new WebGLRenderer({
    canvas: document.querySelector("canvas"),
    // antialias: true,
  });
	renderer.setClearColor(0x010101, 0);
  renderer.setSize(params.width, params.height);
  // renderer.setPixelRatio(window.devicePixelRatio);

  // camera
	const camera = new PerspectiveCamera(params.fov, params.width / params.height, 1, 1000);
	camera.position.z = params.height / (2 * Math.tan(params.fov * (Math.PI / 180) / 2));

  // scene
  const scene = new Scene();

  scene.add(plexus);


  eventDispatcher.dispatchEvent({
    type: "resize",
    width: params.width,
    height: params.height
  });

  update();


  /* update
  --------------------------------------------------------------------------*/
  function update() {
    plexus.onUpdate();
		renderer.render(scene, camera);
  	requestAnimationFrame(update);
  }


  /* resize
  --------------------------------------------------------------------------*/
  let _resizeTimerId;
  window.addEventListener("resize", resize);

  function resize() {
    clearTimeout(_resizeTimerId);
    _resizeTimerId = setTimeout(() => {

      params.width = document.body.clientWidth;
      params.height = document.body.clientHeight;

      eventDispatcher.dispatchEvent({
        type: "resize",
        params: params
      });

      renderer.setSize(params.width, params.height);
      // renderer.setPixelRatio(window.devicePixelRatio);

      camera.aspect = params.width / params.height;
      camera.updateProjectionMatrix();

    }, 100);
  }
});
