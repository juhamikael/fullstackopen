import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import { useFormik } from "formik";
import { theme } from '@/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    formContainer: {
        padding: theme.spacing.medium,
        width: '100%',
    },
    inputContainer: {
        marginBottom: theme.spacing.medium,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: theme.spacing.small,
        paddingHorizontal: theme.spacing.large,
        fontSize: theme.typography.fontSize.body,
        marginBottom: theme.spacing.tiny,
        minHeight: 44,
        backgroundColor: 'white',
        width: '100%',
    },
    inputError: {
        borderColor: '#d73a4a',
        borderWidth: 2,
    },
    inputErrorText: {
        color: '#d73a4a',
    },
    inputLabel: {
        fontSize: theme.typography.fontSize.small,
        paddingHorizontal: theme.spacing.small,
        marginBottom: theme.spacing.tiny,
    },
    errorText: {
        color: '#d73a4a',
        fontSize: theme.typography.fontSize.small,
        marginBottom: theme.spacing.small,
        paddingHorizontal: theme.spacing.small,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
        marginBottom: theme.spacing.medium,
    },
    submitButtonText: {
        color: theme.colors.white,
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.bold as "bold",
    }
});

const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(25).required("Username is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot be more than 50 characters")
        .required("Password is required"),
});

interface Props {
    onSubmit: (values: { username: string; password: string }) => void;
}

const SignIn = ({ onSubmit }: Props) => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.username && formik.errors.username ? styles.inputErrorText : {}
                    ]}>Username</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.username && formik.errors.username ? styles.inputError : {}
                        ]}
                        placeholder="Username"
                        value={formik.values.username}
                        onChangeText={formik.handleChange("username")}
                        onBlur={formik.handleBlur("username")}
                        testID="usernameField"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <Text style={styles.errorText}>{formik.errors.username}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.password && formik.errors.password ? styles.inputErrorText : {}
                    ]}>Password</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.password && formik.errors.password ? styles.inputError : {}
                        ]}
                        placeholder="Password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        secureTextEntry
                        testID="passwordField"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Text style={styles.errorText}>{formik.errors.password}</Text>
                    )}
                </View>

                <Pressable
                    style={styles.submitButton}
                    onPress={() => formik.handleSubmit()}
                    testID="submitButton"
                >
                    <Text style={styles.submitButtonText}>Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignIn; 