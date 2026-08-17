window.TL = window.TL || {};

window.TL.Audio = {
    musicEl: null,
    playlist: [],
    playlistIndex: 0,
    volume: 0.5,
    muted: false,
    sfxEnabled: true,

    _ensureEl() {
        if (!this.musicEl) {
            this.musicEl = new Audio();
            this.musicEl.addEventListener('ended', () => this._onEnded());
        }
        return this.musicEl;
    },

    _onEnded() {
        if (this.playlist.length > 1) {
            this.playlistIndex = (this.playlistIndex + 1) % this.playlist.length;
            this._playCurrent();
        }
    },

    _playCurrent() {
        const el = this._ensureEl();
        el.src = this.playlist[this.playlistIndex];
        el.volume = this.muted ? 0 : this.volume;
        el.play().catch(() => {});
    },

    playSingleLoop(src) {
        this.playlist = [src];
        this.playlistIndex = 0;
        const el = this._ensureEl();
        el.loop = true;
        this._playCurrent();
    },

    playPlaylist(srcs) {
        this.playlist = srcs;
        this.playlistIndex = 0;
        const el = this._ensureEl();
        el.loop = false;
        this._playCurrent();
    },

    stop() {
        if (this.musicEl) {
            this.musicEl.pause();
            this.musicEl.currentTime = 0;
        }
        this.playlist = [];
    },

    setVolume(v) {
        this.volume = v;
        if (this.musicEl && !this.muted) this.musicEl.volume = v;
    },

    toggleMute(isMuted) {
        this.muted = isMuted;
        if (this.musicEl) this.musicEl.volume = isMuted ? 0 : this.volume;
    },

    setSfxEnabled(v) { this.sfxEnabled = v; },

    playSFX(src) {
        if (!this.sfxEnabled) return;
        const el = new Audio(src);
        el.volume = this.muted ? 0 : this.volume;
        el.play().catch(() => {});
    },

    startTyping() {
        if (!this.sfxEnabled) return;
        if (!this.typingEl) this.typingEl = new Audio('assets/audio/typing.mp3');
        this.typingEl.loop = true;
        this.typingEl.volume = this.muted ? 0 : this.volume * 0.5;
        this.typingEl.currentTime = 0;
        this.typingEl.play().catch(() => {});
    },

    stopTyping() {
        if (this.typingEl) {
            this.typingEl.pause();
            this.typingEl.currentTime = 0;
        }
    }
};
