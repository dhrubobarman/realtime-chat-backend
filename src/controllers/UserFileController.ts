import { NextFunction, Request, Response } from 'express';

export async function uploadFile(request: Request, response: Response, next: NextFunction) {
  try {
    const file = request.body.file;
    if (!file) return response.status(400).json({ message: 'No file uploaded' });
    return response.status(200).json({ message: 'File uploaded successfully', file: file.path });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteFile(request: Request, response: Response, next: NextFunction) {
  try {
    const file = request.body.file;
    if (!file) return response.status(400).json({ message: 'No file uploaded' });
    return response.status(200).json({ message: 'File uploaded successfully', file: file.path });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}
