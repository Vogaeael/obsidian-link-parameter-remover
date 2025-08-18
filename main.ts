import {Editor, Plugin, TFile} from 'obsidian';
import {DEFAULT_SETTINGS, LinkParameterRemoverSettings, LinkParameterRemoverSettingTab} from "./src/settings";


export default class LinkParameterRemover extends Plugin {
    settings: LinkParameterRemoverSettings;

    public async onload(): Promise<void> {
        await this.loadSettingsAndAddSettingsTab();

        this.addCommands();
    }

    private async loadSettingsAndAddSettingsTab(): Promise<void> {
        await this.loadSettings();
        this.addSettingTab(new LinkParameterRemoverSettingTab(this.app, this));
    }

    private addCommands(): void {
        this.addCommand({
            id: 'remove-parameter-from-link-all',
            name: 'Remove parameter from link: all',
            callback: (): void => {
                const { vault } = this.app;
                vault.getMarkdownFiles().map((file: TFile): void => {
                   vault.process(file, (content: string): string => {
                       // @TODO remove parameters from links
                       return content;
                   });
                });
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-focus',
            name: 'Remove parameter from link: focus',
            editorCheckCallback: (checking: boolean, editor: Editor): boolean => {
                // @TODO get focused file
                // @TODO check if we have a focused file
                // @TODO if we don't have one return false
                // @TODO if we have one, do the change and then return true
                return true;
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-selection',
            name: 'Remove parameter from link: selection',
            editorCheckCallback: (checking: boolean, editor: Editor): boolean => {
                const selection: string = editor.getSelection();
                if (selection.length === 0) {
                    return false;
                }

                if (!checking) {
                    // @TODO remove parameters from links
                    editor.replaceSelection(selection);
                }

                return true;
            }
        });
    }

    public async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    public async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}
