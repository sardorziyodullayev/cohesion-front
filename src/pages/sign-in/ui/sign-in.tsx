import { PasswordInput, Button, Title, Image, Box, Grid, InputBase, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import SignInImage from "shared/assets/loginBg.png";
import { IMaskInput } from "react-imask";
import classes from "./Sign-in.module.css";
import { useForm } from "@mantine/form";
import { TLogin } from "@/shared/lib/types";
import { useAuthActions } from "@/entities/auth/model";
import { notifyError, setSession } from "@/shared/lib/helpers";

export const SignIn = () => {
  const phoneInputRef = useRef(null);

  const { Login } = useAuthActions();

  useEffect(() => {
    setSession(null);
  }, []);

  const handleSubmit = async (value: TLogin) => {
    try {
      await Login.mutateAsync(value);
    } catch (error) {
      notifyError(error);
    }
  };

  const PhoneNumberRegex = /^\+998\d{9}$/;

  const form = useForm({
    initialValues: {
      phone: "",
      password: "",
    },
    validate: {
      phone: value => (PhoneNumberRegex.test(value) ? null : "Invalid phone number format"),
      password: value => {
        if (value.length < 8) {
          return "Password must be at least 8 characters long";
        }

        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return "Password must contain at least one special symbol";
        }

        return null;
      },
    },
  });

  return (
    <Box className={classes.loginContainer}>
      <Grid gutter={0}>
        <Grid.Col span={{ base: 12, md: 6 }} className={classes.leftSide}>
          <Box>
            <Title className={classes.title}>Login to account</Title>

            <Text size="md" my={15} mb={25}>
              Enter your phone number and password to access the account
            </Text>

            <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap={20}>
                <InputBase
                  label="Phone number"
                  component={IMaskInput}
                  mask="{+998} 00 000 00 00"
                  unmask
                  ref={phoneInputRef}
                  {...form.getInputProps("phone")}
                  {...{ lazy: false, placeholderChar: " " }}
                  onAccept={value => {
                    if (typeof value === "string") form.getInputProps("phone").onChange(value, value.length === 13);
                  }}
                />

                <PasswordInput label="Password" placeholder="Enter your password" {...form.getInputProps("password")} />

                <Button type="submit" loading={Login.status === "pending"} mt="sm">
                  Login
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span="auto" className={classes.rightSide}>
          <Image src={SignInImage} fit="cover" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
