function validate(schema) {
  return (req, res, next) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        errors: parse.error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
    req.validated = parse.data;
    next();
  };
}

module.exports = validate;
