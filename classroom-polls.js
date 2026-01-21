// src/reveal-plugin/classroom-polls.js
/**
 * Classroom Polls plugin for Reveal.js
 *
 * Usage in slides:
 * <section>
 *   <div class="poll"
 *        data-poll-id="uuid-from-dashboard"
 *        data-poll-url="https://your-polls.netlify.app">
 *   </div>
 * </section>
 */

const ClassroomPolls = {
  id: 'classroom-polls',

  init: function(reveal) {
    // Find all poll containers
    const pollDivs = reveal.getRevealElement().querySelectorAll('.poll[data-poll-id]');

    pollDivs.forEach(div => {
      const pollId = div.dataset.pollId;
      const baseUrl = div.dataset.pollUrl || 'http://localhost:5173';

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = `${baseUrl}/src/student/?poll=${pollId}`;
      iframe.style.cssText = `
        width: 100%;
        height: 400px;
        border: none;
        border-radius: 12px;
        background: white;
      `;

      div.appendChild(iframe);
    });

    // Add keyboard shortcut to copy current slide's poll URL
    reveal.addKeyBinding({ keyCode: 80, key: 'P', description: 'Copy poll URL' }, () => {
      const currentSlide = reveal.getCurrentSlide();
      const pollDiv = currentSlide.querySelector('.poll[data-poll-id]');

      if (pollDiv) {
        const pollId = pollDiv.dataset.pollId;
        const baseUrl = pollDiv.dataset.pollUrl || 'http://localhost:5173';
        const url = `${baseUrl}/src/student/?poll=${pollId}`;

        navigator.clipboard.writeText(url).then(() => {
          console.log('Poll URL copied:', url);
        });
      }
    });
  }
};

export default ClassroomPolls;
