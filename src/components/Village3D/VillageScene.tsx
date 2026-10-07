import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactElement } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html, OrbitControls, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { landmarks, type Landmark, type LandmarkId } from '../../data/village'

/* ----------------------------------------------------------------------------
 * Layout constants – the whole village sits on a floating disc of radius 18.
 * -------------------------------------------------------------------------- */
const GROUND_RADIUS = 18
const MAIN_ROAD_Z = -1
const CROSS_ROAD_X = 3

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function isFree(x: number, z: number, clearance: number) {
  if (Math.abs(z - MAIN_ROAD_Z) < 1.6 || Math.abs(x - CROSS_ROAD_X) < 1.6) return false
  for (const l of landmarks) {
    const r = l.id === 'farms' ? 5 : l.id === 'pond' ? 3.4 : 3
    if (Math.hypot(x - l.position[0], z - l.position[2]) < r + clearance) return false
  }
  return true
}

/* ----------------------------------------------------------------------------
 * Instanced houses, trees and street lights (cheap to draw on mobile)
 * -------------------------------------------------------------------------- */
const ROOF_COLORS = ['#b45309', '#9a3412', '#a16207', '#7c2d12', '#be123c']
const WALL_COLORS = ['#fde68a', '#fef3c7', '#fed7aa', '#e7e5e4', '#fecaca', '#d9f99d']

function Houses({ count }: { count: number }) {
  const walls = useRef<THREE.InstancedMesh>(null)
  const roofs = useRef<THREE.InstancedMesh>(null)

  const houses = useMemo(() => {
    const rand = mulberry32(42)
    const out: { x: number; z: number; s: number; rot: number; wall: string; roof: string }[] = []
    let tries = 0
    while (out.length < count && tries < 2000) {
      tries++
      const a = rand() * Math.PI * 2
      const r = 3 + rand() * 11.5
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      if (!isFree(x, z, 0.4)) continue
      if (out.some((h) => Math.hypot(h.x - x, h.z - z) < 1.7)) continue
      out.push({
        x,
        z,
        s: 0.75 + rand() * 0.45,
        rot: Math.round(rand() * 4) * (Math.PI / 2) + (rand() - 0.5) * 0.3,
        wall: WALL_COLORS[Math.floor(rand() * WALL_COLORS.length)],
        roof: ROOF_COLORS[Math.floor(rand() * ROOF_COLORS.length)],
      })
    }
    return out
  }, [count])

  useLayoutEffect(() => {
    const m = new THREE.Object3D()
    const c = new THREE.Color()
    houses.forEach((h, i) => {
      m.position.set(h.x, 0.4 * h.s, h.z)
      m.rotation.set(0, h.rot, 0)
      m.scale.set(h.s, h.s, h.s)
      m.updateMatrix()
      walls.current!.setMatrixAt(i, m.matrix)
      walls.current!.setColorAt(i, c.set(h.wall))

      m.position.set(h.x, 0.8 * h.s + 0.35 * h.s, h.z)
      m.rotation.set(0, h.rot + Math.PI / 4, 0)
      m.updateMatrix()
      roofs.current!.setMatrixAt(i, m.matrix)
      roofs.current!.setColorAt(i, c.set(h.roof))
    })
    walls.current!.instanceMatrix.needsUpdate = true
    roofs.current!.instanceMatrix.needsUpdate = true
    if (walls.current!.instanceColor) walls.current!.instanceColor.needsUpdate = true
    if (roofs.current!.instanceColor) roofs.current!.instanceColor.needsUpdate = true
  }, [houses])

  return (
    <group>
      <instancedMesh ref={walls} args={[undefined, undefined, houses.length]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.8, 1.1]} />
        <meshStandardMaterial roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={roofs} args={[undefined, undefined, houses.length]} castShadow>
        <coneGeometry args={[0.95, 0.7, 4]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
    </group>
  )
}

