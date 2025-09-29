import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const removeDocstringsDisposable = vscode.commands.registerCommand('docstrings-remover.removeDocstrings', async () => {
        const activeEditor = vscode.window.activeTextEditor;

        if (activeEditor && activeEditor.document.languageId === 'python') {
            const originalText = activeEditor.document.getText();
            const newText = removeDocstrings(originalText);

            const fullRange = new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(activeEditor.document.lineCount, 0)
            );
            activeEditor.edit(editBuilder => {
                editBuilder.replace(fullRange, newText);
            });
        }
    });

    context.subscriptions.push(removeDocstringsDisposable);
}

function removeDocstrings(text: string): string {
    const docstringRegex = /((^\s*"""[\s\S]*?""")|(^\s*'''[\s\S]*?'''))\r?\n?/gm;
    return text.replace(docstringRegex, '');
}

export function deactivate() {}
