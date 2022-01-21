import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const Form = ({ defaultValues, children, onSubmit, schema }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.username && <p className="error">{errors.username?.message}</p>}
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};
export default Form;
