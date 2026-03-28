import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private scales!: THREE.Mesh[];
  private animationId!: number;
  private clock = new THREE.Clock();
  private mouse = new THREE.Vector2(0, 0);

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initThreeJS();
      this.animate();
    });
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 18);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xC9A84C, 2, 50);
    goldLight.position.set(5, 5, 10);
    this.scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x334466, 1, 50);
    blueLight.position.set(-8, -3, 8);
    this.scene.add(blueLight);

    this.createParticles();
    this.createScalesOfJustice();
  }

  private createParticles(): void {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xC9A84C,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private createScalesOfJustice(): void {
    this.scales = [];
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.85,
      roughness: 0.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1C1C1C,
      metalness: 0.5,
      roughness: 0.5,
    });

    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.09, 5.5, 12);
    const pillar = new THREE.Mesh(pillarGeo, goldMat);
    pillar.position.set(6, -1, 0);
    this.scene.add(pillar);
    this.scales.push(pillar);

    const beamGeo = new THREE.BoxGeometry(5, 0.12, 0.12);
    const beam = new THREE.Mesh(beamGeo, goldMat);
    beam.position.set(6, 1.8, 0);
    this.scene.add(beam);
    this.scales.push(beam);

    [[-2.5, 0], [2.5, 0]].forEach(([dx], idx) => {
      const chainGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.8, 8);
      const chain = new THREE.Mesh(chainGeo, goldMat);
      chain.position.set(6 + dx, 0.9, 0);
      this.scene.add(chain);
      this.scales.push(chain);

      const panGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 24);
      const pan = new THREE.Mesh(panGeo, idx === 0 ? goldMat : darkMat);
      pan.position.set(6 + dx, 0, 0);
      this.scene.add(pan);
      this.scales.push(pan);
    });

    const baseGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.2, 12);
    const base = new THREE.Mesh(baseGeo, goldMat);
    base.position.set(6, -3.8, 0);
    this.scene.add(base);
    this.scales.push(base);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    const elapsed = this.clock.getElapsedTime();

    if (this.particles) {
      this.particles.rotation.y = elapsed * 0.025;
      this.particles.rotation.x = elapsed * 0.01;
    }

    if (this.scales?.length) {
      this.scales.forEach(mesh => {
        mesh.rotation.y = Math.sin(elapsed * 0.3) * 0.08 + (this.mouse.x * 0.05);
      });
    }

    this.camera.position.x += (this.mouse.x * 1.5 - this.camera.position.x) * 0.02;
    this.camera.position.y += (-this.mouse.y * 1 - this.camera.position.y) * 0.02;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer?.dispose();
    window.removeEventListener('resize', this.onResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
}
