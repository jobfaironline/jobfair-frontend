import {convertToDateString} from "../../utils/common";
import moment from "moment";

export const GET_ATTENDANT_MODEL =   {
    "account": {
        "id": "fba88e6a-742b-4ffa-9ac7-a8058520957f",
        "email": "attendant1@jofair.com",
        "password": "$2a$10$qYRho4ZJt9LNkbmQtL4Yc.IzGzzy.smfq2OkUD1IYF.eH9rFpq61O",
        "status": "VERIFIED",
        "phone": "0917499917",
        "profileImageUrl": "https://d3polnwtp0nqe6.cloudfront.net/default.png",
        "firstname": "Bui",
        "lastname": "Khoi (Attendant 2)",
        "middlename": "Minh",
        "gender": "MALE",
        "role": "ATTENDANT"
    },
    "title": "DevOps",
    "address": "Ho Chi Minh",
    // "dob" : moment(new Date(1644825972)),
    "dob" : moment('2020-06-09T12:40:14+0000'),
    "jobTitle": "DevOps",
    "yearOfExp": 2,
    "maritalStatus": "MARRIED",
    "countryId": "00809d2d-c1f8-4d5c-aee4-53c9c8cac197",
    "residenceId": "54c406e1-ff08-4f3f-a2c7-d45c78863f3c",
    "jobLevel": "INTERN_STUDENT",
    "skills": [
        {
            "id": "da2a5a4d-851b-440f-8afe-58cb3bb6020c",
            "name": "Singing abc",
            "proficiency": 2
        }
    ],
    "workHistories": [
        {
            "company": "string",
            "description": "string",
            "fromDate": 0,
            "id": "string",
            "isCurrentJob": true,
            "position": "string",
            "toDate": 0
        }
    ],
    "educations": [
        {
            "id": "9b8a5951-69ac-4bfd-8525-047c94ad1109",
            "subject": "Frog research",
            "school": "FPT University",
            "fromDate": 1644825972419,
            "toDate": 1644825972419,
            "achievement": "Golden frog",
            "qualification": "COLLEGE"
        }
    ],
    "certifications": [
        {
            "id": "dd5fd976-01f9-431b-a9a0-fe758165d4e2",
            "name": "CCNP",
            "institution": "Cisco",
            "year": 2018,
            "certificationLink": "cisco.com"
        }
    ],
    "references": [
        {
            "company": "string",
            "email": "string",
            "fullname": "string",
            "id": "string",
            "phone": "string",
            "position": "string"
        }
    ],
    "activities": [
        {
            "id": "fb77e3c1-dc74-4d93-9c3d-78587386d340",
            "name": "Redhat",
            "functionTitle": "Hacker",
            "organization": "RedHat",
            "fromDate": 1644825972419,
            "toDate": 1644825972419,
            "isCurrentActivity": true,
            "description": "Hacker at FBI"
        }
    ]
}