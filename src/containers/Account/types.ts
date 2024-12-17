// 1. 首先定义接口返回内容
export type LoginResponseType = {
  success: boolean;
  data: {
    token: string;
  };
};

// 1. 首先定义接口返回内容
export type RegisterResponseType = {
  success: boolean;
  data: boolean;
};
