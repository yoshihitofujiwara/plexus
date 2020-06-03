import { BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from "three";

import Particle from "./Particle";


export default class Plexus extends Object3D{
  constructor(){

    console.log("Plexus");

    super();

    this.particle = new Particle(128);

    this.add(this.particle);


    // line
    // triangle
  }


  onUpdate(){
    this.particle.onUpdate();
  }
}
