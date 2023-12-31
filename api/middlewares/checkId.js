import { isValidObjectId } from "mongoose";
import { errorHandler } from "../utils/error.js";

export const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(404, `Invalid object id ${req.params.id}`));
  }
  next();
};
