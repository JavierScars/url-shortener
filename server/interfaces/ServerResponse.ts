type ServerResponse = 200 | 400 | 401 | 403 | 404 | 500;

export interface IServerError {
    message: string;
    status: ServerResponse;
}