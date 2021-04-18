const db = require("../database/db");

exports.checkByCategory = (category, callback) => {
    const requette = `SELECT * FROM liste_taches WHERE nom_liste_taches = ?`;
    db.execute(requette, [category], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    })
}

exports.checkByIdList = (idListe, callback) => {
    const requette = `SELECT COUNT(*) AS 'count' FROM tache 
    WHERE id_liste_taches = ?`;
    db.execute(requette, [idListe], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}


exports.getAllTasks = (callback) => {
    db.execute(`SELECT * FROM tache 
    INNER JOIN liste_taches ON tache.id_liste_taches = liste_taches.id_liste_taches 
    ORDER BY date_creation_tache DESC`, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    })
}

exports.getOneTask = (id, callback) => {
    const requette = `SELECT * FROM tache INNER JOIN liste_taches ON tache.id_liste_taches = liste_taches.id_liste_taches WHERE id_tache = ?`;
    db.execute(requette, [id], (error, rows) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, rows);
        }
    })
}

exports.deleteTask = (id, callback) => {
    const requette = `DELETE FROM tache WHERE id_tache = ?`;
    db.execute(requette, [id], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}


exports.addList = (nomList, callback) => {
    const requette = `INSERT INTO liste_taches (nom_liste_taches) VALUES (?)`;
    db.execute(requette, [nomList], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}


exports.addOneTask = (tache, categorie, callback) => {
    const requette = `INSERT INTO tache (description_tache, id_liste_taches) VALUES (?, ?)`;
    db.execute(requette, [tache, categorie], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result)
        }
    })
}

exports.editOne = (id, callback) => {
    const requette = `SELECT * FROM tache WHERE id_tache = ?`;
    db.execute(requette, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

exports.editTask = (tache, id, callback) => {
    const requette = `UPDATE tache SET description_tache = ? WHERE id_tache = ?`;
    db.execute(requette, [tache, id], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    })
}

exports.getAllList = (callback) => {
    const requette = `SELECT * FROM liste_taches`;
    db.execute(requette, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

exports.getOneList = (liste, callback) => {
    const requette = `SELECT * FROM tache INNER JOIN liste_taches ON liste_taches.id_liste_taches = tache.id_liste_taches WHERE nom_liste_taches = ?`;
    db.execute(requette, [liste], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

// chech category if empty to delete
exports.deleteCategory = (idListe, callback) => {
    const requette = `DELETE FROM liste_taches WHERE id_liste_taches = ?`;
    db.execute(requette, [idListe], (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}