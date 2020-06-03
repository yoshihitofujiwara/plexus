import { Object3D, BufferGeometry, Geometry, Vector3, PointsMaterial, Points, TextureLoader } from "three";


export default class Line extends Object3D{
  constructor(particleNum){
    super();

		this.particleNum = particleNum;
    this.particles = this.createParticles();

    this.params = {
      rangeX: 0,
      rangeY: 0,
      // speed: 0,
    };

    eventDispatcher.addEventListener("resize", (params) => {
      console.log(params.width);
      this.params.rangeX = params.width * 0.5;
      this.params.rangeY = params.height * 0.5;
    });
  }


  /*--------------------------------------------------------------------------
    @methods
  --------------------------------------------------------------------------*/
  createParticles(){
    const geometry = new Geometry();
    let velocities = [];

    for (let i = 0; i < this.particleNum; i++) {
      geometry.vertices.push(new Vector3(
        document.body.clientWidth * (Math.random() - 0.5),
        document.body.clientHeight * (Math.random() - 0.5),
        0
      ));

      velocities.push(new Vector3(
        1 * (Math.random() - 0.5),
        1 * (Math.random() - 0.5),
        0
      ));
    }

   const material = new PointsMaterial({
      size: 5,
      color: 0xFFFFFF,
      map: new TextureLoader().load( "assets/img/circle.png" )
    });

    let points = new Points(geometry, material);
    points.velocities = velocities;

    this.add(points);
    return points;
  }


  onUpdate(){
    this.particles.geometry.verticesNeedUpdate = true;

    this.particles.geometry.vertices.forEach((vertex, i)=>{
      vertex.add(this.particles.velocities[i].clone().multiplyScalar(2));

      if(vertex.x < -this.params.rangeX){
        this.particles.velocities[i].x *= -1;
      } else if(vertex.x > this.params.rangeX){
        this.particles.velocities[i].x *= -1;
      }
      if(vertex.y < -this.params.rangeY){
        this.particles.velocities[i].y *= -1;
      } else if(vertex.y > this.params.rangeY){
        this.particles.velocities[i].y *= -1;
      }
    });
  }
}
