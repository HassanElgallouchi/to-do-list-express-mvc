const Tache = require("../models/tacheModel")

exports.getAll = (req, res) => {
    Tache.getAllTasks((error, result) => {
        if (error) {
            res.send(error.message);
        } else {
            if (result.length === 0) {
                res.status(404);
            } else {
                const categories = new Set(result.map(el => el.nom_liste_taches));
                res.render("index.ejs", { result, categories });
            }
        }
    })
}


exports.getOne = (request, response) => {
    const id = request.params.id;
    Tache.getOneTask(id, (error, result) => {
        if (error) {
            response.send(error.message);
        } else {
            if (result.length === 0) {
                response.status(404);
            } else {
                const tache = result[0];
                response.render("tache.ejs", { tache })
            }
        }
    })
}

exports.delete = (request, response) => {
    const { id } = request.params;
    // response.send(id)
    Tache.getOneTask(id, (errorcat, rows) => {
        if (errorcat) {
            response.send(errorcat.message);
        } else {
            const idListe = rows[0].id_liste_taches;

            Tache.checkByIdList(idListe, (er, result) => {
                if (er) {
                    response.send(er.message);
                } else {
                    
                        Tache.deleteTask(id, (e, r) => {
                            if (e) {
                                response.send(e.message);
                            } else {
                                // delete list                                 
                                const rowsCount = result[0].count;
                                if (rowsCount === 1) {
                                    Tache.deleteCategory(idListe, (erreur, resultat) => {
                                        if (erreur) {
                                            response.send(erreur.message);
                                        } else {
                                            response.redirect('/');
                                        }
                                    })
                                    
                                }
                                
                                response.redirect('/');
                            }
                        })
                }
            })

        
        }

    })

}


exports.addOne = (req, res) => {
    const { tache, categorie } = req.body;
    if (!tache || !categorie) {
        res.send("Champ ne doit pas etre vide !")
    } else {
        Tache.checkByCategory(categorie, (error, result) => {
            if (error) {
                res.send(error.message);
            } else {
                if (result.length === 0) {
                    // add nom task here
                    Tache.addList(categorie, (errList, rowsList) => {
                        if (errList) {
                            res.send(errList.message);
                        } else {
                            const idList = rowsList.insertId;

                            console.log(rowsList.insertId);
                            // res.send(rowsList)

                            Tache.addOneTask(tache, idList, (err, rows) => {
                                if (err) {
                                    res.send(err.message);
                                } else {
                                    res.redirect("/");
                                }
                            })
                        }
                    })
                } else {
                    const idList = result[0].id_liste_taches;
                    Tache.addOneTask(tache, idList, (err, rows) => {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.redirect("/");
                        }
                    })
                }
            }
        })
    }
}


exports.editOne = (req, res) => {
    const id = req.params.id;
    console.log(req);
    Tache.editOne(id, (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            const result = rows[0];
            res.render("edit.ejs", { result });
        }
    })
}

exports.editTask = (req, res) => {

    const { tache } = req.body;
    const { id } = req.params;
    Tache.editTask(tache, id, (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            res.redirect(`/tache/${id}`)
        }
    })
}

exports.getAllList = (req, res) => {
    Tache.getAllList((error, rows) => {
        if (error) {
            res.send(error.message);
        } else {
            res.render("listCategories.ejs", { rows });
        }
    })
}

exports.getOneList = (req, res) => {
    const liste = req.params.liste;

    Tache.checkByCategory(liste, (error, result) => {
        if (error) {
            res.send(error.message);
        } else {
            if (result.length !== 0) {
                Tache.getOneList(liste, (error, rows) => {
                    if (error) {
                        res.send(error.message);
                    } else {
                        res.render("liste.ejs", { rows });
                        // res.send(rows)
                    }
                })
            } else {
                res.render("notFound.ejs");
            }
        }
    })




}