import { faker } from "@faker-js/faker";
import { upperCaseInitial } from "./caseUtils";
import { ObjectContext } from "./ObjectContext";
import { withNameAffixes } from "./withNameAffixes";

export function fakeString({
  name,
  propertyPath,
  objectContext,
}: {
  name: string;
  propertyPath: string[];
  objectContext: ObjectContext;
}): string {
  return withNameAffixes(
    name,
    (affix) => {
      switch (affix) {
        case "id":
          return faker.string.uuid();
        case "identifier":
        case "productCode":
          return faker.string.alphanumeric({ length: 6, casing: "upper" });
        case "fullName":
          return objectContext.nameGenerator.fullName;
        case "firstName":
          return objectContext.nameGenerator.firstName;
        case "lastName":
          return objectContext.nameGenerator.lastName;
        case "middleName":
          return objectContext.nameGenerator.middleName;
        case "suffixName":
          return objectContext.nameGenerator.suffix;
        case "username":
          return objectContext.nameGenerator.userName;
        case "email":
          return objectContext.nameGenerator.email;
        case "title":
          return faker.person.jobTitle();
        case "street1":
          return faker.location.streetAddress();
        case "street2":
          return faker.location.secondaryAddress();
        case "city":
          return faker.location.city();
        case "stateCode":
        case "provinceCode":
          return faker.location.state({ abbreviated: true });
        case "zipCode":
          return faker.location.zipCode();
        case "countyName":
          return faker.location.county();
        case "countyFipsCode":
          return faker.string.numeric({ length: 5, allowLeadingZeros: true });
        case "countryName":
          return faker.location.country();
        case "phoneNumber":
          return faker.phone.number();
        case "phoneExtension":
          return faker.string.numeric({ length: { min: 1, max: 4 }, allowLeadingZeros: true });
        case "ipAddress":
          return faker.internet.ip();
        case "bureau":
        case "institutionName":
          return faker.company.name();
        case "productName":
          return faker.commerce.productName();
        case "name":
          return faker.word.words();
        case "status":
          return upperCaseInitial(faker.word.adjective());
        case "type":
          return upperCaseInitial(faker.word.adjective()) + upperCaseInitial(faker.word.noun());
        case "description":
        case "heading":
        case "reason":
          return faker.lorem.sentence();
        case "text":
          return faker.lorem.sentences();
        case "accountNumber":
          return faker.finance.accountNumber();
        case "language":
          return faker.helpers.arrayElement(["English", "Spanish", "French", "Latin"]);
        case "value":
          if (propertyPath[propertyPath.length - 2] === "taxpayerIdentification") {
            return faker.string.numeric({ length: 9, allowLeadingZeros: true });
          }
          break;
      }
    },
    () => faker.lorem.words(),
  );
}
