import {DomainSetting, LinkParameterRemoverSettings} from "./settings";

export default class SettingsNormalizer {
    private SEPARATOR: string = '|';
    private DOMAIN_SEPARATOR: string = ';';
    private LINE_SEPARATOR: string = '\n';

    public normalize(settings: LinkParameterRemoverSettings): string {
        let settingsLines: string[] = [];
        settings.domains.forEach((domainSetting: DomainSetting) => {
            let settingString = domainSetting.domain;

            if (domainSetting.parameters && domainSetting.parameters.length > 0) {
                settingString += this.SEPARATOR + domainSetting.parameters.join(this.DOMAIN_SEPARATOR);
            }

            settingsLines.push(settingString)
        });

        return settingsLines.join(this.LINE_SEPARATOR);
    }

    public denormalize(settingsString: string): LinkParameterRemoverSettings {
        let linkParameterRemoverSettings: LinkParameterRemoverSettings = {
            domains: [],
        };
        settingsString.split(this.LINE_SEPARATOR).forEach((domainString: string) => {
            const parts: string[] = domainString.split(this.SEPARATOR);
            let parameters: string[] = [];
            if (parts.length > 1) {
                parameters = parts[1].split(this.DOMAIN_SEPARATOR);
            }

            linkParameterRemoverSettings.domains.push({
                domain: parts[0],
                parameters: parameters,
            });
        });

        return linkParameterRemoverSettings;
    }
}
