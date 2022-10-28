type Jwk = {
  e: string;
  kid: string;
  kty: "RSA";
  n: string;
};

type JwkResponse = {
  keys: Jwk[];
};

type ImagesResponse = {
  fileId: string;
  url: string;
};

export { JwkResponse, Jwk, ImagesResponse };
