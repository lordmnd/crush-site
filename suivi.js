// Statistiques anonymes du site Crush (visites et téléchargements, sans donnée personnelle)
// + fenêtre d'aide qui s'ouvre juste après le clic sur « Télécharger ».
(function () {
  var URL_API = "https://ulhyutdlsnuqixcupfas.supabase.co/rest/v1/rpc/noter_evenement_site";
  var CLE = "sb_publishable_n01GNpwTCTZY27qOA_NWuA_b6i3Vu-3"; // clé publique
  function source() {
    try {
      var p = new URLSearchParams(location.search);
      var s = p.get("utm_source") || p.get("src");
      if (s) { sessionStorage.setItem("crush_src", s); return s; }
      var m = sessionStorage.getItem("crush_src"); if (m) return m;
    } catch (e) {}
    var r = document.referrer || "";
    if (/facebook|fb\.|messenger/i.test(r) || /FBAN|FBAV|FB_IAB/.test(navigator.userAgent)) return "facebook";
    if (/instagram/i.test(r) || /Instagram/.test(navigator.userAgent)) return "instagram";
    if (/tiktok/i.test(r)) return "tiktok";
    if (/whatsapp/i.test(r) || /WhatsApp/.test(navigator.userAgent)) return "whatsapp";
    if (r && r.indexOf(location.host) < 0) { try { return new URL(r).hostname; } catch (e) {} }
    return "direct";
  }
  function noter(ev) {
    try {
      var corps = JSON.stringify({ evenement: ev, source: source() });
      fetch(URL_API, { method: "POST", keepalive: true,
        headers: { "apikey": CLE, "Authorization": "Bearer " + CLE, "Content-Type": "application/json" },
        body: corps });
    } catch (e) {}
  }
  window.crushNoter = noter;
  if (!sessionStorage.getItem("crush_vu")) { try { sessionStorage.setItem("crush_vu", "1"); } catch (e) {} noter("visite"); }

  function aide() {
    var f = document.getElementById("aide-install"); if (f) f.style.display = "flex";
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (/crush-ancien-telephone\.apk$/.test(h)) { noter("telechargement_ancien"); setTimeout(aide, 400); }
    else if (/crush\.apk$/.test(h)) { noter("telechargement_android"); setTimeout(aide, 400); }
    else if (/iphone\.html$/.test(h)) { noter("iphone"); }
    if (a.id === "aide-fermer") { e.preventDefault(); document.getElementById("aide-install").style.display = "none"; }
  });
})();
