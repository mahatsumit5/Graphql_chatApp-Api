function sendResponse(status: boolean, message: string, data?: any) {
  return {
    response: {
      status,
      message,
    },
    data,
  };
}
export default sendResponse;
