export const generateResponse = (
  message: string,
  success: boolean = false,
  data?: object | Array<object>,
): ResponseData => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

interface ResponseData {
  success: boolean;
  message: string;
  data?: object | Array<object>;
}
