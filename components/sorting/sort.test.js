const sort = require('./sort');

describe("sort.js", () => {

    // sort.splitATDoubleReturn
    it("Should split an array at a double carriage return", () => {
        const data = "Name Phone Address Website\n\nName Phone Address Website";
        const result = sort.splitAtDoubleReturn(data);

        expect(result).toEqual(
            ['Name Phone Address Website','Name Phone Address Website']
        );
    });

    // sort.splitAtSingleReturn
    it("Should split an array at a single carriage return", () => {
        const data = ['Name\nPhone\nAddress\nWebsite','Name\nPhone\nAddress\nWebsite'];
        const result = sort.splitAtSingleReturn(data);

        expect(result).toEqual(
            [['Name', 'Phone', 'Address', 'Website'],['Name', 'Phone', 'Address', 'Website']]
        );
    });

    // sort.pushToRawObject
    it("Should return an array into a properly structure JS object", () => {
        const data = [['Name', 'Phone', 'Contact', 'Address', 'Website'],['Name', 'Phone', 'Contact', 'Address', 'Website']];
        const result = sort.pushToRawObject(data);

        expect(result).toEqual([
            {
                name: 'Name',
                telephone: 'Phone',
                contact: 'Contact',
                address: 'Address',
                website: 'Website'
            },
            {
                name: 'Name',
                telephone: 'Phone',
                contact: 'Contact',
                address: 'Address',
                website: 'Website'
            }
        ]);
    });

    // sort.sortUniqueObject
    it("Should return an array of unique objects", () => {
        const data = [
            {
                name: 'Name1',
                telephone: 'Phone1',
                contact: 'Contact1',
                address: 'Address1',
                website: 'Website1'
            },
            {
                name: 'Name2',
                telephone: 'Phone2',
                contact: 'Contact2',
                address: 'Address2',
                website: 'Website2'
            },
            {
                name: 'Name1',
                telephone: 'Phone1',
                contact: 'Contact1',
                address: 'Address1',
                website: 'Website1'
            }
        ];
        const result = sort.sortUniqueObject(data);

        expect(result).toEqual([
            {
                name: 'Name1',
                telephone: 'Phone1',
                contact: 'Contact1',
                address: 'Address1',
                website: 'Website1'
            },
            {
                name: 'Name2',
                telephone: 'Phone2',
                contact: 'Contact2',
                address: 'Address2',
                website: 'Website2'
            }
        ]);
    });

    // sort.convertObjToJSON
    it("Should return valid JSON", () => {
        const data = [
            {
                name: 'Name1',
                telephone: 'Phone1',
                contact: 'Contact1',
                address: 'Address1',
                website: 'Website1'
            },
            {
                name: 'Name2',
                telephone: 'Phone2',
                contact: 'Contact2',
                address: 'Address2',
                website: 'Website2'
            }
        ];
        const result = sort.convertObjToJSON(data);
        const parseJSON = () => {
            JSON.parse(result);
        };

        expect(parseJSON).not.toThrow();
    });
});