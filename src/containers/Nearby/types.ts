// 返回内容类型
export type ResponseType = {
  success: boolean;
  data: Array<{
    id: string;
    name: string;
    phone: string;
    adderss: string;
    distance: string;
    latitude: string;
    longitude: string;
  }>;
};
