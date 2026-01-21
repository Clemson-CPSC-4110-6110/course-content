/**
 * VR Course Slides - Plugin Configuration
 * Initializes Reveal.js with all plugins and custom configuration
 *
 * Usage: <script src="assets/slides-init.js"></script>
 * Must be loaded AFTER reveal.js and plugin scripts
 */

// Classroom Polls Plugin
const ClassroomPolls = {
    id: 'classroom-polls',
    init: function(reveal) {
        const pollDivs = reveal.getRevealElement().querySelectorAll('.poll[data-poll-id]');
        pollDivs.forEach(div => {
            const pollId = div.dataset.pollId;
            const baseUrl = div.dataset.pollUrl || 'http://localhost:5173';
            const iframe = document.createElement('iframe');
            iframe.src = `${baseUrl}/src/student/?poll=${pollId}`;
            iframe.style.cssText = 'width:100%;height:400px;border:none;border-radius:12px;background:white;';
            div.appendChild(iframe);
        });
    }
};

// Laser Pointer Plugin
const Pointer = {
    id: 'pointer',
    init: function(reveal) {
        let pointerEl = null;
        let isPointerActive = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'q' || e.key === 'Q') {
                isPointerActive = !isPointerActive;
                if (isPointerActive) {
                    pointerEl = document.createElement('div');
                    pointerEl.className = 'reveal-pointer';
                    document.body.appendChild(pointerEl);
                } else if (pointerEl) {
                    pointerEl.remove();
                    pointerEl = null;
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (pointerEl && isPointerActive) {
                pointerEl.style.left = e.clientX + 'px';
                pointerEl.style.top = e.clientY + 'px';
            }
        });
    }
};

// Initialize Reveal with full configuration
Reveal.initialize({
    // Navigation
    hash: true,
    slideNumber: 'c/t',
    showSlideNumber: 'all',

    // Transitions
    transition: 'fade',
    transitionSpeed: 'fast',
    backgroundTransition: 'fade',

    // Layout
    width: 1280,
    height: 720,
    margin: 0.1,
    center: true,

    // Plugins
    plugins: [
        RevealHighlight,
        RevealNotes,
        RevealZoom,
        RevealChalkboard,
        ClassroomPolls,
        Pointer
    ],

    // Highlight plugin configuration
    highlight: {
        highlightOnLoad: true,
        lineNumbers: true
    },

    // Chalkboard plugin configuration
    chalkboard: {
        boardmarkerWidth: 4,
        chalkWidth: 5,
        chalkEffect: 0.2,
        storage: null,
        src: null,
        readOnly: false,
        transition: 800,
        theme: "chalkboard",
        background: ['rgba(127,127,127,.1)', 'reveal.js-plugins/chalkboard/img/blackboard.png'],
        grid: { color: 'rgb(50,50,50,0.3)', distance: 80, width: 2 },
        eraser: { src: null, radius: 20 },
        boardmarkers: [
            { color: '#00d4aa', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/boardmarker-green.png), auto' },
            { color: '#ef4444', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/boardmarker-red.png), auto' },
            { color: '#3b82f6', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/boardmarker-blue.png), auto' },
            { color: '#eab308', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/boardmarker-yellow.png), auto' },
            { color: '#ffffff', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/boardmarker-black.png), auto' }
        ],
        chalks: [
            { color: '#ffffff', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/chalk-white.png), auto' },
            { color: '#ef4444', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/chalk-red.png), auto' },
            { color: '#3b82f6', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/chalk-blue.png), auto' },
            { color: '#22c55e', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/chalk-green.png), auto' },
            { color: '#eab308', cursor: 'url(https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chalkboard/img/chalk-yellow.png), auto' }
        ]
    },

    // Zoom plugin - Alt+click to zoom
    zoomKey: 'alt'
});
