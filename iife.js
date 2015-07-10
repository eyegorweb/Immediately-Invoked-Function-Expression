// Date: 10/07/2015
// Immediately Invoked Function Expression

// Fonction anonyme.
// Référence à la fonction le temps de l'appel grâce à ses parenthèses ouvrante et fermante.
// Comme toute fonction crée un scope par définition, on crée un scope local et non global.
// Le conteneur est isolé, on a accès au scope global (le monde extérieur) mais le scope global n'a pas accès à notre scope local(le monde intérieur)

(function(){
  // conteneur isolé
  // Intérieur du scope de la fonction
})();

/* objet, déclaré sans "var", est une variable globale */
objet = (function(chaine_alias){
  /* ces variables ne sont pas accessibles depuis l'extérieur */
  var objet = {};
  var variablePrivee = true;

  /* ces fonctions sont accessibles seulement depuis objet */
  objet.uneMethode = function(){
      console.log(chaine_alias);
  }

  objet.uneAutreMethode = function(){
      if (variablePrivee) {
          console.log('toto');
      }
  }
  
  console.log(window.objet); // undefined car le scope global n'a pas accès à notre scope local

  /* On rend notre objet accessible au reste du monde
      en la retournant, ce qui va mettre la référence dans le 'objet'
      qui est la variable globale.
  */
  return objet;

  /* On passe 'une valeur pour chaine_alias' en paramètre, il va se retrouver dans chaine_alias */
})('une valeur pour chaine_alias');

/* On peut utiliser notre objet au même niveau */
objet.uneMethode();
objet.uneAutreMethode();

console.log(window.objet); // defined car on a retourné notre objet et on a donc la référence à objet



// Autre façon de faire, en affectant la variable privée objet à l'objet global document plutôt que faire un return et créer une référence à objet
(function(chaine_alias){
  /* ces variables ne sont pas accessibles depuis l'extérieur */
  var objet = {};
  var variablePrivee = true;

  /* ces fonctions sont accessibles seulement depuis objet */
  objet.toto = function(){
      console.log(chaine_alias);
  }

  objet.tata = function(){
      if (variablePrivee) {
          console.log('tata');
      }
  }

  /* On rend notre objet accessible au reste du monde
      en l'affectant à l'objet global, ici document
  */
  document.objet = objet;
  console.log(document.objet);

  /* On passe 'une valeur pour chaine_alias' en paramètre, il va se retrouver dans chaine_alias */
})('une valeur pour chaine_alias');


// Pas de collision dans le namespacing puisque les portées sont différentes et existent par conséquent
document.objet.tata();
objet.uneMethode();
document.objet.tata();
objet.uneAutreMethode();
//objet.tata(); // Error


for(var prop in objet){
  console.log("Propriété de objet : " + prop + " " + objet[prop]);
};

for(var prop in document.objet){
  console.log("Propriété de objet : " + prop + " " + document.objet[prop]);
};

