import LinkParameterRemover from '../src/link-parameter-remover';
import {LinkParameterRemoverSettings} from "../src/settings";

describe('testing parameter remover', (): void => {
    const linkParameterRemover: LinkParameterRemover = new LinkParameterRemover();
    const settingsEmptyDomains: LinkParameterRemoverSettings = {
        domains: []
    };
    const settingsFirstDomain: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [],
                keep: false,
            },
        ],
    };
    const settingsBothDomains: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [],
                keep: false,
            },
            {
                domain: 'https://second-domain.org',
                parameters: [],
                keep: false,
            },
        ],
    };
    const settingsOneParameterDomain: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'dib_tag',
                ],
                keep: false,
            },
        ],
    };
    const settingsMultipleParameterDomain: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'dib_tag',
                    '__mk_',
                ],
                keep: false,
            },
        ],
    };
    const settingsMultipleParameterDomains: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'dib_tag',
                    '__mk_',
                ],
                keep: false,
            },
            {
                domain: 'https://second-domain.org',
                parameters: [
                    'section',
                    'title',
                ],
                keep: false,
            },
        ],
    };
    const settingsNotExistentParameterDomains: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'not_existent',
                    'not_here',
                ],
                keep: false,
            },
        ],
    };
    const settingsKeepWithoutParameterDomain: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [],
                keep: true,
            },
        ],
    };
    const settingsKeepParameterDomain: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'dib_tag',
                    'ufe',
                ],
                keep: true,
            },
        ],
    };
    const settingsKeepParameterAndRemoveParameterDomains: LinkParameterRemoverSettings = {
        domains: [
            {
                domain: 'https://www.first-domain.com',
                parameters: [
                    'dib_tag',
                    'ufe',
                ],
                keep: true,
            },
            {
                domain: 'https://second-domain.org',
                parameters: [
                    'section',
                    'title',
                ],
                keep: false,
            },
        ],
    };

    test('not remove from empty', (): void => {
        const empty: string = '';

        const actual: string = linkParameterRemover.removeParameter(empty, settingsFirstDomain);

        expect(actual).toBe(empty);
    });

    test('not remove from only text', (): void => {
        const text: string = "Hello, this is a text without a link";

        const actual: string = linkParameterRemover.removeParameter(text, settingsFirstDomain);

        expect(actual).toBe(text);
    });

    test('not remove from other links', (): void => {
        const wikipediaLink: string = "https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(wikipediaLink, settingsFirstDomain);

        expect(actual).toBe(wikipediaLink);
    });

    test('remove from simple link', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa";

        const actual: string = linkParameterRemover.removeParameter(input, settingsFirstDomain);

        expect(actual).toBe(expected);
    });

    test('remove only from configured domains', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsFirstDomain);

        expect(actual).toBe(expected);
    });
    
    test('remove all from all configured domains', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa https://second-domain.org/index.php";

        const actual: string = linkParameterRemover.removeParameter(input, settingsBothDomains);

        expect(actual).toBe(expected);
    });

    test('don\'t remove with empty settings', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsEmptyDomains);

        expect(actual).toBe(input);
    });

    test('remove from markdown table entry', (): void => {
        const tableInput: string = "| header | value |\n" +
            "| --- | --- |\n" +
            "| title |https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3|\n";
        const expected: string = "| header | value |\n" +
            "| --- | --- |\n" +
            "| title |https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa|\n";

        const actual: string = linkParameterRemover.removeParameter(tableInput, settingsFirstDomain);

        expect(actual).toBe(expected);
    });

    test('remove from html link', (): void => {
        const htmlLink: string = '<a href="https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px">';
        const expected: string = '<a href="https://www.first-domain.com/assets/images/test.png">';

        const actual: string = linkParameterRemover.removeParameter(htmlLink, settingsFirstDomain);

        expect(actual).toBe(expected);
    });

    test('remove from markdown link', (): void => {
        const markdownLink: string = "[Test](https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px)";
        const expected: string = "[Test](https://www.first-domain.com/assets/images/test.png)";

        const actual: string = linkParameterRemover.removeParameter(markdownLink, settingsFirstDomain);

        expect(actual).toBe(expected);
    });

    test('remove from markdown URL', (): void => {
        const markdownURL: string = "<https://www.first-domain.com/assets/images/test.png?width=1024px&height=2048px>";
        const expected: string = "<https://www.first-domain.com/assets/images/test.png>";

        const actual: string = linkParameterRemover.removeParameter(markdownURL, settingsFirstDomain);

        expect(actual).toBe(expected);
    });

    test('remove one parameter', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsOneParameterDomain);

        expect(actual).toEqual(expected);
    });

    test('remove multiple parameters', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsMultipleParameterDomain);

        expect(actual).toEqual(expected);
    });

    test('remove multiple parameters by multiple domains', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?action=edit";

        const actual: string = linkParameterRemover.removeParameter(input, settingsMultipleParameterDomains);

        expect(actual).toEqual(expected);
    });

    test('don\'t remove not existent parameters', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";

        const actual: string = linkParameterRemover.removeParameter(input, settingsNotExistentParameterDomains);

        expect(actual).toEqual(input);
    });

    test('remove all parameters when you should keep them, but there aren\'t configured ones', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa";

        const actual: string = linkParameterRemover.removeParameter(input, settingsKeepWithoutParameterDomain);

        expect(actual).toBe(expected);
    });

    test('remove all but configured keep parameters', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?dib_tag=se&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76";

        const actual: string = linkParameterRemover.removeParameter(input, settingsKeepParameterDomain);

        expect(actual).toBe(expected);
    });

    test('remove all but configured keep parameters and remove all parameters', (): void => {
        const input: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?__mk_=%C3%85K%C5%85%C5%BD%C3%95%C2%91&dib=ejy3ly0iN5YP.5ka2cvk5JNMhIbkSx1GJ1SgK_HhTRT4QY-9bauNXhXxSwQgYcsArfwjzowR0TM8t72gr6x97cIi118YbPxkBiYaDnxbg-Si6Sf0-EgfJypAT2Haed2idKfH6y3i-feQUpr6-r99-i0ZcCqH-b-KEVcBO2qL9XPfOJnw3aAAteqMZuHoRlDpr9LVP3GlWiX3TwY0IcL9epUB0I5QiUQitzJPkimsHtO0i4pldxnf5Vts.GPnNjh7CdBYkkpSDLJVHjpURYxejDwLu-Lv7-ECKXpU&dib_tag=se&keywords=pony&qid=1723328550&sr=8-2-spons&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76&sp_csd=d2lkZ2V0LmFlZT1zcF9gdGY&th=3 https://second-domain.org/index.php?title=The_Title&action=edit&section=3";
        const expected: string = "https://www.first-domain.com/XXL-F%C3%BCkehorse-105lk-Play-horse/dp/BOlGSNBSI0/ref=sr_1_2_sspa?dib_tag=se&ufe=app_do%3Bamxn1.f0s.89Lf7637-cf3e-4b2f-9f74-15253Lbc9c76 https://second-domain.org/index.php?action=edit";

        const actual: string = linkParameterRemover.removeParameter(input, settingsKeepParameterAndRemoveParameterDomains);

        expect(actual).toBe(expected);
    });
});
