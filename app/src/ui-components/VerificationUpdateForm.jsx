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
import { Verification } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function VerificationUpdateForm(props) {
  const {
    id: idProp,
    verification: verificationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    suggestion: "",
    milestone: "",
    userApprovalName: "",
    isVerified: false,
    filePathApproval: "",
    brandName: "",
    userDisapprovalName: "",
    filePathDisapproval: "",
  };
  const [suggestion, setSuggestion] = React.useState(initialValues.suggestion);
  const [milestone, setMilestone] = React.useState(initialValues.milestone);
  const [userApprovalName, setUserApprovalName] = React.useState(
    initialValues.userApprovalName
  );
  const [isVerified, setIsVerified] = React.useState(initialValues.isVerified);
  const [filePathApproval, setFilePathApproval] = React.useState(
    initialValues.filePathApproval
  );
  const [brandName, setBrandName] = React.useState(initialValues.brandName);
  const [userDisapprovalName, setUserDisapprovalName] = React.useState(
    initialValues.userDisapprovalName
  );
  const [filePathDisapproval, setFilePathDisapproval] = React.useState(
    initialValues.filePathDisapproval
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = verificationRecord
      ? { ...initialValues, ...verificationRecord }
      : initialValues;
    setSuggestion(cleanValues.suggestion);
    setMilestone(cleanValues.milestone);
    setUserApprovalName(cleanValues.userApprovalName);
    setIsVerified(cleanValues.isVerified);
    setFilePathApproval(cleanValues.filePathApproval);
    setBrandName(cleanValues.brandName);
    setUserDisapprovalName(cleanValues.userDisapprovalName);
    setFilePathDisapproval(cleanValues.filePathDisapproval);
    setErrors({});
  };
  const [verificationRecord, setVerificationRecord] = React.useState(
    verificationModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Verification, idProp)
        : verificationModelProp;
      setVerificationRecord(record);
    };
    queryData();
  }, [idProp, verificationModelProp]);
  React.useEffect(resetStateValues, [verificationRecord]);
  const validations = {
    suggestion: [],
    milestone: [],
    userApprovalName: [],
    isVerified: [],
    filePathApproval: [],
    brandName: [],
    userDisapprovalName: [],
    filePathDisapproval: [],
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
          suggestion,
          milestone,
          userApprovalName,
          isVerified,
          filePathApproval,
          brandName,
          userDisapprovalName,
          filePathDisapproval,
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
          await DataStore.save(
            Verification.copyOf(verificationRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "VerificationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Suggestion"
        isRequired={false}
        isReadOnly={false}
        value={suggestion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion: value,
              milestone,
              userApprovalName,
              isVerified,
              filePathApproval,
              brandName,
              userDisapprovalName,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.suggestion ?? value;
          }
          if (errors.suggestion?.hasError) {
            runValidationTasks("suggestion", value);
          }
          setSuggestion(value);
        }}
        onBlur={() => runValidationTasks("suggestion", suggestion)}
        errorMessage={errors.suggestion?.errorMessage}
        hasError={errors.suggestion?.hasError}
        {...getOverrideProps(overrides, "suggestion")}
      ></TextField>
      <TextField
        label="Milestone"
        isRequired={false}
        isReadOnly={false}
        value={milestone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone: value,
              userApprovalName,
              isVerified,
              filePathApproval,
              brandName,
              userDisapprovalName,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.milestone ?? value;
          }
          if (errors.milestone?.hasError) {
            runValidationTasks("milestone", value);
          }
          setMilestone(value);
        }}
        onBlur={() => runValidationTasks("milestone", milestone)}
        errorMessage={errors.milestone?.errorMessage}
        hasError={errors.milestone?.hasError}
        {...getOverrideProps(overrides, "milestone")}
      ></TextField>
      <TextField
        label="User approval name"
        isRequired={false}
        isReadOnly={false}
        value={userApprovalName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              userApprovalName: value,
              isVerified,
              filePathApproval,
              brandName,
              userDisapprovalName,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.userApprovalName ?? value;
          }
          if (errors.userApprovalName?.hasError) {
            runValidationTasks("userApprovalName", value);
          }
          setUserApprovalName(value);
        }}
        onBlur={() => runValidationTasks("userApprovalName", userApprovalName)}
        errorMessage={errors.userApprovalName?.errorMessage}
        hasError={errors.userApprovalName?.hasError}
        {...getOverrideProps(overrides, "userApprovalName")}
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
              suggestion,
              milestone,
              userApprovalName,
              isVerified: value,
              filePathApproval,
              brandName,
              userDisapprovalName,
              filePathDisapproval,
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
      <TextField
        label="File path approval"
        isRequired={false}
        isReadOnly={false}
        value={filePathApproval}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              userApprovalName,
              isVerified,
              filePathApproval: value,
              brandName,
              userDisapprovalName,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.filePathApproval ?? value;
          }
          if (errors.filePathApproval?.hasError) {
            runValidationTasks("filePathApproval", value);
          }
          setFilePathApproval(value);
        }}
        onBlur={() => runValidationTasks("filePathApproval", filePathApproval)}
        errorMessage={errors.filePathApproval?.errorMessage}
        hasError={errors.filePathApproval?.hasError}
        {...getOverrideProps(overrides, "filePathApproval")}
      ></TextField>
      <TextField
        label="Brand name"
        isRequired={false}
        isReadOnly={false}
        value={brandName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              userApprovalName,
              isVerified,
              filePathApproval,
              brandName: value,
              userDisapprovalName,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.brandName ?? value;
          }
          if (errors.brandName?.hasError) {
            runValidationTasks("brandName", value);
          }
          setBrandName(value);
        }}
        onBlur={() => runValidationTasks("brandName", brandName)}
        errorMessage={errors.brandName?.errorMessage}
        hasError={errors.brandName?.hasError}
        {...getOverrideProps(overrides, "brandName")}
      ></TextField>
      <TextField
        label="User disapproval name"
        isRequired={false}
        isReadOnly={false}
        value={userDisapprovalName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              userApprovalName,
              isVerified,
              filePathApproval,
              brandName,
              userDisapprovalName: value,
              filePathDisapproval,
            };
            const result = onChange(modelFields);
            value = result?.userDisapprovalName ?? value;
          }
          if (errors.userDisapprovalName?.hasError) {
            runValidationTasks("userDisapprovalName", value);
          }
          setUserDisapprovalName(value);
        }}
        onBlur={() =>
          runValidationTasks("userDisapprovalName", userDisapprovalName)
        }
        errorMessage={errors.userDisapprovalName?.errorMessage}
        hasError={errors.userDisapprovalName?.hasError}
        {...getOverrideProps(overrides, "userDisapprovalName")}
      ></TextField>
      <TextField
        label="File path disapproval"
        isRequired={false}
        isReadOnly={false}
        value={filePathDisapproval}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              userApprovalName,
              isVerified,
              filePathApproval,
              brandName,
              userDisapprovalName,
              filePathDisapproval: value,
            };
            const result = onChange(modelFields);
            value = result?.filePathDisapproval ?? value;
          }
          if (errors.filePathDisapproval?.hasError) {
            runValidationTasks("filePathDisapproval", value);
          }
          setFilePathDisapproval(value);
        }}
        onBlur={() =>
          runValidationTasks("filePathDisapproval", filePathDisapproval)
        }
        errorMessage={errors.filePathDisapproval?.errorMessage}
        hasError={errors.filePathDisapproval?.hasError}
        {...getOverrideProps(overrides, "filePathDisapproval")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || verificationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || verificationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
