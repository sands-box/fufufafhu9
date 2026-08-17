window.TL = window.TL || {};

window.TL.Canvas2D = {
    state: {
        points: [{x: 2, y: 2}, {x: 6, y: 2}, {x: 4, y: 5}],
        scale: 30,
        param1: 0,
        param2: 0,
        showBantu: false,
        showKomposisi: false
    },
    onBantuToggle: null,

    render(container, moduleId) {
        this.state.param1 = moduleId === 'dilatasi' ? 2 : (moduleId === 'rotasi' ? 90 : 0);
        this.state.param2 = 0;
        this.state.showBantu = false;
        this.state.showKomposisi = false;

        let controlsHTML = '';
        if (moduleId === 'refleksi') {
            controlsHTML = `
                <div class="kontrol-item">
                    <label>Sumbu Cermin</label>
                    <select id="ctrl-param1" class="control-select">
                        <option value="0">Sumbu X</option>
                        <option value="1">Sumbu Y</option>
                        <option value="2">Garis y = x</option>
                    </select>
                </div>
                <label class="checkbox-label"><input type="checkbox" id="ctrl-bantu"> Tampilkan Garis Bantu</label>
                <label class="checkbox-label"><input type="checkbox" id="ctrl-komposisi"> Pratinjau Refleksi Ganda</label>
            `;
        } else if (moduleId === 'translasi') {
            controlsHTML = `
                <div class="kontrol-item">
                    <label>Geser X (dx)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-10" max="10" value="0">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">0</span>
                </div>
                <div class="kontrol-item">
                    <label>Geser Y (dy)</label>
                    <input type="range" id="ctrl-param2" class="control-slider" min="-10" max="10" value="0">
                    <span id="val-param2" style="color:var(--color-warm-light); font-size:0.8rem;">0</span>
                </div>
                <label class="checkbox-label"><input type="checkbox" id="ctrl-bantu"> Tampilkan Garis Bantu</label>
            `;
        } else if (moduleId === 'rotasi') {
            controlsHTML = `
                <div class="kontrol-item">
                    <label>Sudut Rotasi (&deg;)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-360" max="360" step="15" value="90">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">90</span>
                </div>
                <label class="checkbox-label"><input type="checkbox" id="ctrl-bantu"> Tampilkan Garis Bantu</label>
            `;
        } else if (moduleId === 'dilatasi') {
            controlsHTML = `
                <div class="kontrol-item">
                    <label>Faktor Skala (k)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-3" max="3" step="0.5" value="2">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">2</span>
                </div>
                <label class="checkbox-label"><input type="checkbox" id="ctrl-bantu"> Tampilkan Garis Bantu</label>
            `;
        }

        container.innerHTML = `
            <canvas id="eks-canvas"></canvas>
            <div class="kontrol-bar">${controlsHTML}</div>
        `;

        const canvas = container.querySelector('#eks-canvas');
        const ctx = canvas.getContext('2d');
        const ctrl1 = container.querySelector('#ctrl-param1');
        const ctrl2 = container.querySelector('#ctrl-param2');
        const val1 = container.querySelector('#val-param1');
        const val2 = container.querySelector('#val-param2');
        const bantuCheck = container.querySelector('#ctrl-bantu');
        const komposisiCheck = container.querySelector('#ctrl-komposisi');

        const updateParams = () => {
            if (ctrl1) { this.state.param1 = parseFloat(ctrl1.value); if (val1) val1.innerText = ctrl1.value; }
            if (ctrl2) { this.state.param2 = parseFloat(ctrl2.value); if (val2) val2.innerText = ctrl2.value; }
            this.draw(canvas, ctx, moduleId, container);
        };
        if (ctrl1) ctrl1.addEventListener('input', updateParams);
        if (ctrl2) ctrl2.addEventListener('input', updateParams);

        if (bantuCheck) {
            bantuCheck.addEventListener('change', () => {
                this.state.showBantu = bantuCheck.checked;
                if (typeof this.onBantuToggle === 'function') this.onBantuToggle(this.state.showBantu);
                this.draw(canvas, ctx, moduleId, container);
            });
        }
        if (komposisiCheck) {
            komposisiCheck.addEventListener('change', () => {
                this.state.showKomposisi = komposisiCheck.checked;
                this.draw(canvas, ctx, moduleId, container);
            });
        }

        let draggingIndex = -1;
        const worldToScreen = (p) => ({ x: canvas.width/2 + p.x*this.state.scale, y: canvas.height/2 - p.y*this.state.scale });
        const screenToWorld = (sx, sy) => ({ x: (sx - canvas.width/2)/this.state.scale, y: (canvas.height/2 - sy)/this.state.scale });

        canvas.addEventListener('mousedown', (e) => {
            for (let i = 0; i < this.state.points.length; i++) {
                const s = worldToScreen(this.state.points[i]);
                if (Math.hypot(e.offsetX - s.x, e.offsetY - s.y) < 14) { draggingIndex = i; break; }
            }
        });
        canvas.addEventListener('mousemove', (e) => {
            if (draggingIndex === -1) return;
            const w = screenToWorld(e.offsetX, e.offsetY);
            this.state.points[draggingIndex] = { x: Math.round(w.x*2)/2, y: Math.round(w.y*2)/2 };
            this.draw(canvas, ctx, moduleId, container);
        });
        const stopDrag = () => { draggingIndex = -1; };
        canvas.addEventListener('mouseup', stopDrag);
        canvas.addEventListener('mouseleave', stopDrag);

        const resize = () => {
            if (container.offsetParent === null) return;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight - 90;
            this.draw(canvas, ctx, moduleId, container);
        };
        window.addEventListener('resize', resize);
        this._resize = resize;
        resize();
    },

    draw(canvas, ctx, moduleId, container) {
        const w = canvas.width, h = canvas.height, sc = this.state.scale, pts = this.state.points, p1 = this.state.param1, p2 = this.state.param2;
        const COLOR_ASAL = '#38bdf8', COLOR_BAYANGAN = '#f59e42', COLOR_KOMPOSISI = '#a78bfa', COLOR_LABEL = '#fef3c7', COLOR_BANTU = 'rgba(254,243,199,0.85)';

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);

        ctx.strokeStyle = 'rgba(254, 243, 199, 0.1)'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w / 2; x += sc) { ctx.moveTo(x, -h / 2); ctx.lineTo(x, h / 2); ctx.moveTo(-x, -h / 2); ctx.lineTo(-x, h / 2); }
        for (let y = 0; y <= h / 2; y += sc) { ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y); ctx.moveTo(-w / 2, -y); ctx.lineTo(w / 2, -y); }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(254, 243, 199, 0.5)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0); ctx.moveTo(0, -h / 2); ctx.lineTo(0, h / 2); ctx.stroke();

        ctx.fillStyle = COLOR_LABEL; ctx.font = '700 17px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('X', w / 2 - 26, -16);
        ctx.fillText('Y', 26, -h / 2 + 30);
        ctx.textAlign = 'left';

        let tPts = [];
        if (moduleId === 'refleksi') {
            tPts = pts.map(p => p1 === 0 ? {x:p.x,y:-p.y} : p1 === 1 ? {x:-p.x,y:p.y} : {x:p.y,y:p.x});
            ctx.strokeStyle = 'rgba(245, 158, 66, 0.8)'; ctx.setLineDash([5, 5]);
            ctx.beginPath();
            if (p1 === 0) { ctx.moveTo(-w/2, 0); ctx.lineTo(w/2, 0); }
            else if (p1 === 1) { ctx.moveTo(0, -h/2); ctx.lineTo(0, h/2); }
            else { ctx.moveTo(-w/2, w/2); ctx.lineTo(w/2, -w/2); }
            ctx.stroke(); ctx.setLineDash([]);
        } else if (moduleId === 'translasi') {
            tPts = pts.map(p => ({x: p.x + p1, y: p.y + p2}));
        } else if (moduleId === 'rotasi') {
            const rad = p1 * Math.PI / 180;
            tPts = pts.map(p => ({ x: p.x*Math.cos(rad) - p.y*Math.sin(rad), y: p.x*Math.sin(rad) + p.y*Math.cos(rad) }));
        } else if (moduleId === 'dilatasi') {
            tPts = pts.map(p => ({x: p.x * p1, y: p.y * p1}));
        }

        if (this.state.showBantu) {
            if (moduleId === 'refleksi') {
                pts.forEach((p, i) => {
                    const tp = tPts[i];
                    const mid = { x: (p.x+tp.x)/2, y: (p.y+tp.y)/2 };
                    const P = {x:p.x*sc,y:-p.y*sc}, Q = {x:tp.x*sc,y:-tp.y*sc}, M = {x:mid.x*sc,y:-mid.y*sc};
                    ctx.strokeStyle = COLOR_BANTU; ctx.setLineDash([4,4]); ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(P.x,P.y); ctx.lineTo(Q.x,Q.y); ctx.stroke(); ctx.setLineDash([]);
                    const dx=Q.x-P.x, dy=Q.y-P.y, len=Math.hypot(dx,dy)||1, ux=dx/len, uy=dy/len, perpX=-uy, perpY=ux;
                    if (len > 6) {
                        const s2 = 7;
                        ctx.beginPath();
                        ctx.moveTo(M.x-ux*s2, M.y-uy*s2);
                        ctx.lineTo(M.x-ux*s2+perpX*s2, M.y-uy*s2+perpY*s2);
                        ctx.lineTo(M.x+perpX*s2, M.y+perpY*s2);
                        ctx.stroke();
                    }
                    const tick = (cx,cy) => { ctx.beginPath(); ctx.moveTo(cx-perpX*5-ux*3,cy-perpY*5-uy*3); ctx.lineTo(cx+perpX*5-ux*3,cy+perpY*5-uy*3); ctx.moveTo(cx-perpX*5+ux*3,cy-perpY*5+uy*3); ctx.lineTo(cx+perpX*5+ux*3,cy+perpY*5+uy*3); ctx.stroke(); };
                    ctx.strokeStyle = COLOR_ASAL; ctx.lineWidth = 2; tick((P.x+M.x)/2,(P.y+M.y)/2);
                    ctx.strokeStyle = COLOR_BAYANGAN; tick((M.x+Q.x)/2,(M.y+Q.y)/2);
                    const jarak = p1===0 ? Math.abs(p.y) : p1===1 ? Math.abs(p.x) : Math.abs(p.x-p.y)/Math.SQRT2;
                    const drawJarakLabel = (lx, ly) => {
                        const txt = jarak.toFixed(1);
                        ctx.font = '600 12px Inter';
                        ctx.textAlign = 'center';
                        const tw = ctx.measureText(txt).width;
                        ctx.fillStyle = 'rgba(15,23,41,0.75)';
                        ctx.fillRect(lx - tw/2 - 4, ly - 10, tw + 8, 16);
                        ctx.fillStyle = COLOR_LABEL;
                        ctx.fillText(txt, lx, ly + 3);
                        ctx.textAlign = 'left';
                    };
                    drawJarakLabel((P.x+M.x)/2+perpX*18, (P.y+M.y)/2+perpY*18);
                    drawJarakLabel((M.x+Q.x)/2+perpX*18, (M.y+Q.y)/2+perpY*18);
                });
            } else if (moduleId === 'translasi') {
                pts.forEach((p, i) => {
                    const tp = tPts[i];
                    const P = {x:p.x*sc,y:-p.y*sc}, Q = {x:tp.x*sc,y:-tp.y*sc};
                    ctx.strokeStyle = COLOR_BANTU; ctx.setLineDash([4,4]); ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(P.x,P.y); ctx.lineTo(Q.x,Q.y); ctx.stroke(); ctx.setLineDash([]);
                });
                const p0 = worldToScreenLocal(pts[0], sc), t0 = worldToScreenLocal(tPts[0], sc);
                ctx.fillStyle = COLOR_LABEL; ctx.font = '600 12px Poppins';
                ctx.fillText(`(${p1.toFixed(1)}, ${p2.toFixed(1)})`, (p0.x+t0.x)/2 + 10, (p0.y+t0.y)/2 - 10);
            } else if (moduleId === 'rotasi') {
                pts.forEach((p) => {
                    const r = Math.hypot(p.x, p.y);
                    const a0 = Math.atan2(-p.y, p.x);
                    const rad = p1 * Math.PI / 180;
                    const a1 = a0 - rad;
                    ctx.strokeStyle = COLOR_BANTU; ctx.setLineDash([3,3]); ctx.lineWidth = 1.2;
                    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(p.x*sc, -p.y*sc); ctx.stroke();
                    const tpx = p.x*Math.cos(rad) - p.y*Math.sin(rad), tpy = p.x*Math.sin(rad) + p.y*Math.cos(rad);
                    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(tpx*sc, -tpy*sc); ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, r*sc, a0, a1, rad > 0);
                    ctx.stroke();
                    ctx.setLineDash([]);
                });
                ctx.fillStyle = COLOR_LABEL; ctx.font = '600 12px Poppins';
                ctx.fillText(p1 + '°', 14, -14);
            } else if (moduleId === 'dilatasi') {
                pts.forEach((p, i) => {
                    const tp = tPts[i];
                    const P = {x:p.x*sc,y:-p.y*sc}, Q = {x:tp.x*sc,y:-tp.y*sc};
                    ctx.strokeStyle = COLOR_BANTU; ctx.setLineDash([4,4]); ctx.lineWidth = 1.2;
                    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Q.x,Q.y); ctx.stroke(); ctx.setLineDash([]);
                    const jarakP = Math.hypot(p.x,p.y).toFixed(1);
                    const jarakT = Math.hypot(tp.x,tp.y).toFixed(1);
                    ctx.fillStyle = COLOR_LABEL; ctx.font = '11px Inter';
                    ctx.fillText('O→P: ' + jarakP, P.x + 10, P.y);
                    ctx.fillText("O→P': " + jarakT, Q.x + 10, Q.y);
                });
            }
        }

        const drawShape = (points, color, fillColor, suffix, showLabel) => {
            ctx.beginPath();
            points.forEach((p, i) => { const px=p.x*sc, py=-p.y*sc; if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py); });
            ctx.closePath(); ctx.fillStyle = fillColor; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
            if (showLabel === false) return;
            points.forEach((p, i) => {
                const px=p.x*sc, py=-p.y*sc;
                ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px,py,4,0,Math.PI*2); ctx.fill();
                ctx.fillStyle = COLOR_LABEL; ctx.font = '12px Inter'; ctx.fillText(String.fromCharCode(65+i)+suffix, px+8, py-8);
            });
        };

        if (moduleId === 'refleksi' && this.state.showKomposisi) {
            const kPts = pts.map(p => ({x:-p.x, y:-p.y}));
            drawShape(kPts, COLOR_KOMPOSISI, 'rgba(167,139,250,0.15)', '"', false);
        }
        drawShape(pts, COLOR_ASAL, 'rgba(56, 189, 248, 0.2)', '');
        drawShape(tPts, COLOR_BAYANGAN, 'rgba(245, 158, 66, 0.2)', "'");

        ctx.restore();

        function worldToScreenLocal(p, scl) { return { x: p.x*scl, y: -p.y*scl }; }
    }
};
