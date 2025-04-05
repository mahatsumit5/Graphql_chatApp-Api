function sendResponse(status: boolean, message: string, data?: any) {
  return {
    status,
    message,

    data,
  };
}
export default sendResponse;
