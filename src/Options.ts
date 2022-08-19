export interface Options {
  optionalRatio: number;
  arrayLengthMinimum: number;
  arrayLengthMaximum: number;
  pastDateYears: number;
  referenceDate: Date;
  warning(message: string): void;
}

export const defaultOptions: Options = {
  optionalRatio: 1,
  arrayLengthMinimum: 1,
  arrayLengthMaximum: 5,
  pastDateYears: 10,
  referenceDate: new Date(),
  // istanbul ignore next
  warning(message) {
    console.error("Warning:", message);
  },
};
