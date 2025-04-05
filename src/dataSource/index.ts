import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { KeyValueCache } from "@apollo/utils.keyvaluecache";

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

  protected didEncounterError(_error: Error): void {
    console.log(_error);
  }
  // Catching errors globally for all the requests and responses
  protected handleError(error: any) {
    console.log("Error", error);
    // You can log the error or send it to a monitoring service like Sentry, etc.
    // console.error("Error occurred:", error);

    // Throw a custom error or rethrow the caught error with more context
    //   throw new Error(error.message || "An unexpected error occurred.");
    return {
      status: false,
      message: error.extensions?.response.body?.message || error.message,
    };
  }
}
