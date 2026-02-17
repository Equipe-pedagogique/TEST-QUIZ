window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  var player = GetPlayer();
var date = new Date();
// Formate la date en français (jj/mm/aaaa)
var dateFr = date.toLocaleDateString('fr-FR');

// Attention : Le nom entre guillemets doit être IDENTIQUE à celui de Storyline
player.SetVar("DateduJour", dateFr);
}

window.Script2 = function()
{
  var player = GetPlayer();

// 1. Récupération de vos variables (Noms exacts)
var date = player.GetVar("DateduJour");
var nom = player.GetVar("SaisieNomcandidat3");
var concession = player.GetVar("saisieconcession1");
var score1 = player.GetVar("Quiz1.ScorePercent");
var score2 = player.GetVar("Quiz2.ScorePercent");
var score3 = player.GetVar("Quiz3.ScorePercent");

// 2. Votre URL de script (Collez la VÔTRE entre les guillemets ci-dessous)
var webAppUrl = "https://script.google.com/macros/s/VOTRE_ID_DE_DEPLOYEMENT_ICI/exec";

// 3. Construction du message
// On associe nos variables JS aux paramètres du script Google (date, nom, concession, q1, q2, q3)
var finalUrl = webAppUrl + 
               "?date=" + encodeURIComponent(date) + 
               "&nom=" + encodeURIComponent(nom) + 
               "&concession=" + encodeURIComponent(concession) + 
               "&q1=" + score1 + 
               "&q2=" + score2 + 
               "&q3=" + score3;

// 4. Envoi
fetch(finalUrl)
.then(function(response) {
  console.log("Envoi réussi vers Google Sheet");
})
.catch(function(error) {
  console.log("Erreur d'envoi : " + error);
});
}

window.Script3 = function()
{
  var player = GetPlayer();
var date = new Date();
// Formate la date en français (jj/mm/aaaa)
var dateFr = date.toLocaleDateString('fr-FR');

// Attention : Le nom entre guillemets doit être IDENTIQUE à celui de Storyline
player.SetVar("DateduJour", dateFr);
}

window.Script4 = function()
{
  // Création du style pour l'impression
var css = "@media print {";
// 1. On cache TOUT le corps de la page
css += "body * { visibility: hidden; }";
// 2. On rend visible uniquement le conteneur de la slide (et son contenu)
// Note : .slide-window-slide-container est la classe cible pour le Modern Player
css += ".slide-window-slide-container, .slide-window-slide-container * { visibility: visible; }";
// 3. On repositionne la slide tout en haut à gauche pour qu'elle prenne toute la page
css += ".slide-window-slide-container { position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible; }";
css += "}";

// Injection du style dans la page
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

// Lancement de l'impression
window.print();
}

};
