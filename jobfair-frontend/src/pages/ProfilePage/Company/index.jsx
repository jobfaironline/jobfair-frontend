import React from 'react';
import CompanyProfileForm from "../../../components/company-profile-form/CompanyProfile";

const data = {
    address: 'fpt',
    benefit: [
        {
            description: 'gai xinh',
            id: 0
        },
        {
            description: 'xe dep',
            id: 1
        }
    ],
    email: 'example@gmail.com',
    employeeMaxNum: 10,
    id: "0e9aef5d-aea5-4607-bcdf-04dfb09ef928",
    mediaUrls: [
        "string1", "string2", "string3"
    ],
    name: "KFC CFK",
    phone: "0123456789",
    sizeId: 0,
    status: "ACTIVE",
    subCategoriesIds: [
        0, 1, 2
    ],
    taxId: "0123-456-789",
    url: "default-url"
}


const CompanyProfile = props => {
    return (
        <div>
            <CompanyProfileForm/>
        </div>
    );
};


export default CompanyProfile;