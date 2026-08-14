window.TL = window.TL || {};

window.TL.Canvas2D = {
    state: {
        points: [{x: 2, y: 2}, {x: 6, y: 2}, {x: 4, y: 5}],
        scale: 30,
        param1: 0,
        param2: 0,
        mode: '2D'
    },

    render(target, moduleId) {
        this.state.mode = '2D';
        this.state.param1 = moduleId === 'dilatasi' ? 2 : (moduleId === 'rotasi' ? 90 : 0);
        this.state.param2 = 0;

        let controlsHTML = '';

        if (moduleId === 'refleksi') {
            controlsHTML = `
                <div class="control-group">
                    <label>Sumbu Cermin</label>
                    <select id="ctrl-param1" class="control-select">
                        <option value="0">Sumbu X</option>
                        <option value="1">Sumbu Y</option>
                        <option value="2">Garis y = x</option>
                    </select>
                </div>
            `;
        } else if (moduleId === 'translasi') {
            controlsHTML = `
                <div class="control-group">
                    <label>Geser X (dx)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-10" max="10" value="0">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">0</span>
                </div>
                <div class="control-group">
                    <label>Geser Y (dy)</label>
                    <input type="range" id="ctrl-param2" class="control-slider" min="-10" max="10" value="0">
                    <span id="val-param2" style="color:var(--color-warm-light); font-size:0.8rem;">0</span>
                </div>
            `;
        } else if (moduleId === 'rotasi') {
            controlsHTML = `
                <div class="control-group">
                    <label>Sudut Rotasi (&deg;)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-360" max="360" step="15" value="90">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">90</span>
                </div>
            `;
        } else if (moduleId === 'dilatasi') {
            controlsHTML = `
                <div class="control-group">
                    <label>Faktor Skala (k)</label>
                    <input type="range" id="ctrl-param1" class="control-slider" min="-3" max="3" step="0.5" value="2">
                    <span id="val-param1" style="color:var(--color-warm-light); font-size:0.8rem;">2</span>
                </div>
            `;
        }

        target.innerHTML = `
            <div class="eksplorasi-layout">
                <div class="canvas-section">
                    <div class="canvas-header">
                        <h3 style="color: var(--color-warm-light);">Eksplorasi 2D: <span style="color: var(--color-${moduleId}); text-transform: capitalize;">${moduleId}</span></h3>
                        <div class="mode-toggle">
                            <button class="mode-btn active">2D</button>
                            <button class="mode-btn" id="btn-3d">3D</button>
                        </div>
                    </div>
                    <div class="canvas-container" id="canvas-container">
                        <canvas id="eks-canvas"></canvas>
                    </div>
                </div>
                <div class="panel-section">
                    <div class="control-panel">
                        <h4 style="color: var(--color-accent-amber); margin-bottom: 16px;">Kontrol</h4>
                        ${controlsHTML}
                    </div>
                    <div class="table-panel">
                        <h4 style="color: var(--color-accent-amber); margin-bottom: 16px;">Titik Koordinat</h4>
                        <table class="coord-table">
                            <thead>
                                <tr><th>Asal</th><th>Bayangan</th></tr>
                            </thead>
                            <tbody id="coord-body"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const btn3d = target.querySelector('#btn-3d');
        if (btn3d) {
            btn3d.addEventListener('click', () => {
                if (window.TL.Canvas3D) {
                    window.TL.Canvas3D.render(target, moduleId);
                }
            });
        }

        const canvas = target.querySelector('#eks-canvas');
        const ctx = canvas.getContext('2d');
        const container = target.querySelector('#canvas-container');

        const ctrl1 = target.querySelector('#ctrl-param1');
        const ctrl2 = target.querySelector('#ctrl-param2');
        const val1 = target.querySelector('#val-param1');
        const val2 = target.querySelector('#val-param2');

        const updateParams = () => {
            if (ctrl1) {
                this.state.param1 = parseFloat(ctrl1.value);
                if (val1) val1.innerText = ctrl1.value;
            }
            if (ctrl2) {
                this.state.param2 = parseFloat(ctrl2.value);
                if (val2) val2.innerText = ctrl2.value;
            }
            this.draw(canvas, ctx, moduleId, target);
        };

        if (ctrl1) ctrl1.addEventListener('input', updateParams);
        if (ctrl2) ctrl2.addEventListener('input', updateParams);

        const resize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            this.draw(canvas, ctx, moduleId, target);
        };

        window.addEventListener('resize', resize);
        resize();
    },

    draw(canvas, ctx, moduleId, target) {
        const w = canvas.width;
        const h = canvas.height;
        const sc = this.state.scale;
        const pts = this.state.points;
        const p1 = this.state.param1;
        const p2 = this.state.param2;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);

        ctx.strokeStyle = 'rgba(254, 243, 199, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w / 2; x += sc) {
            ctx.moveTo(x, -h / 2); ctx.lineTo(x, h / 2);
            ctx.moveTo(-x, -h / 2); ctx.lineTo(-x, h / 2);
        }
        for (let y = 0; y <= h / 2; y += sc) {
            ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y);
            ctx.moveTo(-w / 2, -y); ctx.lineTo(w / 2, -y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(254, 243, 199, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-w / 2, 0); ctx.lineTo(w / 2, 0);
        ctx.moveTo(0, -h / 2); ctx.lineTo(0, h / 2);
        ctx.stroke();

        let tPts = [];

        if (moduleId === 'refleksi') {
            tPts = pts.map(p => {
                if (p1 === 0) return {x: p.x, y: -p.y};
                if (p1 === 1) return {x: -p.x, y: p.y};
                return {x: p.y, y: p.x};
            });
            ctx.strokeStyle = 'rgba(245, 158, 66, 0.8)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            if (p1 === 0) { ctx.moveTo(-w/2, 0); ctx.lineTo(w/2, 0); }
            else if (p1 === 1) { ctx.moveTo(0, -h/2); ctx.lineTo(0, h/2); }
            else { ctx.moveTo(-w/2, w/2); ctx.lineTo(w/2, -w/2); }
            ctx.stroke();
            ctx.setLineDash([]);
        } else if (moduleId === 'translasi') {
            tPts = pts.map(p => ({x: p.x + p1, y: p.y + p2}));
        } else if (moduleId === 'rotasi') {
            const rad = p1 * Math.PI / 180;
            tPts = pts.map(p => ({
                x: p.x * Math.cos(rad) - p.y * Math.sin(rad),
                y: p.x * Math.sin(rad) + p.y * Math.cos(rad)
            }));
        } else if (moduleId === 'dilatasi') {
            tPts = pts.map(p => ({x: p.x * p1, y: p.y * p1}));
        }

        const drawShape = (points, color, fillColor, suffix) => {
            ctx.beginPath();
            points.forEach((p, i) => {
                const px = p.x * sc;
                const py = -p.y * sc;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            points.forEach((p, i) => {
                const px = p.x * sc;
                const py = -p.y * sc;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'var(--color-warm-light)';
                ctx.font = '12px Inter';
                ctx.fillText(String.fromCharCode(65 + i) + suffix, px + 8, py - 8);
            });
        };

        drawShape(pts, 'var(--color-accent-blue)', 'rgba(56, 189, 248, 0.2)', '');
        drawShape(tPts, 'var(--color-accent-amber)', 'rgba(245, 158, 66, 0.2)', "'");

        ctx.restore();

        const tbody = target.querySelector('#coord-body');
        if (tbody) {
            tbody.innerHTML = '';
            pts.forEach((p, i) => {
                const tp = tPts[i];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${String.fromCharCode(65 + i)}(${p.x.toFixed(1)}, ${p.y.toFixed(1)})</td>
                    <td>${String.fromCharCode(65 + i)}'(${tp.x.toFixed(1)}, ${tp.y.toFixed(1)})</td>
                `;
                tbody.appendChild(tr);
            });
        }
    }
};