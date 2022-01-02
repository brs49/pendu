const motEl = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-contenant');
const notification = document.getElementById('notification-contenant');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll('.figure-partie');

const mots = ['esprit', 'lait', 'palais', 'vaisselle', 'course', 'jury', 'fleur', 'informateur', 'astronaute', 'classe',
    'militant', 'vie', 'lave', 'poker', 'dehors', 'envoyer', 'esprit', 'cabine', 'inclinaison', 'fonction'];

// Sélectionner un mot pour jouer
let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

console.log(motSelectionne);

const bonnesLettresArr = [];
const mauvaisesLettresArr = [];

// Afficher le mot caché
function afficherMot() {
    motEl.innerHTML = `
        ${motSelectionne
        .split('')
        .map(
            lettre => `
                <span class = "lettre">
                ${bonnesLettresArr.includes(lettre) ? lettre : ''}
                </span>
            `
        )
        .join('')
    }   
    `;

    const motInterne = motEl.innerText.replace(/\n/g, '')

    console.log(motEl.innerText, motInterne)

    if (motInterne == motSelectionne) {
        messageFinal.innerText = 'Bravo ! Tu as gagné';
        popup.style.display = 'flex';
    }

}

//Mauvaises lettres
function updateMauvaisesLettresEl() {
    //Afficher les mauvaises lettres
    mauvaisesLettres.innerHTML = `
        ${mauvaisesLettresArr.map(lettre => `<span>${lettre}</span>`)}
    `
    //Afficher le bonhomme
    figurePartie.forEach((partie, index) => {
        const erreurs = mauvaisesLettresArr.length;

        if (index < erreurs) {
            partie.style.display = 'block';
        } else {
            partie.style.display = 'none'
        }
    })
    //Vérifier si on a perdu
    if (mauvaisesLettresArr.length === figurePartie.length) {
        messageFinal.innerText = 'Tu as perdu !'
        popup.style.display = 'flex'
    }

}

// Afficher la notification
function afficherNotification() {
    notification.classList.add('afficher');
    // On enléve la notification après 2 secondes
    setTimeout(() => {
        notification.classList.remove('afficher')
    }, 2000);

}

// Event listeners
window.addEventListener('keydown', e => {

    // Si la lettre est entre le code 64 et 90 (du clavier)
    if (e.keyCode > 64 && e.keyCode <= 90) {

        // On enregistre la lettre sur laquelle on as appuyé
        const lettre = e.key;

        // Si la lettre fait partie de notre mot séléctionné
        if (motSelectionne.includes(lettre)) {

            // Alors on as notre condition
            // On va inclure la lettre dans "bonneLettres"
            if (!bonnesLettresArr.includes(lettre)) {
                bonnesLettresArr.push(lettre)

                // Et on affiche le mot
                afficherMot()

                // Si la lettre à déjà été joué on affiche la notification
            } else {
                afficherNotification();
            }

            // Si la lettre ne fait pas partie du mot séléctionné
        } else {
            // On l'ajoute dans les mauvaises lettres
            if (!mauvaisesLettresArr.includes(lettre)) {
                mauvaisesLettresArr.push(lettre);

                updateMauvaisesLettresEl();
            } else {
                afficherNotification();
            }

        }
    }
});

// Rejouer et redémarrer le jeu
rejouerBtn.addEventListener('click', () => {
    //Vider les arrays
    bonnesLettresArr.splice(0);
    mauvaisesLettresArr.splice(0);

    //Sélectionner un nouveau mot
    motSelectionne = mots[Math.floor(Math.random() * mots.length)];

    afficherMot();
    //Effacer les mauvaises lettres
    updateMauvaisesLettresEl();

    //Enlever le popup
    popup.style.display = 'none';
})

afficherMot();