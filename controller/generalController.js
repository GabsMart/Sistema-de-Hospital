class generalController {
    static main (req, res) {
        res.render('main/main', {layout: 'main'})
    }
}

module.exports = generalController