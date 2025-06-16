import { faker } from "@faker-js/faker";
import { ObjectContext } from "./ObjectContext";
import { withNameAffixes } from "./withNameAffixes";

export function fakeNumber({ name }: { name: string; propertyPath: string[]; objectContext: ObjectContext }): number {
  return withNameAffixes(
    name,
    (affix) => {
      switch (affix) {
        case "amount":
        case "balance":
        case "concession":
        case "concessions":
        case "cost":
        case "costs":
        case "dues":
        case "fee":
        case "fees":
        case "financed":
        case "income":
        case "insurance":
        case "interest":
        case "lien":
        case "liens":
        case "maintenance":
        case "monthlyMCC":
        case "monthlyOther":
        case "payment":
        case "price":
        case "refund":
        case "tax":
        case "taxes":
        case "utilities":
        case "value":
          return faker.number.float({ max: 10000000, fractionDigits: 2 });
        case "count":
          return faker.number.int({ max: 10 });
        case "age":
        case "months":
        case "years":
          return faker.number.int({ max: 99 });
        case "score":
          return faker.number.int({ min: 300, max: 850 });
        case "pct":
        case "percent":
        case "percentage":
          return faker.number.float({ max: 1, fractionDigits: 4 });
        case "apr":
        case "dti":
        case "rate":
          return faker.number.float({ max: 10, fractionDigits: 2 });
      }
    },
    () => faker.number.int({ max: 1000 })
  );
}
