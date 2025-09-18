import {DomainSetting, LinkParameterRemoverSettings} from "./settings";

export default class LinkParameterRemover {
    private PATH_ALL_PARAMETER_REGEX: string = '([-a-zA-Z0-9@:%_\\+.~#&\\/=]*)(\\?[-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)'
    private PATH_FIRST_PARAM_BEFORE: string = '([-a-zA-Z0-9@:%_\\+.~#&\\/=]*)(\\?';
    private PATH_FIRST_PARAM_AFTER: string = '=[-a-zA-Z0-9@:%_\\+.~#?\\/=]*)(&)?([-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)';
    private PATH_LATER_PARAM_BEFORE: string = '([-a-zA-Z0-9@:%_\\+.~#&\\/=]*)(\\?[-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)(&';
    private PATH_LATER_PARAM_AFTER: string = '=[-a-zA-Z0-9@:%_\\+.~#?\\/\\/=]*)([-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)';
    private PARAM_AFTER: string = '=[-a-zA-Z0-9@:%_\\+.~#?\\/=]*';

    public removeParameter(text: string, settings: LinkParameterRemoverSettings): string {
        settings.domains.forEach((domainSetting: DomainSetting) => {
            if (domainSetting.parameters.length === 0) {
                text = this.removeAllParameters(text, domainSetting.domain);

                return;
            }

            text = this.removeOrKeepSpecificParameters(text, domainSetting);
        });

        return text;
    }

    private removeAllParameters(text: string, domain: string): string {
        const domainRegex: string = this.escapeRegex(domain);
        const urlRegex: RegExp = new RegExp(domainRegex + this.PATH_ALL_PARAMETER_REGEX, 'g');
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(urlRegex);
        for (const match of matches) {
            const searchValue: string = match[0];
            const replaceValue: string = domain + match[1];
            if (searchValue !== replaceValue) {
                text = text.replace(searchValue, replaceValue);
            }
        }

        return text;
    }

    private removeOrKeepSpecificParameters(text: string, domainSetting: DomainSetting): string {
        if (domainSetting.keep) {
            return this.removeAllExceptKeep(text, domainSetting.domain, domainSetting.parameters);
        }

        domainSetting.parameters.forEach((parameterKey: string): void => {
            text = this.removeIfFirstParameter(text, domainSetting.domain, parameterKey);
            text = this.removeIfLaterParameter(text, domainSetting.domain, parameterKey);
        });

        return text;
    }

    private removeAllExceptKeep(text: string, domain: string, params: string[]): string {
        const domainRegex: string = this.escapeRegex(domain);
        const urlRegex: RegExp = new RegExp(domainRegex + this.PATH_ALL_PARAMETER_REGEX, 'g');
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(urlRegex);
        for (const match of matches) {
            const searchValue: string = match[0];
            let foundParams: string[] = [];
            if (match[2].length > 0) {
                params.forEach((param: string): void => {
                    const paramRegex: RegExp = new RegExp(this.escapeRegex(param) + this.PARAM_AFTER);
                    const paramMatch: RegExpMatchArray|null = match[2].match(paramRegex);
                    if (paramMatch) {
                        foundParams.push(paramMatch[0]);
                    }
                });
            }
            let replaceValue: string = domain + match[1];
            if (foundParams.length > 0) {
                replaceValue += '?' + foundParams.join('&');
            }
            if (searchValue !== replaceValue) {
                text = text.replace(searchValue, replaceValue);
            }
        }

        return text;
    }

    private removeIfFirstParameter(text: string, domain: string, param: string): string {
        const domainRegex: string = this.escapeRegex(domain);
        const urlRegex: RegExp = new RegExp(domainRegex + this.PATH_FIRST_PARAM_BEFORE + this.escapeRegex(param) + this.PATH_FIRST_PARAM_AFTER, 'g');
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(urlRegex);
        for (const match of matches) {
            const searchValue: string = match[0];
            let replaceValue: string = domain + match[1];
            if (match[4].length > 0) {
                replaceValue += '?' + match[4];
            }
            if (searchValue !== replaceValue) {
                text = text.replace(searchValue, replaceValue);
            }
        }

        return text;
    }

    private removeIfLaterParameter(text: string, domain: string, param: string): string {
        const domainRegex: string = this.escapeRegex(domain);
        const urlRegex: RegExp = new RegExp(domainRegex + this.PATH_LATER_PARAM_BEFORE + this.escapeRegex(param) + this.PATH_LATER_PARAM_AFTER, 'g');
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(urlRegex);
        for (const match of matches) {
            const searchValue: string = match[0];
            const replaceValue: string = domain + match[1] + match[2] + match[4];
            if (searchValue !== replaceValue) {
                text = text.replace(searchValue, replaceValue);
            }
        }

        return text;
    }

    private escapeRegex(string: string): string {
        // return RegExp.escape(string);
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
}
