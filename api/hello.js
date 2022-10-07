function handler(req, res) {
    res.status(200).send("Hello word");
    return true;
}
exports.execute = handler;
