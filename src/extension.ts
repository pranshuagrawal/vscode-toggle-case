import * as vscode from 'vscode';
import { getNextCase, CONFIG } from './utilities';
import * as _f from './utilities';
import { IEditBuilderContainer, IConfig } from './models';

const CASE_CONTEXT = "CASE_CONTEXT";

export function activate(context: vscode.ExtensionContext) {

	console.log('Activated!');

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

	let disposable = vscode.commands.registerCommand('toggleCase.toggleCase', () => {
		const config = vscode.workspace.getConfiguration('toggleCase.case');
		const textEditor = vscode.window.activeTextEditor!;

		let editBuilderContainer: IEditBuilderContainer[] = [];

		const globalData: any = context.globalState.get(CASE_CONTEXT)!;
		let newCase = "";

		textEditor.selections.forEach((selection: vscode.Selection, selectionIndex: number) => {

			if(globalData === undefined || !Array.isArray(globalData.allTexts)  || globalData.allTexts.length < 1 || !globalData.currentCase){
				vscode.window.showInformationMessage("Error! Reload extension and vs code. Apologies.");
				return;
			}

			const {
				allTexts,
				currentCase
			} = globalData;

			const toggleTo = getNextCase(currentCase, config);
			newCase = toggleTo;
			const toggleToObject = (CONFIG as {[x: string]: IConfig})[toggleTo];
			let modifiedCase = toggleToObject.fn(allTexts[selectionIndex]);
			editBuilderContainer.push({selection, modifiedCase});
		});

		
		textEditor.edit((editBuilder) => {
			editBuilderContainer.forEach((element: IEditBuilderContainer) => {
				editBuilder.replace(element.selection, element.modifiedCase);
			});
		});

		context.globalState.update(CASE_CONTEXT, {...globalData, currentCase: newCase});
		vscode.window.showInformationMessage(`Changed to ${newCase}`);

	});
	
	context.subscriptions.push(disposable);
}

export function deactivate() {}
