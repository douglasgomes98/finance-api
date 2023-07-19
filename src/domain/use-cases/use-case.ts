export type UseCase<Request, Response> = {
  execute(request: Request): Promise<Response>;
};
