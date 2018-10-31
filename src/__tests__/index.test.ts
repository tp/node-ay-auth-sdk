import {createASRParameter} from '../index';

test('Match PHP Reference Implementation', async () => {
  const referenceToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJiYXNrZXRfaWQiOiJhZGZhZGYiLCJ1c2VyX3Rva2VuIjoidGVzdCIsImFwcF90b2tlbiI6InRlc3QiLCJmbG93IjoiYmFza2V0IiwiYXBwX2lkIjo5OTksImluZm8iOiJzaW5nU2VydmljZSBUZXN0Iiwic2FsdCI6Ik1USXpORFUyTnpnNU1ERXlNelExTmc9PSJ9.Eyi0xvrdH5gyGweoW5UPcqcsMLo2hkTb0J9Ed8O1uwA';
  expect(
    createASRParameter(
      {
        appSecret: 'lsdj2}ßßäoAA$$$2356as',
        salt: Buffer.from('1234567890123456'),
        info: 'singService Test',
      },
      {
        basket_id: 'adfadf',
        user_token: 'test',
        app_token: 'test',
        flow: 'basket',
        app_id: 999,
      },
    ),
  ).toEqual(referenceToken);
});
