import { faker } from "@faker-js/faker";
import { Node, Type } from "ts-morph";
import { singularCamelCase } from "./caseUtils.js";
import { fakeInterfaceType } from "./fakeInterfaceType.js";
import { fakeNumber } from "./fakeNumber.js";
import { fakeString } from "./fakeString.js";
import { ObjectContext } from "./ObjectContext.js";
import { Options } from "./Options.js";

export function fakeProperty(params: {
  type: Type;
  name: string;
  propertyPath: string[];
  objectContext: ObjectContext;
  options: Options;
}): unknown {
  const { type, name, propertyPath, objectContext, options } = params;
  let value;
  if (type.isArray()) {
    const elementType = type.getArrayElementType();
    if (elementType) {
      const length = faker.datatype.number({ min: options.arrayLengthMinimum, max: options.arrayLengthMaximum });
      const elementName = singularCamelCase(name);
      value = Array(length)
        .fill(undefined)
        .map((_, index) =>
          fakeProperty({
            ...params,
            type: elementType,
            name: elementName,
            propertyPath: propertyPath.concat(String(index)),
          })
        );
      if (elementType.isUnion()) {
        value = [...new Set(value)];
      }
    }
  } else if (type.isInterface() || type.isAnonymous()) {
    value = fakeInterfaceType({ type, name, propertyPath, options });
  } else if (type.isBoolean()) {
    value = faker.datatype.boolean();
  } else if (type.isNumber()) {
    value = fakeNumber({ name, propertyPath, objectContext });
  } else if (type.isString()) {
    value = fakeString({ name, propertyPath, objectContext });
  } else if (type.isEnum()) {
    const enumValues = type
      .getSymbolOrThrow()
      .getDeclarations()
      .flatMap((decl) =>
        Node.isEnumDeclaration(decl)
          ? decl.getMembers().map((member) => Node.isEnumMember(member) && member.getValue())
          : /* istanbul ignore next */ []
      );
    const index = faker.datatype.number(enumValues.length - 1);
    value = enumValues[index];
  } else if (type.isUnion()) {
    const types = type.getUnionTypes();
    if (types.length > 0) {
      const index = faker.datatype.number(types.length - 1);
      const unionType = types[index];
      if (unionType.isLiteral()) {
        value = unionType.getLiteralValue();
      } else {
        value = fakeProperty({ ...params, type: unionType });
      }
    }
  } else if (type.isLiteral()) {
    value = type.getLiteralValue();
  } else if (type.isNull()) {
    value = null;
  } else if (!type.isUndefined()) {
    options.warning(`Unhandled type ${type.getText()} for ${name}`);
  }
  return value;
}
