import {
    App,
    Editor,
    Plugin,
    PluginManifest,
    TFile
} from 'obsidian';
import {
    DEFAULT_SETTINGS,
    LinkParameterRemoverSettings,
    LinkParameterRemoverSettingTab
} from "./src/settings";
import LinkParameterRemover from "./src/link-parameter-remover";

export default class LinkParameterRemoverPlugin extends Plugin {
    public settings: LinkParameterRemoverSettings;
    public linkParameterRemover: LinkParameterRemover;

    public constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.linkParameterRemover = new LinkParameterRemover();
    }

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
                       return this.linkParameterRemover.removeParameter(content, this.settings.domains);
                   });
                });
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-focus',
            name: 'Remove parameter from link: focus',
            checkCallback: (checking: boolean): boolean => {
                const file: TFile|null = this.app.workspace.getActiveFile();

                if (file === null) {
                    return false;
                }

                if (!checking) {
                    const { vault } = this.app;
                    vault.process(file, (content: string): string => {
                        return this.linkParameterRemover.removeParameter(content, this.settings.domains);
                    });
                }

                return true;
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-selection',
            name: 'Remove parameter from link: selection',
            editorCheckCallback: (checking: boolean, editor: Editor): boolean => {
                let selection: string = editor.getSelection();
                if (selection.length === 0) {
                    return false;
                }

                if (!checking) {
                    selection = this.linkParameterRemover.removeParameter(selection, this.settings.domains);
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
