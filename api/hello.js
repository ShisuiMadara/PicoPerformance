function handler (req, res) {
  return res.status(200).send({
    success: true
  })
}
exports.execute = handler
