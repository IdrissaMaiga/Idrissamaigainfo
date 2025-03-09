"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { sectionDetails, SectionId } from "../lib/sectionData";

interface CubeProps {
  sectionColor: string;
  currentSection: SectionId;
  setSelectedFace: (face: string) => void;
  containerSize: number;
}

const Cube: React.FC<CubeProps> = ({
  sectionColor,
  currentSection,
  setSelectedFace,
  containerSize,
}) => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentFace, setCurrentFace] = useState("");
  const { camera } = useThree();
  const textureLoader = useRef(new THREE.TextureLoader());
  const [textures, setTextures] = useState<{ [key: string]: THREE.Texture }>({});
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  const FALLBACK_IMAGE_URL = "https://via.placeholder.com/600x600.png?text=Image+Not+Found";
  const MIN_SCALE = 0.8;
  const MAX_SCALE = 1.5;

  const faceNormals = [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
  ];

  const faceIndices = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
  };

  const rotationSpeedY = 0.005;
  const rotationSpeedX = 0.002;

  // Handle window size on client side
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadTextureForFace = useCallback(
    (faceName: string) => {
      const sectionData = sectionDetails[currentSection];
      const texturePath = sectionData?.faceBackgrounds[faceName] || FALLBACK_IMAGE_URL;

      textureLoader.current.load(
        texturePath,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          setTextures((prev) => ({ ...prev, [faceName]: tex }));
        },
        undefined,
        () => {
          textureLoader.current.load(FALLBACK_IMAGE_URL, (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            setTextures((prev) => ({ ...prev, [faceName]: tex }));
          });
        }
      );
    },
    [currentSection]
  );

  useEffect(() => {
    const faces = sectionDetails[currentSection]?.faces || [];
    if (faces.length > 0) {
      setCurrentFace(faces[0]);
      setSelectedFace(faces[0]);
      faces.forEach((face) => !textures[face] && loadTextureForFace(face));
    }
  }, [currentSection, setSelectedFace, loadTextureForFace, textures]);

  useFrame(() => {
    if (cubeRef.current) {
      if (!isDragging) {
        cubeRef.current.rotation.y += rotationSpeedY;
        cubeRef.current.rotation.x += rotationSpeedX;
      }

      const smallerDimension = Math.min(windowSize.width, windowSize.height);
      const baseScale = THREE.MathUtils.clamp(
        smallerDimension / containerSize,
        MIN_SCALE,
        MAX_SCALE
      );
      const targetScale = isHovered ? baseScale * 1.2 : baseScale;
      cubeRef.current.scale.setScalar(
        THREE.MathUtils.lerp(cubeRef.current.scale.x, targetScale, 0.1)
      );

      if (materialRef.current) {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity,
          isHovered ? 0.5 : 0,
          0.1
        );
      }

      const cameraPosition = camera.position.clone().sub(cubeRef.current.position).normalize();
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(cubeRef.current.matrixWorld);

      let maxDot = -1;
      let visibleFaceIndex = 0;

      faceNormals.forEach((normal, index) => {
        const worldNormal = normal.clone().applyMatrix3(normalMatrix).normalize();
        const dot = worldNormal.dot(cameraPosition);
        if (dot > maxDot) {
          maxDot = dot;
          visibleFaceIndex = index;
        }
      });

      const facesArray = sectionDetails[currentSection]?.faces || [];
      if (facesArray.length > 0) {
        const faceNameIndex = Math.min(
          faceIndices[visibleFaceIndex as keyof typeof faceIndices] || 0,
          facesArray.length - 1
        );
        const faceName = facesArray[faceNameIndex];

        if (faceName !== currentFace) {
          setCurrentFace(faceName);
          setSelectedFace(faceName);
          if (!textures[faceName]) loadTextureForFace(faceName);
        }
      }
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.color, {
        r: new THREE.Color(sectionColor).r,
        g: new THREE.Color(sectionColor).g,
        b: new THREE.Color(sectionColor).b,
        duration: 1,
      });
    }
  }, [sectionColor]);

  const calculateCubeSize = useCallback(() => {
    const smallerDimension = Math.min(windowSize.width, windowSize.height);
    const scaleFactor = smallerDimension / containerSize;
    return THREE.MathUtils.clamp(scaleFactor * 3.0, 3.0, 8.0);
  }, [windowSize, containerSize]);

  useEffect(() => {
    const cubeSize = calculateCubeSize();
    camera.position.set(0, 0, cubeSize * 3);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [windowSize, camera, containerSize, calculateCubeSize]);

  return (
    <group>
      <Environment preset="studio" />
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 2, 2]} intensity={2.5} color="white" />
      <pointLight position={[-2, -2, -2]} intensity={1.5} color={sectionColor} />

      <mesh
        ref={cubeRef}
        receiveShadow
        castShadow
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <boxGeometry args={[calculateCubeSize(), calculateCubeSize(), calculateCubeSize()]} />
        <meshPhysicalMaterial
          ref={materialRef}
          transparent
          opacity={0.5}
          metalness={0.3}
          roughness={0.1}
          transmission={0.95}
          reflectivity={1}
          emissive={new THREE.Color(sectionColor)}
          emissiveIntensity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />

        {sectionDetails[currentSection]?.faces.map((face: string, index: number) => {
          const cubeSize = calculateCubeSize();
          const offset = cubeSize / 2 + 0.02;
          const planeSize = cubeSize * 0.95;

          return (
            <group key={index} position={[0, 0, 0]}>
              {textures[face] ? (
                <mesh
                  position={[
                    index === 0 ? 0 : index === 1 ? 0 : index === 2 ? 0 : 0,
                    index === 0 ? offset - 0.05 : index === 1 ? -offset + 0.05 : 0,
                    index === 0 ? 0 : index === 1 ? 0 : index === 2 ? offset - 0.05 : -offset + 0.05,
                  ]}
                  rotation={[
                    index === 0 ? -Math.PI / 2 : index === 1 ? Math.PI / 2 : 0,
                    0,
                    index === 2 || index === 3 ? Math.PI / 2 : 0,
                  ]}
                >
                  <planeGeometry args={[planeSize, planeSize]} />
                  <meshBasicMaterial
                    map={textures[face]}
                    transparent
                    opacity={1.0}
                    side={THREE.DoubleSide}
                    depthTest={true}
                  />
                </mesh>
              ) : (
                <mesh
                  position={[
                    index === 0 ? 0 : index === 1 ? 0 : index === 2 ? 0 : 0,
                    index === 0 ? offset - 0.05 : index === 1 ? -offset + 0.05 : 0,
                    index === 0 ? 0 : index === 1 ? 0 : index === 2 ? offset - 0.05 : -offset + 0.05,
                  ]}
                  rotation={[
                    index === 0 ? -Math.PI / 2 : index === 1 ? Math.PI / 2 : 0,
                    0,
                    index === 2 || index === 3 ? Math.PI / 2 : 0,
                  ]}
                >
                  <planeGeometry args={[planeSize, planeSize]} />
                  <meshBasicMaterial
                    color="red"
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              )}
            </group>
          );
        })}
      </mesh>
    </group>
  );
};

export default Cube;