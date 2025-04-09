import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { date } from "joi";

export class BaseAPI extends RESTDataSource {
  private token: string;
  constructor(options: { cache: KeyValueCache }, token?: string) {
    super(options); // this sends our server's `cache` through
    this.token = token || "";
  }

  // override willSendRequest(_path: string, request: AugmentedRequest) {
  //   request.headers["authorization"] = `${this.token}`;
  // }
  // Getter for token to provide access in derived classes
  protected getToken(): string {
    return this.token;
  }

  // protected didEncounterError(_error: Error): void {
  //   console.log(_error);
  // }
  // Catching errors globally for all the requests and responses
  protected handleError<T>(error: any): {
    status: boolean;
    message: string;
    data: T;
    count: number;
  } {
    const emptyData: [] | {} = Array.isArray([] as T) ? [] : {};
    return {
      status: false,
      message: error.extensions?.response.body?.message || error.message,
      data: emptyData as T,
      count: 0,
    };
  }
}
