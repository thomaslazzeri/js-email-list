// Selezioniamo gli elementi dell'HTML che ci servono
const emailList = document.getElementById('email-list');
const btnGenerate = document.getElementById('btn-generate');

// URL dell'API di Boolean
const apiUrl = 'https://flynn.boolean.careers/exercises/api/random/mail';

/**
 * Funzione principale che svuota la lista precedente
 * e richiede 10 nuove email all'API.
 */
function generateTenEmails() {
    // Svuotiamo la lista per il Bonus (sostituzione delle vecchie email)
    emailList.innerHTML = '';

    // Eseguiamo un ciclo for che gira esattamente 10 volte
    for (let i = 0; i < 10; i++) {

        // Effettuiamo la chiamata Ajax (Fetch) all'API
        fetch(apiUrl)
            .then(response => {
                // Trasformiamo la risposta grezza in un oggetto JSON
                return response.json();
            })
            .then(data => {
                // Controlliamo se la chiamata ha avuto successo ("success": true)
                if (data.success === true) {
                    const email = data.response; // Es: "mhauck@satterfield.com"

                    // Creiamo l'elemento <li> per la lista
                    const listItem = document.createElement('li');

                    // Aggiungiamo le classi di Bootstrap per la grafica
                    listItem.className = 'list-group-item d-flex align-items-center justify-content-between py-3';

                    // Inseriamo il testo dell'email nell'elemento
                    listItem.textContent = email;

                    // Appendiamo il nuovo <li> dentro la nostra <ul> nell'HTML
                    emailList.appendChild(listItem);
                }
            })
            .catch(error => {
                // Gestione di eventuali errori di rete
                console.error("Si è verificato un errore con l'API:", error);
            });
    }
}

// 2. Avviamo la funzione la prima volta all'apertura della pagina
generateTenEmails();

// 3. BONUS: Ascoltiamo il click sul bottone per rigenerare le mail
btnGenerate.addEventListener('click', generateTenEmails);