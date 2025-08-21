export default class LinkParameterRemover {
    private PATH_PARAMETER_REGEX: string = '([-a-zA-Z0-9@:%_\\+.~#&\\/=]*)(\\?[-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)'

    public removeParameter(text: string, domains: string[]): string {
        domains.forEach((domain: string) => {
            const domainRegex: string = this.escapeRegex(domain);
            const urlRegex: RegExp = new RegExp(domainRegex + this.PATH_PARAMETER_REGEX, 'g');
            const matches: IterableIterator<RegExpMatchArray> = text.matchAll(urlRegex);
            for (const match of matches) {
                text = text.replace(match[0], domain + match[1]);
            }
        });

        return text;
    }

    private escapeRegex(string: string): string {
        // return RegExp.escape(string);
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
}
