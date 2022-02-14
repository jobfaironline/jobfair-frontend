import React from 'react';
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {COMPANY_DEFAULT_MODEL} from "./CompanyDefaultModel";
import {benefitConst, SizeConst, SubCategories} from "./CompanyProfileConstant";
import {Box, Paper} from "@mui/material";
import Select from "react-select";
import styles from "./index.styles.scss";
import {updateCompanyProfile} from "../../../services/userService";
import {ErrorMessage} from "@hookform/error-message";

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

const options = [
    {value: 0, label: "Gai xinh"},
    {value: 1, label: "Xe dap"},
    {value: 2, label: "Luong cao"}
]

export const PHONE_REGEX = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;
export const EMAIL_REGEX = /^([\w!.%+\-])+@([\w\-])+(?:\.[\w\-]+)+$/;

const CompanyProfile = props => {
    const [loadedFiles, setLoadedFiles] = React.useState([]);
    const {register, handleSubmit, control, setValue, getValues,  formState: { errors }} = useForm({
        defaultValues: COMPANY_DEFAULT_MODEL
    });

    const {fields: benefitFields, append: benefitAppend, remove: benefitRemove} = useFieldArray({
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
        const result = Array.from(data.mediaUrls).map(item => item.name);
        setValue('mediaUrls', result);
        console.log(data);
        //call api update
        updateCompanyProfile(data)
            .then(res => {
                if (res.status === 200) {
                    console.log("update successfully")
                }
            })
            .catch(err => {
                console.log("err: ", err)
            })
    }

    const addLoadedFile = (file) => {
        setLoadedFiles((prev) => [...prev, file])
    }

    const removeLoadedFile = (file) => {
        const name = file.name;
        setLoadedFiles(loadedFiles.filter(item => item.name !== name))
    }

    const onFileLoad = (e) => {
        const file = e.currentTarget.files[0];

        let fileReader = new FileReader();
        fileReader.onload = () => {
            console.log("image loaded", fileReader.result);
            // setValue(`mediaUrls.${0}.fileReader.result`)
            const result = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: fileReader.result
            }
            //add file here
            addLoadedFile(result);
            //set
            setValue('mediaUrls', [...getValues('mediaUrls'), result.name])
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
                            Company name:* <input {...register('name', {required: true, maxLength: 100})} />
                            <ErrorMessage errors={errors} name="name" message="Name is required and have max length is 100."/>
                            <ErrorMessage
                                errors={errors}
                                name="name"
                                render={({ message }) => <p className={styles.errorMessage}>{message}</p>}
                            />
                            Phone number: <input {...register('phone', {pattern: PHONE_REGEX}) }/>
                            <ErrorMessage errors={errors} name="phone" message="Phone is invalid."/>
                            <ErrorMessage
                                errors={errors}
                                name="name"
                                render={({ message }) => <p className={styles.errorMessage}>{message}</p>}
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            Company address: (optional) <input {...register('address', {maxLength: 300})}/>
                            <ErrorMessage errors={errors} name="address" message="Address max length is 300."/>
                            <ErrorMessage
                                errors={errors}
                                name="address"
                                render={({ message }) => <p className={styles.errorMessage}>{message}</p>}
                            />
                            Company size: (optional)
                            <select {...register('sizeId')}>
                                {sizeMap.map(size => (
                                    <option value={size.id}>{size.name}</option>
                                ))}
                            </select>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            Email: <input {...register('email', {pattern: EMAIL_REGEX})}/>
                            <ErrorMessage errors={errors} name="email" message="Email is invalid."/>
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p className={styles.errorMessage}>{message}</p>}
                            />
                            Company URL: <input {...register('url', {maxLength: 2048})}/>
                            <ErrorMessage errors={errors} name="url" message="Url is invalid."/>
                            <ErrorMessage
                                errors={errors}
                                name="url"
                                render={({ message }) => <p className={styles.errorMessage}>{message}</p>}
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', ml: 5}}>
                            Company Industry:*
                            <Select
                                defaultValue={[industries[0], industries[1]]}
                                isMulti
                                isSearchable
                                {...register('subCategoriesIds')}
                                options={industries}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(selected) => {
                                    //onChange will catch a whole array when a change triggered
                                    //=> map to new object
                                    // setValue(`subCategoriesIds`, selected.value)
                                    const result = selected.map(item => item.value);
                                    setValue(`subCategoriesIds`, result);
                                }}
                            />
                            Benefit:*
                            <ul>
                                {benefitFields.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            {console.log(getValues(`benefits.${index}.description`))}
                                            <Controller
                                                render={({field}) =>
                                                    <select value={getValues(`benefits.${index}.id`)} onChange={(e) => setValue(`benefits.${index}.id`, e.target.value)}>
                                                        {benefitConst.map(benefit => <option value={benefit.value}>{benefit.label}</option>)}
                                                    </select>
                                                }
                                                control={control}
                                                name={`benefits.${index}.id`}
                                            />
                                            <Controller render={({field}) => <input {...field}/>}
                                                        name={`benefits.${index}.description`}
                                                        control={control}
                                                        defaultValue={getValues(`benefits.${index}.description`)}
                                            />
                                            <button type="button" onClick={() => benefitRemove(index)}>
                                                Delete
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button
                                type="button"
                                onClick={() => {
                                    benefitAppend({value: 1, label: 'Travel'});
                                }}
                            >
                                append
                            </button>
                        </Box>
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
                            {loadedFiles.map((file, index) => {
                                return (
                                    <div>
                                        <img src={file.data}/>
                                        <button onClick={removeLoadedFile(file)}>Remove</button>
                                    </div>
                                )

                            })}
                        </div>
                        <div>
                            Drag a file here
                        </div>

                    </Box>
                </Paper>
            </form>
        </div>
    );
};


export default CompanyProfile;