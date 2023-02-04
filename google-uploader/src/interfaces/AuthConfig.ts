interface AuthConfig {
  tokensPath: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string[];
}

export { AuthConfig };
