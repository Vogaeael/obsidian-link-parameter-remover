import {App, Plugin, PluginSettingTab, Setting} from 'obsidian';

interface LinkParameterRemoverSettings {
    domains: string[];
}

const DEFAULT_SETTINGS: LinkParameterRemoverSettings = {
    domains: []
}

export default class LinkParameterRemover extends Plugin {
    settings: LinkParameterRemoverSettings;

    public async onload(): Promise<void> {
        await this.loadSettings();

        this.addCommand({
            id: 'remove-parameter-from-link-all',
            name: 'Remove parameter from link: all',
            callback: () => {
                console.log('remove parameter from link: all');
                // @TODO do things
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-focus',
            name: 'Remove parameter from link: focus',
            callback: () => {
                console.log('remove parameter from link: focus');
                // @TODO do things
            }
        });

        this.addCommand({
            id: 'remove-parameter-from-link-marked',
            name: 'Remove parameter from link: marked',
            callback: () => {
                console.log('remove parameter from link: marked');
                // @TODO do things
            }
        });
        // @TODO do things
    }

    public async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    public async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}

class LinkParameterRemoverSettingTab extends PluginSettingTab {
    plugin: LinkParameterRemover;

    public constructor(app: App, plugin: LinkParameterRemover) {
        super(app, plugin);
        this.plugin = plugin;
    }

    public display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Domains')
            .setDesc('Domains where the parameters should be removed')
            .addTextArea(text => text
                .setPlaceholder('Enter the domain')
                .setValue(this.plugin.settings.domains.join('\n'))
                .onChange(async(value) => {
                    this.plugin.settings.domains = value.split('\n');
                    await this.plugin.saveSettings();
                }))
    }
}
