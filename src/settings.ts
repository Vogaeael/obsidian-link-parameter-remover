import {
    App,
    PluginSettingTab,
    Setting
} from "obsidian";
import LinkParameterRemoverPlugin from "../main";
import SettingsNormalizer from "./settings-normalizer";

export type DomainSetting = {
    domain: string;
    parameters: string[];
}

export interface LinkParameterRemoverSettings {
    domains: DomainSetting[];
}

export const DEFAULT_SETTINGS: LinkParameterRemoverSettings = {
    domains: []
}

export class LinkParameterRemoverSettingTab extends PluginSettingTab {
    private plugin: LinkParameterRemoverPlugin;
    private settingsNormalizer: SettingsNormalizer;

    public constructor(app: App, plugin: LinkParameterRemoverPlugin, settingsLoader: SettingsNormalizer) {
        super(app, plugin);
        this.plugin = plugin;
        this.settingsNormalizer = settingsLoader;
    }

    public display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Domains')
            .setDesc('Domains where the parameters should be removed')
            .addTextArea(text => text
                .setPlaceholder('Enter the domain')
                .setValue(this.settingsNormalizer.normalize(this.plugin.settings))
                .onChange(async(value: string) => {
                    this.plugin.settings = this.settingsNormalizer.denormalize(value);
                    await this.plugin.saveSettings();
                }))
    }
}
