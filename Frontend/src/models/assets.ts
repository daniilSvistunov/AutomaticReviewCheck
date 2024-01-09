export type Contact = {
  email: string;
  phone: string;
};

export type ContactPerson = {
  name: string;
  contact?: Contact;
};

export type Address = {
  receiverLineOne: string;
  receiverLineTwo: string;
  receiverLineThree: string;
  zip: string;
  city: string;
  line1: string;
  country: string;
};

export type Company = {
  name: string;
  address?: Address;
  contact?: Contact;
  web: string;
};
