import {IconButton, styled} from "@mui/material";
import React from "react";

export const REGEX_EMAIL = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}$";
export const REGEX_PASSWORD = "^.{2,}$";
export const REGEX_PHONE = "^[0-9]{10,11}$";
export const REGEX_XSS = "(<w*)((s/>)|(.*</w*>))";

export const TOKEN_KEY = "token";
export const TOKEN = "";
export const USER_STORAGE = "user";

export const DEFAULT_PROFILE_IMAGE = "https://site-cdn.givemesport.com/images/21/12/20/9c6540c9ef12a8895a702008b4edb46b/1201.jpg";

export const jobLevelConst = [
    {
        value: 0,
        label: "INTERN_STUDENT"
    },
    {
        value: 1,
        label: "FRESHER"
    },
    {
        value: 2,
        label: "EXPERIENCE"
    },
    {
        value: 3,
        label: "DIRECTOR"
    },
    {
        value: 4,
        label: "DIRECTOR_AND_ABOVE"
    }
]

export const genderConst = [
    {
        value: 0,
        label: "MALE"
    },
    {
        value: 1,
        label: "FEMALE"
    }
]

export const maritalStatusConst = [
    {
        value: 0,
        label: "MARRIED"
    },
    {
        value: 1,
        label: "SINGLE"
    }
]

export const countryConst = [
    {
        value: "60ebd8bd-2b10-4d03-a3a4-ccfd0ab504d3",
        label: "Vietnam"
    },
    {
        value: "045de1ce-e4d2-45d2-806a-c1fa39dea882",
        label: "Others (International country)"
    },
]

export const residenceConst = [
    {
        value: "54c406e1-ff08-4f3f-a2c7-d45c78863f3c",
        label: "Personal home"
    },
    {
        value: "55d5b9b9-64d9-454b-88af-308d4073d96b",
        label: "Villa"
    },
    {
        value: "ddce0336-dd98-4ed4-88ad-b85f18001551",
        label: "Small village"
    },
    {
        value: "e55c522a-b595-4992-a2a6-9abb9aa8cc69",
        label: "Apartment"
    }
]

export const ATTENDANT_DEFAULT_MODEL = {
    account: {
        id: "",
        email: "",
        password: "",
        status: "",
        phone: "",
        profileImageUrl: "",
        firstname: "",
        lastname: "",
        middlename: "",
        gender: "",
        role: ""
    },
    title: "",
    address: "",
    dob: null,
    jobTitle: "",
    yearOfExp: null,
    maritalStatus: "",
    countryId: "",
    residenceId: "",
    jobLevel: "",
    skills: [
        {
            id: "",
            name: "",
            proficiency: 0
        }
    ],
    workHistories: [
        {
            id: "",
            position: "",
            company: "",
            fromDate: 0,
            toDate: 0,
            isCurrentJob: false,
            description: ""
        }
    ],
    educations: [
        {
            id: "",
            subject: "",
            school: "",
            fromDate: 0,
            toDate: 0,
            achievement: "",
            qualification: ""
        }
    ],
    certifications: [
        {
            id: "",
            name: "",
            institution: "",
            year: 2008,
            certificationLink: ""
        }
    ],
    references: [
        {
            id: "",
            fullname: null,
            position: "",
            company: "",
            email: "",
            phone: null
        },
    ],
    activities: [
        {
            id: "",
            name: "",
            functionTitle: "",
            organization: "",
            fromDate: 0,
            toDate: 0,
            isCurrentActivity: true,
            description: ""
        }
    ]
}

export const qualificationConst =[
    {
        value: 0,
        label: 'COLLEGE'
    },
    {
        value: 1,
        label: 'BACHELORS'
    },
    {
        value: 2,
        label: 'HIGH_SCHOOL'
    },
    {
        value: 3,
        label: 'OTHERS'
    },
    {
        value: 4,
        label: 'MASTER'
    },
    {
        value: 5,
        label: 'ASSOCIATE_DEGREE'
    }
]

export const YesNoConst = [
    {
        value: true,
        label: "Yes"
    },
    {
        value: false,
        label: "No"
    }
]

