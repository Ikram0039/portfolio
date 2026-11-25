// Scroll reveal for cards and sections.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Home stage: words slide in on load.
  var stage = document.querySelector('.stage');
  if (stage) { requestAnimationFrame(function () { stage.classList.add('ready'); }); }

  // YouTube: videos load when the viewer clicks the thumbnail. Origin is set at runtime,
  // which avoids error 153 on Live Server and GitHub Pages.
  var holders = document.querySelectorAll('.video.yt[data-yt]');
  if (holders.length && location.protocol === 'file:') {
    var note = document.getElementById('yt-note');
    if (note) { note.hidden = false; }
  }
  holders.forEach(function (holder) {
    var btn = holder.querySelector('.yt-thumb');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      var id = holder.getAttribute('data-yt');
      var origin = location.protocol === 'file:' ? '' : '&origin=' + encodeURIComponent(location.origin);
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' + origin;
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.setAttribute('allowfullscreen', '');
      f.title = 'YouTube video player';
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      holder.innerHTML = '';
      holder.appendChild(f);
    });
  });
})();
