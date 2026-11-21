// Bascule français / malgache. Ordre : ?lang=… dans l'adresse, puis dernier choix, puis langue du téléphone.
(function () {
  var html = document.documentElement;
  function lireChoix() {
    try { return localStorage.getItem('crush-langue'); } catch (e) { return null; }
  }
  function memoriser(l) {
    try { localStorage.setItem('crush-langue', l); } catch (e) {}
  }
  function appliquer(l) {
    html.lang = l;
    var boutons = document.querySelectorAll('.langues button');
    for (var i = 0; i < boutons.length; i++) {
      boutons[i].setAttribute('aria-pressed', boutons[i].dataset.lang === l ? 'true' : 'false');
    }
    var titre = document.querySelector('meta[name="titre-' + l + '"]');
    if (titre) document.title = titre.content;
  }
  var param = new URLSearchParams(location.search).get('lang');
  var depart = param === 'mg' || param === 'fr' ? param
    : lireChoix() || ((navigator.language || '').toLowerCase().indexOf('mg') === 0 ? 'mg' : 'fr');
  appliquer(depart);
  document.addEventListener('DOMContentLoaded', function () {
    appliquer(html.lang);
    var boutons = document.querySelectorAll('.langues button');
    for (var i = 0; i < boutons.length; i++) {
      boutons[i].addEventListener('click', function () {
        appliquer(this.dataset.lang);
        memoriser(this.dataset.lang);
      });
    }
  });
})();
