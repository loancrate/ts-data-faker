import { faker } from "@faker-js/faker";
import { Node, Type } from "ts-morph";
import { fakeInterface } from "./fakeInterface.js";
import { fakeTypeElementMemberedNode } from "./fakeTypeElementMemberedNode.js";
import { ObjectContext } from "./ObjectContext.js";
import { Options } from "./Options.js";

export function fakeInterfaceType(params: {
  type: Type;
  name: string;
  propertyPath: string[];
  options: Options;
}): unknown {
  const { type, name, propertyPath, options } = params;
  const symbol = type.getSymbolOrThrow();
  const typeName = symbol.getName();
  if (typeName === "Date") {
    switch (name) {
      case "birthDate":
      case "dateOfBirth":
        return faker.date.birthdate({ refDate: options.referenceDate });
      default:
        return faker.date.past(options.pastDateYears, options.referenceDate);
    }
  } else {
    const targetObject: Record<string, any> = {};
    const objectContext = new ObjectContext();
    const declarations = symbol.getDeclarations();
    let foundDeclaration = false;
    for (const node of declarations) {
      if (Node.isInterfaceDeclaration(node)) {
        fakeInterface({ node, propertyPath, targetObject, objectContext, options });
        foundDeclaration = true;
      } else if (Node.isTypeLiteral(node)) {
        fakeTypeElementMemberedNode({ node, propertyPath, targetObject, objectContext, options });
        foundDeclaration = true;
      } else {
        options.warning(`Unhandled ${node.getKindName()} declaration for ${name}`);
      }
    }
    return foundDeclaration ? targetObject : undefined;
  }
}
