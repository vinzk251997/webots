import WbBox from './WbBox.js';
import WbShape from './WbShape.js';

export default class WbConcreteNodeFactory {
  constructor() {
    const instance = this.constructor.instance;
    if (instance)
      return instance;

    this.constructor.instance = this;
  };

  createNode(modelName, tokenizer) {
    if (modelName === 'Box')
      return new WbBox(tokenizer);
    if (modelName === 'Shape')
      return new WbShape(tokenizer);
  };
};

/*
if (modelName == "Accelerometer")
  return new WbAccelerometer(tokenizer);
if (modelName == "Altimeter")
  return new WbAltimeter(tokenizer);
if (modelName == "Appearance")
  return new WbAppearance(tokenizer);
if (modelName == "Background")
  return new WbBackground(tokenizer);
if (modelName == "BallJoint")
  return new WbBallJoint(tokenizer);
if (modelName == "BallJointParameters")
  return new WbBallJointParameters(tokenizer);
if (modelName == "Billboard")
  return new WbBillboard(tokenizer);
if (modelName == "Box")
  return new WbBox(tokenizer);
if (modelName == "Brake")
  return new WbBrake(tokenizer);
if (modelName == "Camera")
  return new WbCamera(tokenizer);
if (modelName == "Capsule")
  return new WbCapsule(tokenizer);
if (modelName == "Charger")
  return new WbCharger(tokenizer);
if (modelName == "Color")
  return new WbColor(tokenizer);
if (modelName == "Compass")
  return new WbCompass(tokenizer);
if (modelName == "Cone")
  return new WbCone(tokenizer);
if (modelName == "Connector")
  return new WbConnector(tokenizer);
if (modelName == "ContactProperties")
  return new WbContactProperties(tokenizer);
if (modelName == "Coordinate")
  return new WbCoordinate(tokenizer);
if (modelName == "Cylinder")
  return new WbCylinder(tokenizer);
if (modelName == "Damping")
  return new WbDamping(tokenizer);
if (modelName == "DirectionalLight")
  return new WbDirectionalLight(tokenizer);
if (modelName == "Display")
  return new WbDisplay(tokenizer);
if (modelName == "DistanceSensor")
  return new WbDistanceSensor(tokenizer);
if (modelName == "ElevationGrid")
  return new WbElevationGrid(tokenizer);
if (modelName == "Emitter")
  return new WbEmitter(tokenizer);
if (modelName == "Fluid")
  return new WbFluid(tokenizer);
if (modelName == "Focus")
  return new WbFocus(tokenizer);
if (modelName == "Fog")
  return new WbFog(tokenizer);
if (modelName == "GPS")
  return new WbGps(tokenizer);
if (modelName == "Group")
  return new WbGroup(tokenizer);
if (modelName == "Gyro")
  return new WbGyro(tokenizer);
if (modelName == "Hinge2Joint")
  return new WbHinge2Joint(tokenizer);
if (modelName == "Hinge2JointParameters")
  return new WbHingeJointParameters(tokenizer, true);  // DEPRECATED, only for backward compatibility
if (modelName == "HingeJoint")
  return new WbHingeJoint(tokenizer);
if (modelName == "HingeJointParameters")
  return new WbHingeJointParameters(tokenizer);
if (modelName == "ImageTexture")
  return new WbImageTexture(tokenizer);
if (modelName == "ImmersionProperties")
  return new WbImmersionProperties(tokenizer);
if (modelName == "IndexedFaceSet")
  return new WbIndexedFaceSet(tokenizer);
if (modelName == "IndexedLineSet")
  return new WbIndexedLineSet(tokenizer);
if (modelName == "InertialUnit")
  return new WbInertialUnit(tokenizer);
if (modelName == "JointParameters")
  return new WbJointParameters(tokenizer);
if (modelName == "LED")
  return new WbLed(tokenizer);
if (modelName == "Lens")
  return new WbLens(tokenizer);
if (modelName == "LensFlare")
  return new WbLensFlare(tokenizer);
if (modelName == "Lidar")
  return new WbLidar(tokenizer);
if (modelName == "LightSensor")
  return new WbLightSensor(tokenizer);
if (modelName == "LinearMotor")
  return new WbLinearMotor(tokenizer);
if (modelName == "Mesh")
  return new WbMesh(tokenizer);
if (modelName == "Material")
  return new WbMaterial(tokenizer);
if (modelName == "Microphone")
  return new WbMicrophone(tokenizer);
if (modelName == "Muscle")
  return new WbMuscle(tokenizer);
if (modelName == "Normal")
  return new WbNormal(tokenizer);
if (modelName == "PBRAppearance")
  return new WbPbrAppearance(tokenizer);
if (modelName == "Pen")
  return new WbPen(tokenizer);
if (modelName == "Physics")
  return new WbPhysics(tokenizer);
if (modelName == "Plane")
  return new WbPlane(tokenizer);
if (modelName == "PointLight")
  return new WbPointLight(tokenizer);
if (modelName == "PointSet")
  return new WbPointSet(tokenizer);
if (modelName == "PositionSensor")
  return new WbPositionSensor(tokenizer);
if (modelName == "Propeller")
  return new WbPropeller(tokenizer);
if (modelName == "Radar")
  return new WbRadar(tokenizer);
if (modelName == "Radio")
  return new WbRadio(tokenizer);
if (modelName == "RangeFinder")
  return new WbRangeFinder(tokenizer);
if (modelName == "Receiver")
  return new WbReceiver(tokenizer);
if (modelName == "Recognition")
  return new WbRecognition(tokenizer);
if (modelName == "Robot")
  return new WbRobot(tokenizer);
if (modelName == "RotationalMotor")
  return new WbRotationalMotor(tokenizer);
if (modelName == "Shape")
  return new WbShape(tokenizer);
if (modelName == "Skin")
  return new WbSkin(tokenizer);
if (modelName == "SliderJoint")
  return new WbSliderJoint(tokenizer);
if (modelName == "Slot")
  return new WbSlot(tokenizer);
if (modelName == "Solid")
  return new WbSolid(tokenizer);
if (modelName == "SolidReference")
  return new WbSolidReference(tokenizer);
if (modelName == "Speaker")
  return new WbSpeaker(tokenizer);
if (modelName == "Sphere")
  return new WbSphere(tokenizer);
if (modelName == "SpotLight")
  return new WbSpotLight(tokenizer);
if (modelName == "TextureCoordinate")
  return new WbTextureCoordinate(tokenizer);
if (modelName == "TextureTransform")
  return new WbTextureTransform(tokenizer);
if (modelName == "TouchSensor")
  return new WbTouchSensor(tokenizer);
if (modelName == "Track")
  return new WbTrack(tokenizer);
if (modelName == "TrackWheel")
  return new WbTrackWheel(tokenizer);
if (modelName == "Transform")
  return new WbTransform(tokenizer);
if (modelName == "Viewpoint")
  return new WbViewpoint(tokenizer);
if (modelName == "WorldInfo")
  return new WbWorldInfo(tokenizer);
if (modelName == "Zoom")
  return new WbZoom(tokenizer);
*/
