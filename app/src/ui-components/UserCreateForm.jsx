/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    email: "",
    update: "",
    filePath: "",
    strength: "",
    isBusiness: false,
    location: "",
    bio: "",
    isPrivate: false,
    parentBrand: "",
    isVerified: false,
    hasCompletedForm: false,
    industry: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [update, setUpdate] = React.useState(initialValues.update);
  const [filePath, setFilePath] = React.useState(initialValues.filePath);
  const [strength, setStrength] = React.useState(initialValues.strength);
  const [isBusiness, setIsBusiness] = React.useState(initialValues.isBusiness);
  const [location, setLocation] = React.useState(initialValues.location);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [isPrivate, setIsPrivate] = React.useState(initialValues.isPrivate);
  const [parentBrand, setParentBrand] = React.useState(
    initialValues.parentBrand
  );
  const [isVerified, setIsVerified] = React.useState(initialValues.isVerified);
  const [hasCompletedForm, setHasCompletedForm] = React.useState(
    initialValues.hasCompletedForm
  );
  const [industry, setIndustry] = React.useState(initialValues.industry);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setEmail(initialValues.email);
    setUpdate(initialValues.update);
    setFilePath(initialValues.filePath);
    setStrength(initialValues.strength);
    setIsBusiness(initialValues.isBusiness);
    setLocation(initialValues.location);
    setBio(initialValues.bio);
    setIsPrivate(initialValues.isPrivate);
    setParentBrand(initialValues.parentBrand);
    setIsVerified(initialValues.isVerified);
    setHasCompletedForm(initialValues.hasCompletedForm);
    setIndustry(initialValues.industry);
    setErrors({});
  };
  const validations = {
    name: [],
    email: [],
    update: [],
    filePath: [],
    strength: [],
    isBusiness: [],
    location: [],
    bio: [],
    isPrivate: [],
    parentBrand: [],
    isVerified: [],
    hasCompletedForm: [],
    industry: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          email,
          update,
          filePath,
          strength,
          isBusiness,
          location,
          bio,
          isPrivate,
          parentBrand,
          isVerified,
          hasCompletedForm,
          industry,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new User(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email: value,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Update"
        isRequired={false}
        isReadOnly={false}
        value={update}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update: value,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.update ?? value;
          }
          if (errors.update?.hasError) {
            runValidationTasks("update", value);
          }
          setUpdate(value);
        }}
        onBlur={() => runValidationTasks("update", update)}
        errorMessage={errors.update?.errorMessage}
        hasError={errors.update?.hasError}
        {...getOverrideProps(overrides, "update")}
      ></TextField>
      <TextField
        label="File path"
        isRequired={false}
        isReadOnly={false}
        value={filePath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath: value,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.filePath ?? value;
          }
          if (errors.filePath?.hasError) {
            runValidationTasks("filePath", value);
          }
          setFilePath(value);
        }}
        onBlur={() => runValidationTasks("filePath", filePath)}
        errorMessage={errors.filePath?.errorMessage}
        hasError={errors.filePath?.hasError}
        {...getOverrideProps(overrides, "filePath")}
      ></TextField>
      <TextField
        label="Strength"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={strength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength: value,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.strength ?? value;
          }
          if (errors.strength?.hasError) {
            runValidationTasks("strength", value);
          }
          setStrength(value);
        }}
        onBlur={() => runValidationTasks("strength", strength)}
        errorMessage={errors.strength?.errorMessage}
        hasError={errors.strength?.hasError}
        {...getOverrideProps(overrides, "strength")}
      ></TextField>
      <SwitchField
        label="Is business"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isBusiness}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness: value,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.isBusiness ?? value;
          }
          if (errors.isBusiness?.hasError) {
            runValidationTasks("isBusiness", value);
          }
          setIsBusiness(value);
        }}
        onBlur={() => runValidationTasks("isBusiness", isBusiness)}
        errorMessage={errors.isBusiness?.errorMessage}
        hasError={errors.isBusiness?.hasError}
        {...getOverrideProps(overrides, "isBusiness")}
      ></SwitchField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location: value,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio: value,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <SwitchField
        label="Is private"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPrivate}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate: value,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.isPrivate ?? value;
          }
          if (errors.isPrivate?.hasError) {
            runValidationTasks("isPrivate", value);
          }
          setIsPrivate(value);
        }}
        onBlur={() => runValidationTasks("isPrivate", isPrivate)}
        errorMessage={errors.isPrivate?.errorMessage}
        hasError={errors.isPrivate?.hasError}
        {...getOverrideProps(overrides, "isPrivate")}
      ></SwitchField>
      <TextField
        label="Parent brand"
        isRequired={false}
        isReadOnly={false}
        value={parentBrand}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand: value,
              isVerified,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.parentBrand ?? value;
          }
          if (errors.parentBrand?.hasError) {
            runValidationTasks("parentBrand", value);
          }
          setParentBrand(value);
        }}
        onBlur={() => runValidationTasks("parentBrand", parentBrand)}
        errorMessage={errors.parentBrand?.errorMessage}
        hasError={errors.parentBrand?.hasError}
        {...getOverrideProps(overrides, "parentBrand")}
      ></TextField>
      <SwitchField
        label="Is verified"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isVerified}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified: value,
              hasCompletedForm,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.isVerified ?? value;
          }
          if (errors.isVerified?.hasError) {
            runValidationTasks("isVerified", value);
          }
          setIsVerified(value);
        }}
        onBlur={() => runValidationTasks("isVerified", isVerified)}
        errorMessage={errors.isVerified?.errorMessage}
        hasError={errors.isVerified?.hasError}
        {...getOverrideProps(overrides, "isVerified")}
      ></SwitchField>
      <SwitchField
        label="Has completed form"
        defaultChecked={false}
        isDisabled={false}
        isChecked={hasCompletedForm}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm: value,
              industry,
            };
            const result = onChange(modelFields);
            value = result?.hasCompletedForm ?? value;
          }
          if (errors.hasCompletedForm?.hasError) {
            runValidationTasks("hasCompletedForm", value);
          }
          setHasCompletedForm(value);
        }}
        onBlur={() => runValidationTasks("hasCompletedForm", hasCompletedForm)}
        errorMessage={errors.hasCompletedForm?.errorMessage}
        hasError={errors.hasCompletedForm?.hasError}
        {...getOverrideProps(overrides, "hasCompletedForm")}
      ></SwitchField>
      <TextField
        label="Industry"
        isRequired={false}
        isReadOnly={false}
        value={industry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              update,
              filePath,
              strength,
              isBusiness,
              location,
              bio,
              isPrivate,
              parentBrand,
              isVerified,
              hasCompletedForm,
              industry: value,
            };
            const result = onChange(modelFields);
            value = result?.industry ?? value;
          }
          if (errors.industry?.hasError) {
            runValidationTasks("industry", value);
          }
          setIndustry(value);
        }}
        onBlur={() => runValidationTasks("industry", industry)}
        errorMessage={errors.industry?.errorMessage}
        hasError={errors.industry?.hasError}
        {...getOverrideProps(overrides, "industry")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
