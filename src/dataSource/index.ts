import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { User } from "../types/types";

export class BaseAPI extends RESTDataSource {
  private token: string;
  private user: User;
  constructor(options: { cache: KeyValueCache }, user: User, token?: string) {
    super(options); // this sends our server's `cache` through
    this.token = token || "";
    this.user = user;
  }

  // override willSendRequest(_path: string, request: AugmentedRequest) {
  //   request.headers["authorization"] = `${this.token}`;
  // }
  // Getter for token to provide access in derived classes
  protected getToken(): string {
    return this.token;
  }
  protected getUser(): User {
    return this.user;
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
