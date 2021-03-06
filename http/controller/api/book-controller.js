class BookController {

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then(() => {
            response.redirect('/books');
        }).catch((err) => {
            next(err);
        });
    }

    /**
     *
     * @param request
     * @param response
     */
    deleteBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then(function () {
            response.status(200).json({message: 'Success'});
        });
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    editBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.status(200).json({message: 'Success'});
        }).catch(function (err) {
            next(err);
        });
    }

    /**
     *
     * @param request
     * @param response
     * @param next
     */
    search(request, response, next) {
        request.app.get('book.searcher').search(request.condition)
            .then((results) => response.status(200).send(results.map(result => result.toJson())))
            .catch(function (err) {
                next(err);
            })
    }
}

module.exports = BookController;