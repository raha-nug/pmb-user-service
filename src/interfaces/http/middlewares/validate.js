// Middleware ini menerima skema Zod dan menjalankannya
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      message: 'Input tidak valid',
      errors: err.errors,
    });
  }
};

export default validate;