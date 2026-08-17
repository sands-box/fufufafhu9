window.TL = window.TL || {};

window.TL.Canvas3D = {
    animationId: null,
    _update: null,

    _makeAxisLabel(text, color) {
        const c = document.createElement('canvas');
        c.width = 96; c.height = 96;
        const cx = c.getContext('2d');
        cx.fillStyle = color;
        cx.font = 'bold 56px Poppins, sans-serif';
        cx.textAlign = 'center';
        cx.textBaseline = 'middle';
        cx.fillText(text, 48, 48);
        const tex = new THREE.CanvasTexture(c);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(1.4, 1.4, 1.4);
        return sprite;
    },

    render(container, moduleId) {
        if (!window.THREE) {
            container.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--color-warm-light); opacity:0.6; font-size:0.85rem; text-align:center; padding:20px;">Visual 3D butuh koneksi internet untuk memuat library-nya.</div>`;
            return;
        }
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this._update = null;

        let controlsHTML = '';
        if (moduleId === 'refleksi') {
            controlsHTML = `
                <div class="slider-row"><div class="slider-label"><span>Jarak ke Cermin (X)</span><b id="v-x">2.0</b></div><input type="range" id="s-x" min="0" max="6" step="0.5" value="2"></div>
                <div class="slider-row"><div class="slider-label"><span>Kiri &harr; Kanan (Y)</span><b id="v-z">0.0</b></div><input type="range" id="s-z" min="-7" max="7" step="0.5" value="0"></div>
                <div class="slider-row"><div class="slider-label"><span>Atas &#8597; Bawah (Z)</span><b id="v-y">0.0</b></div><input type="range" id="s-y" min="-7" max="7" step="0.5" value="0"></div>
                <label class="checkbox-label"><input type="checkbox" id="s-bantu"> Tampilkan Garis Bantu</label>
                <div class="jarak-readout-3d">
                    <div class="baris"><span class="dotA">&#9679;</span> Jarak titik asal ke cermin: <b id="j-asal">2.0</b> satuan</div>
                    <div class="baris"><span class="dotB">&#9679;</span> Jarak bayangan ke cermin: <b id="j-bayangan">2.0</b> satuan</div>
                </div>`;
        } else if (moduleId === 'translasi') {
            controlsHTML = `
                <div class="slider-row"><div class="slider-label"><span>Geser X (dx)</span><b id="v-x">3.0</b></div><input type="range" id="s-x" min="-7" max="7" step="0.5" value="3"></div>
                <div class="slider-row"><div class="slider-label"><span>Geser Y (dy)</span><b id="v-y">2.0</b></div><input type="range" id="s-y" min="-7" max="7" step="0.5" value="2"></div>
                <div class="slider-row"><div class="slider-label"><span>Geser Z (dz)</span><b id="v-z">0.0</b></div><input type="range" id="s-z" min="-7" max="7" step="0.5" value="0"></div>
                <label class="checkbox-label"><input type="checkbox" id="s-bantu"> Tampilkan Garis Bantu</label>
                <div class="jarak-readout-3d">
                    <div class="baris">Vektor pergeseran: <b id="j-vektor">(3.0, 2.0, 0.0)</b></div>
                </div>`;
        } else if (moduleId === 'rotasi') {
            controlsHTML = `
                <div class="slider-row"><div class="slider-label"><span>Sudut Rotasi</span><b id="v-sudut">90&deg;</b></div><input type="range" id="s-sudut" min="-360" max="360" step="15" value="90"></div>
                <div class="slider-row"><div class="slider-label"><span>Jari-jari</span><b id="v-radius">3.0</b></div><input type="range" id="s-radius" min="1" max="7" step="0.5" value="3"></div>
                <div class="slider-row"><div class="slider-label"><span>Tinggi (Z)</span><b id="v-y">0.0</b></div><input type="range" id="s-y" min="-7" max="7" step="0.5" value="0"></div>
                <label class="checkbox-label"><input type="checkbox" id="s-bantu"> Tampilkan Garis Bantu</label>
                <div class="jarak-readout-3d">
                    <div class="baris">Jari-jari (jarak ke pusat): <b id="j-radius">3.0</b> satuan, tetap sama sebelum &amp; sesudah</div>
                </div>`;
        } else if (moduleId === 'dilatasi') {
            controlsHTML = `
                <div class="slider-row"><div class="slider-label"><span>Posisi X</span><b id="v-x">3.0</b></div><input type="range" id="s-x" min="-7" max="7" step="0.5" value="3"></div>
                <div class="slider-row"><div class="slider-label"><span>Posisi Y</span><b id="v-y">2.0</b></div><input type="range" id="s-y" min="-7" max="7" step="0.5" value="2"></div>
                <div class="slider-row"><div class="slider-label"><span>Posisi Z</span><b id="v-z">0.0</b></div><input type="range" id="s-z" min="-7" max="7" step="0.5" value="0"></div>
                <div class="slider-row"><div class="slider-label"><span>Faktor Skala (k)</span><b id="v-k">2.0</b></div><input type="range" id="s-k" min="-3" max="3" step="0.5" value="2"></div>
                <label class="checkbox-label"><input type="checkbox" id="s-bantu"> Tampilkan Garis Bantu</label>
                <div class="jarak-readout-3d">
                    <div class="baris"><span class="dotA">&#9679;</span> Jarak O&rarr;P: <b id="j-op">-</b></div>
                    <div class="baris"><span class="dotB">&#9679;</span> Jarak O&rarr;P': <b id="j-op2">-</b></div>
                </div>`;
        }

        container.innerHTML = `
            <div id="c3d-holder" style="width:100%; height:280px; cursor:grab;"></div>
            <div class="kontrol-3d-panel">${controlsHTML}</div>
        `;

        const holder = container.querySelector('#c3d-holder');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0f1729');
        const camera = new THREE.PerspectiveCamera(45, 4/3, 0.1, 300);
        camera.position.set(13, 10, 13);
        camera.lookAt(0, 0, 0);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        holder.appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        scene.add(dirLight);

        const pivot = new THREE.Group();
        scene.add(pivot);
        pivot.add(new THREE.GridHelper(20, 40, 0x38bdf8, 0x1a2744));
        pivot.add(new THREE.AxesHelper(9));

        const labelX = this._makeAxisLabel('X', '#ef4444');
        labelX.position.set(10.5, 0, 0);
        pivot.add(labelX);
        const labelZaxis = this._makeAxisLabel('Y', '#22c55e');
        labelZaxis.position.set(0, 0, 10.5);
        pivot.add(labelZaxis);
        const labelYaxis = this._makeAxisLabel('Z', '#38bdf8');
        labelYaxis.position.set(0, 10.5, 0);
        pivot.add(labelYaxis);

        const geo = new THREE.BoxGeometry(2, 2, 2);
        const HALF = 1;
        const matAsal = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
        const matBayangan = new THREE.MeshStandardMaterial({ color: 0xf59e42 });
        const meshAsal = new THREE.Mesh(geo, matAsal);
        const meshBayangan = new THREE.Mesh(geo, matBayangan);
        pivot.add(meshAsal, meshBayangan);

        const bantuGroup = new THREE.Group();
        pivot.add(bantuGroup);
        const clearBantu = () => { while (bantuGroup.children.length) bantuGroup.remove(bantuGroup.children[0]); };
        const addDashedLine = (p1, p2, color) => {
            const lm = new THREE.LineDashedMaterial({ color: color || 0xfef3c7, dashSize: 0.15, gapSize: 0.1 });
            const lg = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const line = new THREE.Line(lg, lm);
            line.computeLineDistances();
            bantuGroup.add(line);
        };

        if (moduleId === 'refleksi') {
            const planeGeo = new THREE.PlaneGeometry(14, 14);
            const planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
            const mirrorPlane = new THREE.Mesh(planeGeo, planeMat);
            mirrorPlane.rotation.y = Math.PI / 2;
            pivot.add(mirrorPlane);
        }

        const sX = container.querySelector('#s-x'), sY = container.querySelector('#s-y'), sZ = container.querySelector('#s-z');
        const vX = container.querySelector('#v-x'), vY = container.querySelector('#v-y'), vZ = container.querySelector('#v-z');
        const sBantu = container.querySelector('#s-bantu');

        const update = () => {
            clearBantu();
            if (moduleId === 'refleksi') {
                const rawX = parseFloat(sX.value);
                const x = rawX + 1;
                const y = parseFloat(sY.value), z = parseFloat(sZ.value);
                vX.innerText = rawX.toFixed(1);
                vY.innerText = y.toFixed(1);
                vZ.innerText = z.toFixed(1);
                meshAsal.position.set(x, y, z);
                meshBayangan.position.set(-x, y, z);
                const faceDist = rawX;
                container.querySelector('#j-asal').innerText = faceDist.toFixed(1);
                container.querySelector('#j-bayangan').innerText = faceDist.toFixed(1);
                if (sBantu.checked) {
                    addDashedLine(new THREE.Vector3(x, y, z), new THREE.Vector3(-x, y, z));
                }
            } else if (moduleId === 'translasi') {
                const dx = parseFloat(sX.value), dy = parseFloat(sY.value), dz = parseFloat(sZ.value);
                vX.innerText = dx.toFixed(1);
                vY.innerText = dy.toFixed(1);
                vZ.innerText = dz.toFixed(1);
                meshAsal.position.set(-2, -2, 0);
                meshBayangan.position.set(-2 + dx, -2 + dy, dz);
                container.querySelector('#j-vektor').innerText = `(${dx.toFixed(1)}, ${dy.toFixed(1)}, ${dz.toFixed(1)})`;
                if (sBantu.checked) {
                    addDashedLine(meshAsal.position.clone(), meshBayangan.position.clone(), 0xf59e42);
                }
            } else if (moduleId === 'rotasi') {
                const sudutDeg = parseFloat(container.querySelector('#s-sudut').value);
                const radius = parseFloat(container.querySelector('#s-radius').value);
                const y = parseFloat(sY.value);
                container.querySelector('#v-sudut').innerText = sudutDeg.toFixed(0) + '°';
                container.querySelector('#v-radius').innerText = radius.toFixed(1);
                vY.innerText = y.toFixed(1);
                const rad = sudutDeg * Math.PI / 180;
                meshAsal.position.set(radius, y, 0);
                meshBayangan.position.set(radius * Math.cos(rad), y, -radius * Math.sin(rad));
                container.querySelector('#j-radius').innerText = radius.toFixed(1);
                if (sBantu.checked) {
                    addDashedLine(new THREE.Vector3(0, y, 0), meshAsal.position.clone(), 0x38bdf8);
                    addDashedLine(new THREE.Vector3(0, y, 0), meshBayangan.position.clone(), 0xf59e42);
                }
            } else if (moduleId === 'dilatasi') {
                const x = parseFloat(sX.value), y = parseFloat(sY.value), z = parseFloat(sZ.value);
                const k = parseFloat(container.querySelector('#s-k').value);
                vX.innerText = x.toFixed(1);
                vY.innerText = y.toFixed(1);
                vZ.innerText = z.toFixed(1);
                container.querySelector('#v-k').innerText = k.toFixed(1);
                meshAsal.position.set(x, y, z);
                meshBayangan.position.set(x * k, y * k, z * k);
                meshBayangan.scale.setScalar(Math.max(0.3, Math.abs(k)));
                const distP = Math.max(0, Math.hypot(x, y, z) - HALF);
                const distP2 = Math.max(0, Math.hypot(x * k, y * k, z * k) - HALF * Math.max(0.3, Math.abs(k)));
                container.querySelector('#j-op').innerText = distP.toFixed(1) + ' satuan';
                container.querySelector('#j-op2').innerText = distP2.toFixed(1) + ' satuan';
                if (sBantu.checked) {
                    addDashedLine(new THREE.Vector3(0, 0, 0), meshBayangan.position.clone(), 0xf59e42);
                }
            }
        };
        this._update = update;

        [sX, sY, sZ].forEach(s => { if (s) s.addEventListener('input', update); });
        const sSudut = container.querySelector('#s-sudut'), sRadius = container.querySelector('#s-radius'), sK = container.querySelector('#s-k');
        [sSudut, sRadius, sK].forEach(s => { if (s) s.addEventListener('input', update); });
        sBantu.addEventListener('change', update);
        update();

        let isDragging = false, prevPos = { x: 0, y: 0 };
        renderer.domElement.addEventListener('mousedown', (e) => { isDragging = true; prevPos = { x: e.offsetX, y: e.offsetY }; });
        window.addEventListener('mouseup', () => { isDragging = false; });
        renderer.domElement.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.offsetX - prevPos.x, dy = e.offsetY - prevPos.y;
            pivot.rotation.y += dx * 0.008;
            pivot.rotation.x += dy * 0.008;
            prevPos = { x: e.offsetX, y: e.offsetY };
        });

        const resize = () => {
            if (container.offsetParent === null) return;
            const w = holder.clientWidth, h = holder.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', resize);
        this._resize = resize;
        resize();

        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }
};