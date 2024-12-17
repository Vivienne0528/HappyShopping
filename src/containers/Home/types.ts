export type ResponseType = {
  success: boolean;
  data: {
    location: {
      id: string;
      address: string;
    };
    banners: Array<{
      id: string;
      url: string;
    }>;
  };
};
