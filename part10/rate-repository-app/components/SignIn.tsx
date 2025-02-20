import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import { useFormik } from "formik";
import { theme } from 'theme';
import useSignIn from '@/hooks/useSignIn';
import useSignUp from '@/hooks/useSignUp';
import useAuthStorage from '@/hooks/useAuthStorage';
import { useState } from 'react';
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
    },
    backButton: {
        padding: theme.spacing.small,
        marginBottom: theme.spacing.medium,
    },
    backButtonText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.body,
    },
    formHeader: {
        fontSize: theme.typography.fontSize.body,
        fontWeight: theme.typography.fontWeight.bold as "bold",
        marginBottom: theme.spacing.medium,
        textAlign: 'center',
        color: theme.colors.primary,
    },
});

const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(25).required("Username is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot be more than 50 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
});

const SignIn = () => {
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
    const [currentView, setCurrentView] = useState<'initial' | 'signIn' | 'signUp'>('initial');
    const formikSignIn = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {

                const userNameConverted = values.username.toLowerCase();
                const fixedValues = {
                    ...values,
                    username: userNameConverted
                }

                await signIn(fixedValues);
            } catch (error) {
                console.error("Error signing in", error);
            }
        },
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const userNameConverted = values.username.toLowerCase();
                const fixedValues = {
                    ...values,
                    username: userNameConverted
                }
                await signUp(fixedValues);
            } catch (error) {
                console.error("Error signing up", error);
                formikSignUp.setErrors({
                    password: "Sign up failed. Please try again."
                });
            }
        },
    });

    const handleSignUp = () => {
        if (currentView === 'initial') {
            setCurrentView('signUp');
        } else {
            formikSignUp.handleSubmit();
        }
    }

    const handleSignIn = () => {
        if (currentView === 'initial') {
            setCurrentView('signIn');
        } else {
            formikSignIn.handleSubmit();
        }
    }

    const renderInitialView = () => (
        <View style={styles.formContainer}>
            <Pressable
                style={styles.submitButton}
                onPress={handleSignIn}
            >
                <Text style={styles.submitButtonText}>Sign In</Text>
            </Pressable>

            <Pressable
                style={styles.submitButton}
                onPress={handleSignUp}
            >
                <Text style={styles.submitButtonText}>Sign Up</Text>
            </Pressable>
        </View>
    );

    const renderForm = () => (
        <View style={styles.formContainer}>
            <Pressable
                style={styles.backButton}
                onPress={() => {
                    setCurrentView('initial');
                    formikSignIn.resetForm();
                    formikSignUp.resetForm();
                }}
            >
                <Text style={styles.backButtonText}>← Back</Text>
            </Pressable>

            <Text style={styles.formHeader}>
                {currentView === 'signIn' ? 'Sign In' : 'Sign Up'}
            </Text>

            <View style={styles.inputContainer}>
                <Text style={[
                    styles.inputLabel,
                    currentView === 'signIn' 
                        ? (formikSignIn.touched.username && formikSignIn.errors.username ? styles.inputErrorText : {})
                        : (formikSignUp.touched.username && formikSignUp.errors.username ? styles.inputErrorText : {})
                ]}>Username</Text>
                <TextInput
                    style={[
                        styles.input,
                        currentView === 'signIn'
                            ? (formikSignIn.touched.username && formikSignIn.errors.username ? styles.inputError : {})
                            : (formikSignUp.touched.username && formikSignUp.errors.username ? styles.inputError : {})
                    ]}
                    placeholder="Username"
                    value={currentView === 'signIn' ? formikSignIn.values.username : formikSignUp.values.username}
                    onChangeText={currentView === 'signIn' 
                        ? formikSignIn.handleChange("username")
                        : formikSignUp.handleChange("username")
                    }
                    onBlur={currentView === 'signIn'
                        ? formikSignIn.handleBlur("username")
                        : formikSignUp.handleBlur("username")
                    }
                />
                {currentView === 'signIn' 
                    ? (formikSignIn.touched.username && formikSignIn.errors.username && (
                        <Text style={styles.errorText}>{formikSignIn.errors.username}</Text>
                    ))
                    : (formikSignUp.touched.username && formikSignUp.errors.username && (
                        <Text style={styles.errorText}>{formikSignUp.errors.username}</Text>
                    ))
                }
            </View>

            <View style={styles.inputContainer}>
                <Text style={[
                    styles.inputLabel,
                    currentView === 'signIn'
                        ? (formikSignIn.touched.password && formikSignIn.errors.password ? styles.inputErrorText : {})
                        : (formikSignUp.touched.password && formikSignUp.errors.password ? styles.inputErrorText : {})
                ]}>Password</Text>
                <TextInput
                    style={[
                        styles.input,
                        currentView === 'signIn'
                            ? (formikSignIn.touched.password && formikSignIn.errors.password ? styles.inputError : {})
                            : (formikSignUp.touched.password && formikSignUp.errors.password ? styles.inputError : {})
                    ]}
                    placeholder="Password"
                    value={currentView === 'signIn' ? formikSignIn.values.password : formikSignUp.values.password}
                    onChangeText={currentView === 'signIn'
                        ? formikSignIn.handleChange("password")
                        : formikSignUp.handleChange("password")
                    }
                    onBlur={currentView === 'signIn'
                        ? formikSignIn.handleBlur("password")
                        : formikSignUp.handleBlur("password")
                    }
                    secureTextEntry
                />
                {currentView === 'signIn'
                    ? (formikSignIn.touched.password && formikSignIn.errors.password && (
                        <Text style={styles.errorText}>{formikSignIn.errors.password}</Text>
                    ))
                    : (formikSignUp.touched.password && formikSignUp.errors.password && (
                        <Text style={styles.errorText}>{formikSignUp.errors.password}</Text>
                    ))
                }
            </View>

            <Pressable
                style={styles.submitButton}
                onPress={currentView === 'signIn' ? handleSignIn : handleSignUp}
            >
                <Text style={styles.submitButtonText}>
                    {currentView === 'signIn' ? 'Sign In' : 'Sign Up'}
                </Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            {currentView === 'initial' ? renderInitialView() : renderForm()}
        </View>
    );
};

export default SignIn;