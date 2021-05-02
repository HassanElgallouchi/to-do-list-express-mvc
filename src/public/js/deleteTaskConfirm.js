// Confirmation de suppression d'une tache
if (document.querySelector('.supprimer')) {

    let toDelete = document.querySelector('.supprimer');
    toDelete.addEventListener('click', (e) => {
        let result = window.confirm("Tu es sûre de vouloir supprimer cette tache ?");
        if (result) {
            const idTask = e.target.pathname.split('/')[2];

            window.open(`/delete/${idTask}`, '_self');
        }
    })
}

// Reduire le texte d'une tache dans la page d'accueil
if (document.querySelectorAll('.list-items ul li a')) {
    let taches = document.querySelectorAll('.list-items ul li a');
    taches.forEach((tache) => {
        let text = tache.textContent;
        let resume = text.split(' ')
        // console.log(resume);
        let join = resume.join(' ')
        let slice = text.slice(0, 140);
        tache.textContent = slice + '...';
    })
}

if(document.getElementById('tache')) {
    let tache = document.getElementById('tache');
    let categorie = document.querySelector('input[type=text]');
    let btn = document.querySelector('input[type=submit]');
    btn.addEventListener('click', () => {
        if (tache.value === '' || categorie.value === '') {
            alert("Tu dois remplir les champs !");
        }
    })
}