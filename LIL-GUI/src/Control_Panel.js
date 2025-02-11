import * as THREE from "three";
import GUI from "lil-gui";

export const Control_Panel = (Mesh) => {

  const gui = new GUI();

  const Geometries = {
    Box: new THREE.BoxGeometry(2, 2, 2),
    Sphere: new THREE.SphereGeometry(2, 32, 32),
    Cone: new THREE.ConeGeometry(2, 5),
    Cylinder: new THREE.CylinderGeometry(2, 2, 5),
    Torus: new THREE.TorusGeometry(2, 2),
    Tetrahedron: new THREE.TetrahedronGeometry(2),
    Octahedron: new THREE.OctahedronGeometry(2),
  }
  
  const functions = {
    clicked : () => console.log("Control Panel is working!!!"),
  }
  

  const Position = gui.addFolder("Position");
  const Scale = gui.addFolder("Scale");
  const Rotation = gui.addFolder("Rotation");

  Position.add(Mesh.position, "x", -5, 5, 0.01).name("X");
  Position.add(Mesh.position, "y", -5, 5, 0.01).name("Y");
  Position.add(Mesh.position, "z", -5, 5, 0.01).name("Z");

  Scale.add(Mesh.scale, "x", -5, 5, 0.01).name("X");
  Scale.add(Mesh.scale, "y", -5, 5, 0.01).name("Y");
  Scale.add(Mesh.scale, "z", -5, 5, 0.01).name("Z");

  Rotation.add(Mesh.rotation, "x", 0, 2 * Math.PI, 0.01).name("X");
  Rotation.add(Mesh.rotation, "y", 0, 2 * Math.PI, 0.01).name("Y");
  Rotation.add(Mesh.rotation, "z", 0, 2 * Math.PI, 0.01).name("Z");

  const changeGeometry = (geometry) => {
    switch (geometry) {
      case "Sphere":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Sphere;
        break;

      case "Cone":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Cone;
        break;

      case "Cylinder":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Cylinder;
        break;

      case "Torus":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Torus;
        break;

      case "Tetrahedron":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Tetrahedron;
        break;

      case "Octahedron":
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Octahedron;
        break;

      default:
        Mesh.geometry.dispose();
        Mesh.geometry = Geometries.Box;
        break;
    }
  };


  //Example of dropdown in GUI
  gui
    .add({ geometry: "Box" }, "geometry", [
      "Box",
      "Sphere",
      "Cone",
      "Cylinder",
      "Torus",
      "Tetrahedron",
      "Octahedron",
    ])
    .name("Geometry")
    .onChange(changeGeometry);

  
  //Example of checkbox in GUI
  gui.add(Mesh.material, "wireframe").name("Wireframe");


  //Example of Input_Field in GUI
  // gui.add({ Name: "" }, "Name").name("Enter Your Name")
  //   .onChange((name) => {
  //     console.log("hi", name);
  //   });
  
  
  
  //Example of color_picker in GUI
  gui.addColor(Mesh.material, "color").name("Color");


  //Example of button in GUI
  gui.add({ click: functions.clicked }, "click").name("Click Me");
};
