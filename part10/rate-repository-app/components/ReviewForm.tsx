import { Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import * as yup from 'yup';
import { useFormik } from "formik";
import { theme } from 'theme';
import useReview from '@/hooks/useReview';

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
    
});

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner username is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup.number()
        .min(0, "Rating must be between 0 and 100")
        .max(100, "Rating must be between 0 and 100")
        .required("Rating is required"),
    text: yup.string().optional(),
});

const ReviewForm = () => {
    const [createReview] = useReview();

    const formik = useFormik({
        initialValues: {
            ownerName: "",
            repositoryName: "",
            rating: "",
            text: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await createReview({
                    ...values,
                    rating: Number(values.rating)
                });
            } catch (error) {
                console.error("Error creating review", error);
            }
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.ownerName && formik.errors.ownerName ? styles.inputErrorText : {}
                    ]}>Repository owner username</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.ownerName && formik.errors.ownerName ? styles.inputError : {}
                        ]}
                        placeholder="Repository owner username"
                        value={formik.values.ownerName}
                        onChangeText={formik.handleChange("ownerName")}
                        onBlur={formik.handleBlur("ownerName")}
                    />
                    {formik.touched.ownerName && formik.errors.ownerName && (
                        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.repositoryName && formik.errors.repositoryName ? styles.inputErrorText : {}
                    ]}>Repository name</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.repositoryName && formik.errors.repositoryName ? styles.inputError : {}
                        ]}
                        placeholder="Repository name"
                        value={formik.values.repositoryName}
                        onChangeText={formik.handleChange("repositoryName")}
                        onBlur={formik.handleBlur("repositoryName")}
                    />
                    {formik.touched.repositoryName && formik.errors.repositoryName && (
                        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.rating && formik.errors.rating ? styles.inputErrorText : {}
                    ]}>Rating between 0 and 100</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.rating && formik.errors.rating ? styles.inputError : {}
                        ]}
                        placeholder="Rating"
                        value={formik.values.rating}
                        onChangeText={formik.handleChange("rating")}
                        onBlur={formik.handleBlur("rating")}
                        keyboardType="numeric"
                    />
                    {formik.touched.rating && formik.errors.rating && (
                        <Text style={styles.errorText}>{formik.errors.rating}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[
                        styles.inputLabel,
                        formik.touched.text && formik.errors.text ? styles.inputErrorText : {}
                    ]}>Review</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formik.touched.text && formik.errors.text ? styles.inputError : {}
                        ]}
                        placeholder="Review"
                        value={formik.values.text}
                        onChangeText={formik.handleChange("text")}
                        onBlur={formik.handleBlur("text")}
                        multiline
                        numberOfLines={4}
                    />
                    {formik.touched.text && formik.errors.text && (
                        <Text style={styles.errorText}>{formik.errors.text}</Text>
                    )}
                </View>

                <Pressable
                    style={styles.submitButton}
                    onPress={() => formik.handleSubmit()}
                >
                    <Text style={styles.submitButtonText}>Create Review</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ReviewForm;