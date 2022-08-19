interface ObjectWithId {
  id: string;
}

interface Profile extends ObjectWithId {
  __typename: "Profile";

  optional1?: boolean;
  optional2?: boolean;

  firstName: string;
  lastName: string;
  middleName: string;
  suffixName: string;
  fullName: string;
  username: string;
  email: string;
  title: string;
  identifier: string;
  language: string;

  birthDate: Date;

  street1: string;
  street2: string;
  city: string;
  stateCode: string;
  zipCode: string;
  countyName: string;
  countyFipsCode: string;
  countryName: string;
  phoneNumber: string;
  phoneExtension: string;
  ipAddress: string;

  taxpayerIdentification: {
    value: string;
  };

  amount: number;
  count: number;
  age: number;
  score: number;
  pct: number;
  apr: number;
  n: number;

  products: Product[];
  accounts: Account[];
  productOrAccount: Product | Account;

  text: string;
  value: string;
  alwaysNull: null;
  alwaysUndefined: undefined;
  alwaysUnknown: unknown;

  fn: () => void;
}

type ProductState = "SOLID" | "LIQUID" | "GAS";

interface Product {
  productCode: string;
  productName: string;
  description: string;
  status: string;
  type: string;
  price: number;
  priceInBulk: number;
  states: ProductState[];
}

interface Product {
  type: string;
  details: string;
}

enum AccountType {
  Checking = "CHECKING",
  Savings = "SAVINGS",
}

interface Account {
  name: string;
  type: AccountType;
  bureau: string;
  accountNumber: string;
  balance: number;
  balanceDate: Date;
}
