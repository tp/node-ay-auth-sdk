import * as crypto from 'crypto';
import {HKDF} from './lib/hkdf';
import {base64Encode} from './lib/base64Encode';

function createSalt(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

export function createASRParameter(
  params: {appSecret: string; info: string; salt?: string},
  payload: any,
) {
  const salt = params.salt || createSalt(16);

  var hkdf = new HKDF('sha256', salt, params.appSecret);
  const key = hkdf.derive(params.info, 32);

  const data = JSON.stringify({
    ...payload,
    info: params.info,
    salt: base64Encode(salt),
  });

  const payloadBase64String = base64Encode(data);

  const version = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9';

  const signatureInput = version + '.' + payloadBase64String;

  const hmac = crypto.createHmac('sha256', key);

  hmac.update(signatureInput);

  // From PHP implementation
  //   $enc = rtrim($enc, "=");
  //   $enc = strtr($enc, ;
  const signature = hmac
    .digest('base64')
    .replace(/(=)*$/g, '')
    .replace('+/', '-_');

  return `${version}.${payloadBase64String}.${signature}`;
}
