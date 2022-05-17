import { Box, Button, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { UserContext } from "../../context/userContext";
import { signin, signup } from "../../services/auth";
import { useToast } from "../../services/useToast";

type loginMode = "signin" | "signup";

interface SelectorButtonProps {
    onClick: (newMode: loginMode) => void;
    currentMode: loginMode;
    buttonMode: loginMode;
    children: string
}
const SelectorButton: FC<SelectorButtonProps> = ({ currentMode, buttonMode, onClick, children }) => {
    const isActive = currentMode === buttonMode;
    return <Button flexGrow={1} _focus={{ outline: 'none' }} onClick={() => onClick(buttonMode)} colorScheme={isActive ? "cyan" : "gray"} color={isActive ? "white" : "gray.500"} borderRadius={0}>{children}</Button>
}

export const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mode, setMode] = useState<loginMode>(searchParams.get("signup") === "true" ? "signup" : "signin");
    const toast = useToast();
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        if (mode === 'signup') {
            setSearchParams({ signup: "true" })
        } else {
            setSearchParams({})
        }
    }, [mode])

    return (
        <Box display="flex" flexDir="column" minH="100vh">
            <Header />
            <Box as="main" position="relative" padding="2rem 1rem" justifyContent="center" margin="3rem auto" alignItems="center" display="flex" flexDir="column" maxW="800px" border="0.5rem solid" borderColor="cyan.400" borderRadius="0.5rem">
                <Box display="flex" flexDirection="row" position="absolute" w="100%" top={0}>
                    <SelectorButton buttonMode="signin" currentMode={mode} onClick={setMode} >SignIn</SelectorButton>
                    <SelectorButton buttonMode="signup" currentMode={mode} onClick={setMode} >SignUp</SelectorButton>
                </Box>
                <Box display="flex" flexDirection="column" marginTop="2rem">
                    <Formik
                        initialValues={{ username: '', password: '', confirmPassword: '' }}
                        onSubmit={async (values) => {
                            let user = null
                            try {
                                if (mode === "signin") {
                                    user = await signin(values.username, values.password);
                                }
                                else {
                                    user = await signup(values.username, values.password);
                                }
                                setUser(user)
                                navigate('/', { replace: true })

                            }
                            catch (error: any) {
                                toast({
                                    title: 'Ups!',
                                    description: error.message,
                                    status: 'error',
                                    duration: 5000,
                                    position: 'bottom'
                                })
                            }
                        }}
                        validate={values => {
                            const errors: Record<string, string> = {};
                            if (!values.username) {
                                errors.username = 'Required';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            if (mode === "signup") {
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = 'Required';
                                }
                                if (values.password !== values.confirmPassword) {
                                    errors.confirmPassword = 'Passwords do not match';
                                }
                            }
                            return errors;
                        }}
                    >
                        {({
                            values,
                            isSubmitting,
                            handleChange,
                            isValid,

                        }) => (
                            <Form>
                                <Field>
                                    {(() => (
                                        <FormControl>
                                            <FormLabel htmlFor='username'>Username</FormLabel>
                                            <Input required id='username' type='text' value={values.username} onChange={handleChange} />
                                        </FormControl>
                                    ))}
                                </Field>
                                <Field>
                                    {(() => (
                                        <FormControl marginTop="1rem">
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            <Input required id='password' type='password' value={values.password} onChange={handleChange} />
                                        </FormControl>
                                    ))}
                                </Field>
                                {
                                    mode === "signup" ?
                                        <Field>
                                            {(() => (
                                                <FormControl marginTop="1rem">
                                                    <FormLabel htmlFor='confirmPassword'>Confirm your password</FormLabel>
                                                    <Input id='confirmPassword' type='password' value={values.confirmPassword} onChange={handleChange} />
                                                </FormControl>
                                            ))}
                                        </Field>
                                        :
                                        null
                                }
                                <Button
                                    marginTop="1rem"
                                    w="100%"
                                    colorScheme='cyan'
                                    color="white"
                                    isLoading={isSubmitting}
                                    type='submit'
                                    disabled={!isValid || isSubmitting}
                                >
                                    {mode === "signin" ? "Sign In" : "Sign Up"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}