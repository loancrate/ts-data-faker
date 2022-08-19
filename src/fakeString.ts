import { faker } from "@faker-js/faker";
import { upperCaseInitial } from "./caseUtils.js";
import { ObjectContext } from "./ObjectContext.js";
import { withNameAffixes } from "./withNameAffixes.js";

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
          return faker.datatype.uuid();
        case "identifier":
        case "productCode":
          return faker.random.alphaNumeric(6, { casing: "upper" });
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
          return faker.name.jobTitle();
        case "street1":
          return faker.address.streetAddress();
        case "street2":
          return faker.address.secondaryAddress();
        case "city":
          return faker.address.cityName();
        case "stateCode":
        case "provinceCode":
          return faker.address.stateAbbr();
        case "zipCode":
          return faker.address.zipCode();
        case "countyName":
          return faker.address.county();
        case "countyFipsCode":
          return faker.random.numeric(5, { allowLeadingZeros: true });
        case "countryName":
          return faker.address.country();
        case "phoneNumber":
          return faker.phone.number();
        case "phoneExtension":
          return faker.random.numeric();
        case "ipAddress":
          return faker.internet.ip();
        case "bureau":
        case "institutionName":
          return faker.company.name();
        case "productName":
          return faker.commerce.productName();
        case "name":
          return faker.random.words();
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
          return faker.finance.account();
        case "language":
          return faker.helpers.arrayElement(["English", "Spanish", "French", "Latin"]);
        case "value":
          if (propertyPath[propertyPath.length - 2] === "taxpayerIdentification") {
            return faker.random.numeric(9, { allowLeadingZeros: true });
          }
          break;
      }
    },
    () => faker.lorem.words()
  );
}
