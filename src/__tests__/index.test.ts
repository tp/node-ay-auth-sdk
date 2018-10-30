import { createASRParameter } from "../index";

test("Match PHP Reference Implementation", async () => {
  const referenceToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJiYXNrZXRfaWQiOiJhZGZhZGYiLCJ1c2VyX3Rva2VuIjoidGVzdCIsImFwcF90b2tlbiI6InRlc3QiLCJmbG93IjoiYmFza2V0IiwiYXBwX2lkIjo5OTksImluZm8iOiJzaW5nU2VydmljZSBUZXN0Iiwic2FsdCI6Ik1USXpORFUyTnpnNU1ERXlNelExTmc9PSJ9.Eyi0xvrdH5gyGweoW5UPcqcsMLo2hkTb0J9Ed8O1uwA";
  expect(createASRParameter()).toEqual(referenceToken);
});
