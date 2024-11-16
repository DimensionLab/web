export const defaultFeatureFlags = {
  
};

const config = {
  appName: "DimensionLab",
  appDescription: "Next-generation engineering & scientific software",
  keywords: "physics, simulations, AI, machine learning, deep learning",
  // (no https://, not trialing slash at the end, just the naked domain)
  domainName: "dimensionlab.org",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/hub"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
    ]
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "",
    bucketUrl: ``,
    cdn: "",
  },
  resend: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `DimensionLab <noreply@dimensionlab.org>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like updates etc..
    fromAdmin: `Michal at DimensionLab <hello@dimensionlab.org>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "hello@dimensionlab.org",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "hello@dimensionlab.org",
  },
};

export default config;
