import { Response } from "express";

abstract class BaseController {
  public static created(res: Response): Response {
    return res.sendStatus(201);
  }

  public static clientError(res: Response, message?: string): Response {
    return res.status(400).json(message || "Unauthorized");
  }

  public static unauthorized(res: Response, message?: string): Response {
    return res.status(401).json(message || "Unauthorized");
  }

  public static forbidden(res: Response, message?: string): Response {
    return res.status(403).json(message || "Forbidden");
  }

  public static notFound(res: Response, message?: string): Response {
    return res.status(404).json(message || "Not found");
  }

  public static fail(res: Response, error: Error | string): Response {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
}

export default BaseController;
