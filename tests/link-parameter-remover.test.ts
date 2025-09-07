import LinkParameterRemover from '../src/link-parameter-remover';
import {LinkParameterRemoverSettings} from "../src/settings";

describe('testing parameter remover', (): void => {
    const linkParameterRemover: LinkParameterRemover = new LinkParameterRemover();
    const settingsFirstDomain: LinkParameterRemoverSettings = {
        domains: [
            'https://www.first-domain.com'
        ]
    };
    const settingsBothDomains: LinkParameterRemoverSettings = {
        domains: [
            'https://www.first-domain.com',
            'https://second-domain.org'
        ]
    };
    const settingsEmptyDomains: LinkParameterRemoverSettings = {
        domains: []
    };

    test('not remove from empty', (): void => {
        const empty: string = '';

        const actual: string = linkParameterRemover.removeParameter(empty, settingsFirstDomain.domains);

        expect(actual).toBe(empty);
    });

    test('not remove from only text', (): void => {
        const text: string = "Hello, this is a text without a link";

        const actual: string = linkParameterRemover.removeParameter(text, settingsFirstDomain.domains);

        expect(actual).toBe(text);
    });

    test('not remove from other links', (): void => {
        const wikipediaLink: string = "https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(wikipediaLink, settingsFirstDomain.domains);

        expect(actual).toBe(wikipediaLink);
    });

    test('remove from simple link', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa";

        const actual: string = linkParameterRemover.removeParameter(input, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });

    test('remove only from configured domains', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });
    
    test('remove all from all configured domains', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa https://second-domain.org/index.php";

        const actual: string = linkParameterRemover.removeParameter(input, settingsBothDomains.domains);

        expect(actual).toBe(expected);
    });

    test('don\'t remove with empty settings', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsEmptyDomains.domains);

        expect(actual).toBe(input);
    });

    test('remove from markdown table entry', (): void => {
        const tableInput: string = "| header | value |\n" +
            "| --- | --- |\n" +
            "| title |https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3|\n";
        const expected: string = "| header | value |\n" +
            "| --- | --- |\n" +
            "| title |https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa|\n";

        const actual: string = linkParameterRemover.removeParameter(tableInput, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });

    test('remove from html link', (): void => {
        const htmlLink: string = '<a href="https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px">';
        const expected: string = '<a href="https://www.first-domain.com/assets/images/test.png">';

        const actual: string = linkParameterRemover.removeParameter(htmlLink, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });

    test('remove from markdown link', (): void => {
        const markdownLink: string = "[Test](https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px)";
        const expected: string = "[Test](https://www.first-domain.com/assets/images/test.png)";

        const actual: string = linkParameterRemover.removeParameter(markdownLink, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });

    test('remove from markdown URL', (): void => {
        const markdownURL: string = "<https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px>";
        const expected: string = "<https://www.first-domain.com/assets/images/test.png>";

        const actual: string = linkParameterRemover.removeParameter(markdownURL, settingsFirstDomain.domains);

        expect(actual).toBe(expected);
    });
});