function Trees({ count }: { count: number }) {
  const trunks = useRef<THREE.InstancedMesh>(null)
  const crowns = useRef<THREE.InstancedMesh>(null)

  const trees = useMemo(() => {
    const rand = mulberry32(7)
    const out: { x: number; z: number; s: number; g: number }[] = []
    let tries = 0
    while (out.length < count && tries < 3000) {
      tries++
      const a = rand() * Math.PI * 2
      // bias trees towards the outer ring for a framed look
      const r = rand() < 0.65 ? 13.5 + rand() * 3.8 : 2 + rand() * 12
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      if (!isFree(x, z, 0)) continue
      if (out.some((tr) => Math.hypot(tr.x - x, tr.z - z) < 1.1)) continue
      out.push({ x, z, s: 0.7 + rand() * 0.6, g: rand() })
    }
    return out
  }, [count])

  useLayoutEffect(() => {
    const m = new THREE.Object3D()
    const c = new THREE.Color()
    trees.forEach((tr, i) => {
      m.position.set(tr.x, 0.35 * tr.s, tr.z)
      m.scale.set(tr.s, tr.s, tr.s)
      m.updateMatrix()
      trunks.current!.setMatrixAt(i, m.matrix)
      m.position.set(tr.x, 1.05 * tr.s, tr.z)
      m.updateMatrix()
      crowns.current!.setMatrixAt(i, m.matrix)
      crowns.current!.setColorAt(i, c.setHSL(0.27 + tr.g * 0.08, 0.55, 0.28 + tr.g * 0.12))
    })
    trunks.current!.instanceMatrix.needsUpdate = true
    crowns.current!.instanceMatrix.needsUpdate = true
    if (crowns.current!.instanceColor) crowns.current!.instanceColor.needsUpdate = true
  }, [trees])

  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, trees.length]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 6]} />
        <meshStandardMaterial color="#78350f" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={crowns} args={[undefined, undefined, trees.length]} castShadow>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial roughness={0.8} flatShading />
      </instancedMesh>
    </group>
  )
}

