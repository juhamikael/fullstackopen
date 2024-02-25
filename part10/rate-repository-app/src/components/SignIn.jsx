//src/components/SignIn.jsx
import { Text as NativeText, View, Pressable, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import theme from "../theme";
import { Formik } from "formik";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .test(
      "contains-number",
      "Password must contain at least one number",
      (value) => {
        return /\d/.test(value);
      }
    )
    .test(
      "contains-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => {
        return /[A-Z]/.test(value);
      }
    )
    .test(
      "contains-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => {
        return /[a-z]/.test(value);
      }
    )
    .test(
      "contains-special-char",
      "Password must contain at least one special character",
      (value) => {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
      }
    ),
});

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    fontFamily: theme.fonts.main,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: theme.fonts.main,
  },
});
const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        style={styles.input}
        name="username"
        placeholder="Username"
        placeholderTextColor={theme.colors.applicationBackgroundColor}
      />
      <FormikTextInput
        style={styles.input}
        name="password"
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={theme.colors.applicationBackgroundColor}
      />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <NativeText style={styles.submitButtonText}>Sign in</NativeText>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <View>
      <NativeText
        style={{
          fontSize: theme.fontSizes.heading,
          fontWeight: theme.fontWeights.bold,
          padding: 10,
          textAlign: "center",
        }}
      >
        Sign in
      </NativeText>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
