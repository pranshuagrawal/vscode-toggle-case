import * as changeCase from "change-case";
import { IConfig } from './models';

export const getNextCase = (currentCase: string, allowedCase: any) => {
	const allCases = Object.keys(CONFIG);
	const allowedCasesConfig = {...allowedCase, 'original': true};
	const acceptedCases = allCases.filter((c: string) => allowedCasesConfig[CONFIG[c].configParam]);
	const index = acceptedCases.indexOf(currentCase);
	if(index === -1 || index === acceptedCases.length - 1) {
		return acceptedCases[0];
	}
	return acceptedCases[index+1];
};

export const toCamelCase = changeCase.camelCase;
export const toTitleCase = (string: string) => {
    var sentence = string.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
};
export const toCapitalCase = changeCase.capitalCase;
export const toConstantCase = changeCase.constantCase;
export const toDotCase = changeCase.dotCase;
export const toHeaderCase = changeCase.headerCase;
export const toParamCase = changeCase.paramCase;
export const toPascalCase = changeCase.pascalCase;
export const toPathCase = changeCase.pathCase;
export const toSentenceCase = changeCase.sentenceCase;
export const toSnakeCase = changeCase.snakeCase;

export const CONFIG: {
	[x: string]: IConfig
} = {
	ORIGINAL: {
		caseName: 'ORIGINAL',
		configParam: 'original',
		fn: (str: string) => str
	},
	UPPERCASE: {
	  caseName: 'UPPERCASE',
	  configParam: 'upperCase',
	  fn: (str: string) => str.toUpperCase()
	},
	LOWERCASE: {
	  caseName: 'LOWERCASE',
	  configParam: 'lowerCase',
	  fn: (str: string) => str.toLowerCase()
	},
	TITLECASE: {
	  caseName: 'TITLECASE',
	  configParam: 'titleCase',
	  fn: toTitleCase
	},
	// CAMELCASE: {
	//   caseName: 'CAMELCASE',
	//   configParam: 'camelCase',
	//   fn: toCamelCase
	// },
	// CONSTANTCASE: {
	//   caseName: 'CONSTANTCASE',
	//   configParam: 'constantCase',
	//   fn: toConstantCase
	// },
	// DOTCASE: {
	//   caseName: 'DOTCASE',
	//   configParam: 'dotCase',
	//   fn: toDotCase
	// },
	// HEADERCASE: {
	//   caseName: 'HEADERCASE',
	//   configParam: 'headerCase',
	//   fn: toHeaderCase
	// },
	// PARAMCASE: {
	//   caseName: 'PARAMCASE',
	//   configParam: 'paramCase',
	//   fn: toParamCase
	// },
	// PASCALCASE: {
	//   caseName: 'PASCALCASE',
	//   configParam: 'pascalCase',
	//   fn: toPascalCase
	// },
	// PATHCASE: {
	//   caseName: 'PATHCASE',
	//   configParam: 'pathCase',
	//   fn: toPathCase
	// },
	// SENTENCECASE: { // merging
	//   caseName: 'SENTENCECASE',
	//   configParam: 'sentenceCase',
	//   fn: toSentenceCase
	// },
	// SNAKECASE: {
	//   caseName: 'SNAKECASE',
	//   configParam: 'snakeCase',
	//   fn: toSnakeCase
	// }
  };