function StreetLights() {
  const positions = useMemo(() => {
    const out: [number, number][] = []
    for (let x = -14; x <= 14; x += 4) if (Math.abs(x - CROSS_ROAD_X) > 1.5) out.push([x, MAIN_ROAD_Z + 1.05])
    for (let z = -12; z <= 12; z += 4) if (Math.abs(z - MAIN_ROAD_Z) > 1.5) out.push([CROSS_ROAD_X - 1.05, z])
    return out
  }, [])
  return (
    <group>
      {positions.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 1.2, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 1.22, 0]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={1.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ----------------------------------------------------------------------------
 * Terrain & roads
 * -------------------------------------------------------------------------- */
function Terrain() {
  return (
    <group>
      {/* floating island base */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[GROUND_RADIUS, GROUND_RADIUS - 2.5, 2.4, 48]} />
        <meshStandardMaterial color="#5b3a1e" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[GROUND_RADIUS, 64]} />
        <meshStandardMaterial color="#4d7c3a" roughness={1} />
      </mesh>
      {/* glowing rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[GROUND_RADIUS - 0.15, GROUND_RADIUS, 96]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
      </mesh>
      {/* roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, MAIN_ROAD_Z]} receiveShadow>
        <planeGeometry args={[GROUND_RADIUS * 2 - 1, 1.6]} />
        <meshStandardMaterial color="#475569" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[CROSS_ROAD_X, 0.025, 0]} receiveShadow>
        <planeGeometry args={[1.6, GROUND_RADIUS * 2 - 4]} />
        <meshStandardMaterial color="#475569" roughness={0.95} />
      </mesh>
      {/* lane markings */}
      {Array.from({ length: 14 }, (_, i) => -16 + i * 2.4).map((x) =>
        Math.abs(x - CROSS_ROAD_X) < 1.4 ? null : (
          <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, MAIN_ROAD_Z]}>
            <planeGeometry args={[0.9, 0.08]} />
            <meshBasicMaterial color="#e2e8f0" />
          </mesh>
        ),
      )}
      {/* dirt paths to landmarks */}
      {(
        [
          [-6, -2.6, 0.9, 2],
          [0, -4.6, 0.9, 5],
          [6.5, -2.6, 0.9, 2],
        ] as const
      ).map(([x, z, w, l]) => (
        <mesh key={`${x}${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.015, z]}>
          <planeGeometry args={[w, l]} />
          <meshStandardMaterial color="#a8865a" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

/* ----------------------------------------------------------------------------
 * Landmark models
 * -------------------------------------------------------------------------- */
function School() {
  return (
    <group>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <boxGeometry args={[3.5, 0.16, 2.1]} />
        <meshStandardMaterial color="#b45309" />
      </mesh>
      {[-1.1, -0.35, 0.4, 1.15].map((x) => (
        <mesh key={x} position={[x, 0.85, 0.91]}>
          <boxGeometry args={[0.45, 0.4, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.35, 0.91]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* flag */}
      <mesh position={[2, 1.3, 1.3]}>
        <cylinderGeometry args={[0.03, 0.03, 2.6, 6]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {(['#f97316', '#ffffff', '#16a34a'] as const).map((c, i) => (
        <mesh key={c} position={[2.3, 2.45 - i * 0.14, 1.3]}>
          <boxGeometry args={[0.55, 0.14, 0.02]} />
          <meshStandardMaterial color={c} />
        </mesh>
      ))}
    </group>
  )
}

function Panchayat() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[3.8, 0.3, 2.6]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0, 1, -0.2]} castShadow>
        <boxGeometry args={[3.4, 1.4, 1.8]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      {[-1.4, -0.47, 0.47, 1.4].map((x) => (
        <mesh key={x} position={[x, 1, 0.95]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1.4, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      <mesh position={[0, 1.95, 0.2]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.8, 0.2, 2.4]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh position={[0, 2.4, 0]} castShadow>
        <sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Health() {
  return (
    <group>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.2, 1.7]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.6, 0.1, 1.9]} />
        <meshStandardMaterial color="#e11d48" />
      </mesh>
      <mesh position={[0, 0.75, 0.86]}>
        <boxGeometry args={[0.5, 0.14, 0.02]} />
        <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.75, 0.86]}>
        <boxGeometry args={[0.14, 0.5, 0.02]} />
        <meshStandardMaterial color="#e11d48" emissive="#e11d48" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Pond({ animate }: { animate: boolean }) {
  const water = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!animate || !water.current) return
    const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.012
    water.current.scale.set(s, 1, s)
  })
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2.6, 40]} />
        <meshStandardMaterial color="#a8865a" />
      </mesh>
      <mesh ref={water} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[2.3, 40]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.2} roughness={0.15} transparent opacity={0.85} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 2.5, 0.08, Math.sin(a) * 2.5]}>
            <dodecahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color="#94a3b8" flatShading />
          </mesh>
        )
      })}
    </group>
  )
}

function Farms() {
  const plots = useMemo(() => {
    const out: { x: number; z: number; color: string; row: string }[] = []
    const palette = [
      ['#eab308', '#ca8a04'],
      ['#65a30d', '#3f6212'],
      ['#a3e635', '#65a30d'],
    ]
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 2; j++) {
        const [color, row] = palette[(i + j) % 3]
        out.push({ x: (i - 1) * 2.3, z: (j - 0.5) * 2.4, color, row })
      }
    return out
  }, [])
  return (
    <group rotation={[0, -0.5, 0]}>
      {plots.map((p) => (
        <group key={`${p.x}${p.z}`} position={[p.x, 0, p.z]}>
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <boxGeometry args={[2.1, 0.08, 2.2]} />
            <meshStandardMaterial color={p.color} roughness={1} />
          </mesh>
          {[-0.8, -0.4, 0, 0.4, 0.8].map((x) => (
            <mesh key={x} position={[x, 0.13, 0]}>
              <boxGeometry args={[0.14, 0.12, 2]} />
              <meshStandardMaterial color={p.row} roughness={1} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Playground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
        <planeGeometry args={[4.4, 2.8]} />
        <meshStandardMaterial color="#65a30d" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[0.45, 0.52, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <planeGeometry args={[0.05, 2.8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {[-2.1, 2.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-0.45, 0.45].map((z) => (
            <mesh key={z} position={[0, 0.35, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
          <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.93, 6]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Market() {
  const awnings = ['#f97316', '#0ea5e9', '#e11d48', '#16a34a']
  return (
    <group>
      {awnings.map((c, i) => (
        <group key={c} position={[(i - 1.5) * 1.15, 0, 0]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1, 0.9, 1]} />
            <meshStandardMaterial color="#fafaf9" />
          </mesh>
          <mesh position={[0, 0.85, -0.65]} rotation={[0.45, 0, 0]} castShadow>
            <boxGeometry args={[1.05, 0.05, 0.6]} />
            <meshStandardMaterial color={c} />
          </mesh>
          <mesh position={[0, 0.35, -0.51]}>
            <boxGeometry args={[0.7, 0.5, 0.02]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Community() {
  return (
    <group>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.4, 1.3, 8]} />
        <meshStandardMaterial color="#ede9fe" />
      </mesh>
      <mesh position={[0, 1.65, 0]} castShadow>
        <coneGeometry args={[1.6, 0.8, 8]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
      {/* old banyan tree */}
      <group position={[2.1, 0, 1.2]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.28, 1.2, 8]} />
          <meshStandardMaterial color="#713f12" />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#166534" flatShading />
        </mesh>
      </group>
    </group>
  )
}

const MODELS: Record<LandmarkId, (props: { animate: boolean }) => ReactElement> = {
  school: School,
  panchayat: Panchayat,
  health: Health,
  pond: Pond,
  farms: Farms,
  playground: Playground,
  market: Market,
  community: Community,
}

/* ----------------------------------------------------------------------------
 * Interactive landmark wrapper
 * -------------------------------------------------------------------------- */
function LandmarkObject({
  landmark,
  label,
  selected,
  onSelect,
  animate,
}: {
  landmark: Landmark
  label: string
  selected: boolean
  onSelect: (id: LandmarkId) => void
  animate: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const pin = useRef<THREE.Group>(null)
  useCursor(hovered)
  const Model = MODELS[landmark.id]
  const active = hovered || selected

  useFrame(({ clock }) => {
    if (!pin.current) return
    const t = clock.elapsedTime
    pin.current.position.y = 3.3 + (animate ? Math.sin(t * 2 + landmark.position[0]) * 0.15 : 0)
    if (animate) pin.current.rotation.y = t * 1.2
    const s = THREE.MathUtils.lerp(pin.current.scale.x, active ? 1.35 : 1, 0.15)
    pin.current.scale.setScalar(s)
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(landmark.id)
  }

  return (
    <group
      position={landmark.position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <Model animate={animate} />
      {/* invisible, generous hit area for touch devices */}
      <mesh position={[0, 1.2, 0]} visible={false}>
        <cylinderGeometry args={[landmark.id === 'farms' ? 3.6 : 2.2, 2.2, 2.6, 12]} />
      </mesh>
      <group ref={pin} position={[0, 3.3, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.28, 0.6, 4]} />
          <meshStandardMaterial color={landmark.color} emissive={landmark.color} emissiveIntensity={active ? 1.2 : 0.6} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color={landmark.color} emissive={landmark.color} emissiveIntensity={active ? 1.2 : 0.6} />
        </mesh>
      </group>
      {active && (
        <Html position={[0, 4.3, 0]} center distanceFactor={18} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded-full border border-white/20 bg-ink-900/90 px-3 py-1 text-sm font-semibold text-white shadow-lg">
            {label}
          </div>
        </Html>
      )}
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[landmark.id === 'farms' ? 4 : 2.4, landmark.id === 'farms' ? 4.2 : 2.6, 48]} />
          <meshBasicMaterial color={landmark.color} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

function Clouds() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.02
  })
  const clouds = useMemo(
    () => [
      [-14, 12, -8],
      [10, 13, -14],
      [16, 11.5, 2],
      [-6, 12.5, 14],
    ],
    [],
  )
  return (
    <group ref={group}>
      {clouds.map(([x, y, z]) => (
        <group key={`${x}${z}`} position={[x, y, z]}>
          {[
            [0, 0, 0, 1],
            [0.9, -0.1, 0.2, 0.75],
            [-0.9, -0.15, 0, 0.7],
            [0.3, 0.35, -0.2, 0.7],
          ].map(([cx, cy, cz, r]) => (
            <mesh key={`${cx}${cy}`} position={[cx, cy, cz]}>
              <icosahedronGeometry args={[r, 1]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.9} flatShading />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

/* ----------------------------------------------------------------------------
 * Camera rig – smoothly moves the orbit target to the selected landmark
 * -------------------------------------------------------------------------- */
function CameraRig({
  selected,
  autoRotate,
}: {
  selected: LandmarkId | null
  autoRotate: boolean
}) {
  const controls = useRef<OrbitControlsImpl>(null)
  const target = useRef(new THREE.Vector3())
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    const l = landmarks.find((x) => x.id === selected)
    target.current.set(l ? l.position[0] * 0.6 : 0, 0, l ? l.position[2] * 0.6 : 0)
  }, [selected])

  useFrame(() => {
    const c = controls.current
    if (!c) return
    c.target.lerp(target.current, 0.06)
    c.update()
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan
      screenSpacePanning={false}
      minDistance={12}
      maxDistance={48}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI / 2.25}
      autoRotate={autoRotate && !userInteracted && !selected}
      autoRotateSpeed={0.5}
      onStart={() => setUserInteracted(true)}
    />
  )
}

export interface VillageSceneProps {
  selected: LandmarkId | null
  onSelect: (id: LandmarkId | null) => void
  labels: Record<LandmarkId, string>
  lowPower: boolean
  animate: boolean
}

export function VillageScene({ selected, onSelect, labels, lowPower, animate }: VillageSceneProps) {
  return (
    <>
      <color attach="background" args={['#0b1220']} />
      <fog attach="fog" args={['#0b1220', 40, 80]} />
      <hemisphereLight args={['#bae6fd', '#3f2d1a', 0.9]} />
      <directionalLight
        position={[14, 22, 10]}
        intensity={2.2}
        color="#fff7e6"
        castShadow={!lowPower}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <ambientLight intensity={0.25} />

      <group onPointerMissed={() => onSelect(null)}>
        <Terrain />
        <Houses count={lowPower ? 22 : 42} />
        <Trees count={lowPower ? 35 : 80} />
        <StreetLights />
        {landmarks.map((l) => (
          <LandmarkObject
            key={l.id}
            landmark={l}
            label={labels[l.id]}
            selected={selected === l.id}
            onSelect={onSelect}
            animate={animate}
          />
        ))}
        {animate && !lowPower && <Clouds />}
      </group>

      <CameraRig selected={selected} autoRotate={animate} />
    </>
  )
}
