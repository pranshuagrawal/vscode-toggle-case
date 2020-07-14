import * as vscode from 'vscode';
import {EOL} from 'os';
import { getNextCase, CONFIG } from './utilities';
import * as _f from './utilities';
import { IEditBuilderContainer, IConfig } from './models';

const CASE_CONTEXT = "CASE_CONTEXT";

const logic = (context: vscode.ExtensionContext, changeCaseTo: string = "") => {
	const config = vscode.workspace.getConfiguration('toggleCase.case');
	const textEditor = vscode.window.activeTextEditor!;

	let editBuilderContainer: IEditBuilderContainer[] = [];

	const globalData: any = context.globalState.get(CASE_CONTEXT)!;
	let newCase = "";
	let newRepresentation = "";
	textEditor.selections.forEach((selection: vscode.Selection, selectionIndex: number) => {

		if(globalData === undefined || !Array.isArray(globalData.allTexts)  || globalData.allTexts.length < 1 || !globalData.currentCase){
			vscode.window.showInformationMessage("Error! Reload extension and VS Code. Apologies.");
			return;
		}

		const {
			allTexts,
			currentCase
		} = globalData;

		const toggleTo = changeCaseTo || getNextCase(currentCase, config);
		const toggleToObject = (CONFIG as {[x: string]: IConfig})[toggleTo];
		newRepresentation = toggleToObject.representation;
		newCase = toggleToObject.caseName;
		let modifiedCase = "";
		if(selection.start.line === selection.end.line){
			// single line
			modifiedCase = toggleToObject.fn(allTexts[selectionIndex]);
		}
		else{
			// multiple lines
			let content = allTexts[selectionIndex];
			modifiedCase = content.split(EOL).map((el: string) => toggleToObject.fn(el)).join(EOL);
		}
		editBuilderContainer.push({selection, modifiedCase});
	});

	
	textEditor.edit((editBuilder) => {
		editBuilderContainer.forEach((element: IEditBuilderContainer) => {
			editBuilder.replace(element.selection, element.modifiedCase);
		});
	});

	context.globalState.update(CASE_CONTEXT, {...globalData, currentCase: newCase});
	vscode.window.showInformationMessage(`Changed to ${newRepresentation}`);

};

export function activate(context: vscode.ExtensionContext) {

	vscode.window.onDidChangeTextEditorSelection(function(...a) {
		if(a[0].kind === undefined) {
			return;
		}
		const textEditor = vscode.window.activeTextEditor!;
		const allTexts: string[] = [];
		const currentCase = CONFIG.ORIGINAL.caseName;
		context.globalState.update(CASE_CONTEXT, {allTexts, currentCase});
		textEditor.selections.forEach((selection: vscode.Selection) => {
			const selectedText = textEditor.document.getText(selection);
			allTexts.push(selectedText);
		});
		context.globalState.update(CASE_CONTEXT, {allTexts, currentCase});
	});

	const SPECIFIC_KEYS = Object.values(CONFIG)
		.filter((el: IConfig) => !["ORIGINAL"].includes(el.caseName))
		.map((el: IConfig) => vscode.commands.registerCommand(`extension.changeCase.${el.configParam}`, () => logic(context, el.caseName)))

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.toggleCase', () => logic(context)),
		...SPECIFIC_KEYS
	);
}

export function deactivate() {}
