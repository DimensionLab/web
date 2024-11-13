import { Claims } from "@auth0/nextjs-auth0";

export type UserKeysServerside = {
  user: Claims;
  customer_id: string;
  accessToken: string;
  bearerToken: string;
}

export type CustomerData = {
  id: string;
  object: string;
  address: null;
  balance: number;
  created: number;
  currency: string;
  default_currency: string;
  default_source: null;
  delinquent: boolean;
  description: string;
  discount: null;
  email: string;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: null;
    default_payment_method: null;
    footer: null;
    rendering_options: null;
  };
  livemode: boolean;
  metadata: {
    auth0_user_id: string;
    available_credit: string;
  };
  name: null;
  phone: null;
  preferred_locales: [];
  shipping: null;
  tax_exempt: string;
  test_clock: null;
}