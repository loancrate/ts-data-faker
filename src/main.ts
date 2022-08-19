import { writeFile } from "fs/promises";
import { InterfaceDeclaration, ModuleDeclaration, Project, SourceFile } from "ts-morph";
import { fakeInterface } from "./fakeInterface.js";
import { defaultOptions } from "./Options.js";

export interface Arguments {
  sourceFile: string;
  interface: string;
  optionalRatio: number;
  outputFile?: string;
  help?: boolean;
}

export async function main({ sourceFile, interface: interfacePath, optionalRatio, outputFile }: Arguments) {
  try {
    const project = new Project();
    const source = project.addSourceFileAtPath(sourceFile);
    const node = getModuleInterface(source, interfacePath);
    const options = { ...defaultOptions, optionalRatio };
    const obj = fakeInterface({ node, options });
    const json = JSON.stringify(obj, undefined, 2);
    if (outputFile) {
      await writeFile(outputFile, json);
      console.log(`Output written to ${outputFile}`);
    } else {
      console.log(json);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function getModuleInterface(module: SourceFile | ModuleDeclaration, interfacePath: string): InterfaceDeclaration {
  const moduleNames = interfacePath.split(".");
  const interfaceName = moduleNames.pop()!;
  for (const moduleName of moduleNames) {
    module = module.getModuleOrThrow(moduleName);
  }
  return module.getInterfaceOrThrow(interfaceName);
}
