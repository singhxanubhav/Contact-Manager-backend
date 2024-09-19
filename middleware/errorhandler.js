import { constant } from "../constants.js";
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.stackTrace : 500;

  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    case constant.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    case constant.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    default:
      console.log("No error, All good");
      break;
  }
};
