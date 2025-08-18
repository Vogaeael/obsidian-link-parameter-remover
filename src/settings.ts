import {App, PluginSettingTab, Setting} from "obsidian";
import LinkParameterRemover from "../main";

export interface LinkParameterRemoverSettings {
    domains: string[];
}

export const DEFAULT_SETTINGS: LinkParameterRemoverSettings = {
    domains: []
}

export class LinkParameterRemoverSettingTab extends PluginSettingTab {
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
