window.TL = window.TL || {};

window.TL.Canvas3D = {
    animationId: null,

    render(target, moduleId) {
        if (!window.THREE) {
            alert("Library Three.js belum dimuat.");
            return;
        }

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        const headerHTML = `
            <div class="canvas-header">
                <h3 style="color: var(--color-warm-light);">Eksplorasi 3D: <span style="color: var(--color-${moduleId}); text-transform: capitalize;">${moduleId}</span></h3>
                <div class="mode-toggle">
                    <button class="mode-btn" id="btn-2d">2D</button>
                    <button class="mode-btn active">3D</button>
                </div>
            </div>
            <div class="canvas-container" id="canvas-container-3d" style="width: 100%; height: calc(100% - 60px); cursor: move;"></div>
        `;

        const canvasSection = target.querySelector('.canvas-section');
        if (canvasSection) {
            canvasSection.innerHTML = headerHTML;
        }

        const btn2d = target.querySelector('#btn-2d');
        if (btn2d) {
            btn2d.addEventListener('click', () => {
                if (this.animationId) cancelAnimationFrame(this.animationId);
                window.TL.Canvas2D.render(target, moduleId);
            });
        }

        const container = target.querySelector('#canvas-container-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0f1729');

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(8, 6, 8);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const pivot = new THREE.Group();
        scene.add(pivot);

        const gridHelper = new THREE.GridHelper(12, 12, 0x38bdf8, 0x1a2744);
        pivot.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(6);
        pivot.add(axesHelper);

        const geo = new THREE.BoxGeometry(2, 2, 2);
        const matAsal = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
        const matBayangan = new THREE.MeshStandardMaterial({ color: 0xf59e42 });

        const meshAsal = new THREE.Mesh(geo, matAsal);
        pivot.add(meshAsal);

        if (moduleId === 'refleksi') {
            const meshBayangan = new THREE.Mesh(geo, matBayangan);
            meshBayangan.position.set(-4, 0, 0);
            pivot.add(meshBayangan);

            const planeGeo = new THREE.PlaneGeometry(6, 6);
            const planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
            const mirrorPlane = new THREE.Mesh(planeGeo, planeMat);
            mirrorPlane.rotation.y = Math.PI / 2;
            mirrorPlane.position.set(-2, 0, 0);
            pivot.add(mirrorPlane);

            meshAsal.position.set(0, 0, 0);
        } else if (moduleId === 'translasi') {
            const meshBayangan = new THREE.Mesh(geo, matBayangan);
            meshBayangan.position.set(3, 2, -3);
            pivot.add(meshBayangan);

            const dir = new THREE.Vector3(3, 2, -3).normalize();
            const length = new THREE.Vector3(3, 2, -3).length();
            const arrowHelper = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), length, 0xf59e42, 0.6, 0.4);
            pivot.add(arrowHelper);
        } else if (moduleId === 'rotasi') {
            const meshBayangan = new THREE.Mesh(geo, matBayangan);
            meshAsal.position.set(3, 0, 0);
            meshBayangan.position.set(0, 0, -3);
            meshBayangan.rotation.y = -Math.PI / 2;
            pivot.add(meshBayangan);

            const lineMat = new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.2, gapSize: 0.1 });
            const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)]);
            const axisLine = new THREE.Line(lineGeo, lineMat);
            axisLine.computeLineDistances();
            pivot.add(axisLine);
        } else if (moduleId === 'dilatasi') {
            const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true });
            const meshWire = new THREE.Mesh(geo, wireframeMat);
            pivot.add(meshWire);

            const meshBayangan = new THREE.Mesh(geo, matBayangan);
            meshBayangan.scale.set(2, 2, 2);
            meshBayangan.material.transparent = true;
            meshBayangan.material.opacity = 0.5;
            pivot.add(meshBayangan);
        }

        let isDragging = false;
        let prevPos = { x: 0, y: 0 };

        renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevPos = { x: e.offsetX, y: e.offsetY };
        });

        renderer.domElement.addEventListener('mouseup', () => { isDragging = false; });
        renderer.domElement.addEventListener('mouseleave', () => { isDragging = false; });

        renderer.domElement.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.offsetX - prevPos.x;
                const deltaY = e.offsetY - prevPos.y;
                pivot.rotation.y += deltaX * 0.008;
                pivot.rotation.x += deltaY * 0.008;
                prevPos = { x: e.offsetX, y: e.offsetY };
            }
        });

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }
};