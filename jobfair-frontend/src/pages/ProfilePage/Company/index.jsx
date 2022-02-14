import React from 'react';
import {useFieldArray, useForm, Controller, set} from "react-hook-form";
import {COMPANY_DEFAULT_MODEL} from "./CompanyDefaultModel";
import {benefitConst, SizeConst, SubCategories} from "./CompanyProfileConstant";
import {Box, Paper} from "@mui/material";
import styles from "../Attendant/ProfilePage.module.scss";
import Select from "react-select";

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
    id: "",
    mediaUrls: [
        "string1", "string2", "string3"
    ],
    name: "KFC CFK",
    contactName: "Fried Chicken wings",
    companyProfile: "KFC (also known as Kentucky Fried Chicken) is an American fast food restaurant chain headquartered in Louisville, Kentucky that specializes in fried chicken." +
        " It is the world's second-largest restaurant chain (as measured by sales) after McDonald's, with 22,621 locations globally in 150 countries as of December 2019.",
    phone: "0123456789",
    sizeId: 0,
    status: "ACTIVE",
    subCategoriesIds: [
        0, 1, 2
    ],
    taxId: "0123-456-789",
    url: "default-url"
}

const options = [
    {value: 0, label: "Gai xinh"},
    {value: 1, label: "Xe dap"},
    {value: 2, label: "Luong cao"}
]

const CompanyProfile = props => {
    const {register, handleSubmit, control, setValue, getValues} = useForm({
        defaultValues: COMPANY_DEFAULT_MODEL
    });

    const {fields: benefitFields, append: benenfitAppend, remove: benefitRemove} = useFieldArray({
        control,
        name: 'benefits'
    })

    const res = {
        data: data,
        status: 200
    }

    const fetchData = async () => {
        if (res.status === 200) {
            setValue('address', res.data.address);
            setValue('email', res.data.email);
            setValue('employeeMaxNum', res.data.employeeMaxNum);
            setValue('id', res.data.id);
            setValue('name', res.data.name);
            setValue('contactName', res.data.contactName);
            setValue('companyProfile', res.data.companyProfile);
            setValue('phone', res.data.phone);
            setValue('sizeId', res.data.sizeId);
            setValue('status', res.data.status);
            setValue('taxId', res.data.taxId);
            setValue('url', res.data.url);

            setValue('benefits', [...res.data.benefit]);
            setValue('mediaUrls', [...res.data.mediaUrls]);
            setValue('subCategoriesIds', [...res.data.subCategoriesIds]);

        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const onSubmit = (data) => {
        console.log(data);
    }

    const onFileLoad = (e) => {
        const file = e.currentTarget.files[0];

        let fileReader = new FileReader();
        fileReader.onload = () => {
            console.log("image loaded", fileReader.result);
        }

        fileReader.onabort = () => {
            alert("reading aborted")
        }

        fileReader.onerror = () => {
            alert("error reading image")
        }

        fileReader.readAsDataURL(file);
    }

    const sizeMap = SizeConst;

    const industries = SubCategories;

    return (
        <div>
            <h1>Company Information</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button type="submit">Update</button>
                <Paper elevation={16} variant="outlined" className={styles.paper}>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            Company name:* <input {...register('name')} />
                            Phone number: <input {...register('phone')}/>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            Company address: (optional) <input {...register('address')}/>
                            Company size: (optional)
                            <select {...register('sizeId')}>
                                {sizeMap.map(size => (
                                    <option value={size.id}>{size.name}</option>
                                ))}
                            </select>
                        </Box>
                        Contact Name: (optional)
                        <input {...register('contactName')}/>
                        Company Industry:*
                        <select {...register('subCategoriesIds')}>
                            {industries.map(size => (
                                <option value={size.id}>{size.name}</option>
                            ))}
                        </select>
                        Benefit:*
                        <ul>
                            {benefitFields.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        <Controller
                                            render={({field}) => <Select options={options}/>}
                                            control={control}
                                            onChange={([selected]) => {
                                                // React Select return object instead of value for selection
                                                return {value: selected};
                                            }}
                                            name={`benefits.${index}.id`}
                                            defaultValue={{value: 0}}
                                        />
                                        <button type="button" onClick={() => benefitRemove(index)}>
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                            <button
                                type="button"
                                onClick={() => {
                                    benenfitAppend({description: "new-description"});
                                }}
                            >
                                append food
                            </button>
                            <br/>
                            Company Profile:
                            <textarea {...register('companyProfile')}/> <br/>
                            Company Medias:
                            <input type="file" {...register('mediaUrls')}
                                   onDragOver={(e) => {
                                       e.preventDefault();
                                       e.stopPropagation();
                                   }}
                                   onDrop={onFileLoad.bind(this)}
                                   onChange={onFileLoad.bind(this)}
                            />
                            <div>
                                File container
                            </div>
                            <div>
                                Drag a file here
                            </div>

                        </ul>
                    </Box>
                </Paper>
            </form>
        </div>
    );
};


export default CompanyProfile;