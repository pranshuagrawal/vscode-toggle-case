import * as vscode from 'vscode';

export type IEditBuilderContainer = {
	selection: vscode.Selection;
	modifiedCase: string;
};

export interface IConfig {
	caseName: string;
	configParam: string;
	fn: Function;
}