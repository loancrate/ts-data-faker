import { faker } from "@faker-js/faker";
import { ObjectContext } from "./ObjectContext.js";
import { withNameAffixes } from "./withNameAffixes.js";

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
          return faker.datatype.number({ max: 10000000, precision: 0.01 });
        case "count":
          return faker.datatype.number({ max: 10 });
        case "age":
        case "months":
        case "years":
          return faker.datatype.number({ max: 99 });
        case "score":
          return faker.datatype.number({ min: 300, max: 850 });
        case "pct":
        case "percent":
        case "percentage":
          return faker.datatype.number({ max: 1, precision: 0.0001 });
        case "apr":
        case "dti":
        case "rate":
          return faker.datatype.number({ max: 10, precision: 0.01 });
      }
    },
    () => faker.datatype.number({ max: 1000 })
  );
}
