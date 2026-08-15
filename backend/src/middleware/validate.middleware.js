import { ValidationError } from "yup";

const REQUEST_SOURCES = ["params", "query", "body"];

/**
 * Validates the given request sources against Yup schemas and exposes the
 * cast results on req.validated. Express 5 ignores writes to req.query, so
 * controllers must read coerced values from req.validated instead of req.
 */
export const validate = (schemas) => async (req, res, next) => {
  try {
    req.validated = req.validated || {};

    for (const source of REQUEST_SOURCES) {
      const schema = schemas[source];

      if (!schema) {
        continue;
      }

      req.validated[source] = await schema.validate(req[source] ?? {}, {
        abortEarly: false,
        stripUnknown: true,
      });
    }

    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.errors[0],
        errors: error.errors,
      });
    }

    return next(error);
  }
};
