let toDelete = document.querySelector('.delete');
toDelete.addEventListener('click', (e) => {
    // result = true ou false
    let result = window.confirm("Tu es sûre de vouloir supprimer cette tache ?");
    if (result) {
        const idTask = e.target.pathname.split('/')[2];

        window.open(`/delete/${idTask}`, '_self');
    }
})