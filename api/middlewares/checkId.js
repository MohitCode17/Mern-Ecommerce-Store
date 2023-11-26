import { isValidObjectId } from "mongoose";
import { errorHandler } from "../utils/error";

export const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(errorHandler(404, `Invalid user object id ${req.params.id}`));
  }
  next();
};
