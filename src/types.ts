export type ProductImage = {
  miniature: string;
  full: string;
};

export type ProductPrice = {
  productId: string;
  paymentMethod: string;
  installments: number;
  amount: number;
  oldValue?: number;
  isDefault?: boolean;
  installmentAmount?: number;
  isSecondary?: boolean;
};

export type Product = {
  id: string;
  title: string;
  sellerId: string;
  isAvailable: boolean;
  isFull: boolean;
  condition: string;
  sales: number;
  delivery: {
    title: string;
    subtitle: string;
    estimatedTime: string;
    timeLimit: string;
  };
  gallery: Array<{
    miniature: string;
    full: string;
  }>;
  specs: Array<{
    icon: string;
    title: string;
    value: string;
  }>;
  variations: Array<{
    label: string;
    value: string;
  }>;
  rating: {
    total: number;
    average: number;
  };
  details: Array<{
    image: string;
  }>;
  description: string;
};

export type ProductSeller = {
  id: string;
  isOfficial: boolean;
  title: string;
  thumb: string;
  headerImage: string;
  totalProducts: number;
  totalFollowers: number;
  level: {
    score: number;
    title: string;
    subtitle: string;
  };
  highlights: Array<{
    title: string;
    subtitle?: string;
    icon?: string;
  }>;
};

export type PaymentMethod = {
  id: string;
  title: string;
  images: Array<{
    url: string;
    alt: string;
    width?: number;
  }>;
};

export type PriceCoupon = {
  code: string;
  type: string;
  value: number;
};
