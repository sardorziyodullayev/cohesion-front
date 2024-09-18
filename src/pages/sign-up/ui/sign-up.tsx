import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  Image,
  Select,
  Stepper,
  Group,
  Stack,
  Grid,
  useMantineTheme,
  Loader,
  ActionIcon,
  PasswordInput,
  Box,
  InputBase,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z, ZodError } from "zod";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload, IconTrash } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import ArrowLeftIcon from "shared/assets/icons/arrow-left.svg";
import SignInImage from "shared/assets/loginBg.png";
import classes from "./Sign-up.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAvailableInviteLink } from "@/entities/invite-link/model";
import { TLoaderOverlay } from "@/shared/ui";
import { useAttachActions } from "@/entities/attach/model";
import { useAuthActions } from "@/entities/auth/model";
import { setSession } from "@/shared/lib/helpers";

const PhoneNumberRegex = /^\+998\d{9}$/;

const formSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required").regex(PhoneNumberRegex, "Invalid phone number format"),
  email: z
    .string()
    .optional()
    .refine(value => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value), {
      message: "Invalid email address",
    }),
  gender: z.string().optional(),
});

const formFileSchema = z.object({
  name: z.string().min(1, "File is required"),
});

// Zod schema for password validation
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Parol harf, raqam va belgi bo'lishi kerak",
      })
      .nonempty({ message: "Parol kiriting" }), // Parolni kiritish majburiyligi
    confirmPassword: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
      .nonempty({ message: "Parolni qaytadan kiriting" }), // Confirm parolni kiritish majburiyligi
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Parol bir xil emas",
      });
    }
  });

export const SignUp = () => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef(null);

  const { upload } = useAttachActions();

  const { signup } = useAuthActions();

  const { inviteId = "" } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAvailableInviteLink(inviteId);
  // console.log(data);

  if (data && data?.statusCode && data?.statusCode !== 200) {
    // navigate(`signup/${inviteId}`);
    navigate("signin");
  }

  // Form for personal details
  const form = useForm({
    validate: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValues({
      surname: data?.data?.surname || "",
      name: data?.data?.name || "",
      phone: data?.data?.phone || "",
      email: data?.data?.email || "",
      gender: data?.data?.gender || "",
    });
  }, [data]);

  const formFile = useForm({
    validate: zodResolver(formFileSchema),
    initialValues: {
      name: "",
      file: null,
    },
  });

  // Form for password setup
  const formPassword = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(passwordSchema),
  });

  // Handle password form submission
  const handlePasswordSubmit = async (values: any) => {
    const signupData = {
      ...form.values,
      password: values.password,
      invitedLink: inviteId,
      photoUrl: formFile.values.name + ".jpg",
    };

    console.log(signupData);

    try {
      await signup.mutateAsync(signupData).then(e => {
        if (e?.data) {
          setSession(e.data);
          navigate("/home");
        }
      });
      nextStep();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle file delete
  const handleDelete = () => {
    setFile(null);
    formFile.setFieldValue("name", "");
  };

  const theme = useMantineTheme();
  const openRef = useRef(null);

  const nextStep = () => {
    setActive(current => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: typeof form.values) => {
    nextStep();
  };

  const handleFileSubmit = async (values: typeof formFile.values) => {
    nextStep();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      await upload.mutateAsync({ formData, name: values?.name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Grid gutter={0}>
        {isLoading && <TLoaderOverlay />}

        <Grid.Col span={{ base: 12, md: 6 }} className={classes.leftSide}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} mt="md" ta="center">
              Ro'yxatdan o'tish
            </Title>
            <Text my={15} fz="16px" ta="center">
              Quyidagi ma'lumotlarni to'ldiring
            </Text>

            <div>
              <Stepper
                allowNextStepsSelect={false}
                active={active}
                onStepClick={setActive}
                styles={{
                  separator: {
                    marginLeft: -2,
                    marginRight: -2,
                    height: 2,
                  },
                }}>
                <Stepper.Step>
                  <Box component="form" onSubmit={form.onSubmit(handleSubmit)} style={{ marginTop: "40px" }}>
                    <Stack gap={20}>
                      <TextInput label="Name" placeholder="Enter your name" {...form.getInputProps("name")} withAsterisk />
                      <TextInput label="Surname" placeholder="Enter your last name" {...form.getInputProps("surname")} withAsterisk />
                      <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps("email")} />
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
                      <Select
                        clearable
                        label="Gender"
                        placeholder="Choose your gender"
                        data={[
                          { value: "MALE", label: "Male" },
                          { value: "FEMALE", label: "Female" },
                        ]}
                        {...form.getInputProps("gender")}
                      />

                      <Stack mt="xl">
                        <Button type="submit">Continue</Button>
                        {active > 0 && (
                          <Button variant="default" onClick={prevStep}>
                            <Image src={ArrowLeftIcon} />
                            Go back
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Stepper.Step>

                <Stepper.Step>
                  <Box component="form" onSubmit={formFile.onSubmit(handleFileSubmit)} style={{ marginTop: "40px" }}>
                    <div className={classes.wrapperDropzone}>
                      <Dropzone
                        openRef={openRef}
                        onDrop={acceptedFiles => {
                          const selectedFile = acceptedFiles[0];
                          setFile(selectedFile);
                          formFile.setFieldValue("name", selectedFile?.name?.split(".")?.[0]);
                        }}
                        onReject={() => formFile.setFieldError("file", "Invalid file type or size")}
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}>
                        <div style={{ pointerEvents: "none" }}>
                          <Group justify="center">
                            {loading ? (
                              <Loader size="lg" />
                            ) : (
                              <>
                                <Dropzone.Accept>
                                  <IconDownload style={{ width: "40px", height: "40px" }} color={theme.colors.blue[6]} stroke={1.5} />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                  <IconX style={{ width: "40px", height: "40px" }} color={theme.colors.red[6]} stroke={1.5} />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                  <IconCloudUpload style={{ width: "40px", height: "40px" }} color={theme.colors.gray[4]} stroke={1.5} />
                                </Dropzone.Idle>
                              </>
                            )}
                          </Group>
                          <Text ta="center" fw={700} fz="lg" mt="xl">
                            {file?.name || "Select or upload an image"}
                          </Text>
                          <Text ta="center" fz="sm" mt="xs" c="dimmed">
                            Upload an image not larger than 5 MB. PNG, JPEG formats
                          </Text>
                        </div>
                      </Dropzone>
                      {formFile.errors.name && <p style={{ color: "red" }}>{formFile.errors.name}</p>}

                      <Group justify="center" mt="md">
                        {file?.name && (
                          <ActionIcon color="red" size="lg" variant="light" onClick={handleDelete}>
                            <IconTrash size="2rem" />
                          </ActionIcon>
                        )}
                      </Group>

                      <Stack mt="xl">
                        <Button type="submit">Continue</Button>
                        {active > 0 && (
                          <Button variant="default" onClick={prevStep}>
                            Go back
                          </Button>
                        )}
                      </Stack>
                    </div>
                  </Box>
                </Stepper.Step>

                {/* Password Step */}
                <Stepper.Step>
                  <form onSubmit={formPassword.onSubmit(handlePasswordSubmit)}>
                    <PasswordInput label="Set password" placeholder="Parol" {...formPassword.getInputProps("password")} withAsterisk />

                    <PasswordInput
                      mt="sm"
                      label="Re-enter the password"
                      placeholder="Password"
                      {...formPassword.getInputProps("confirmPassword")}
                      withAsterisk
                    />
                    <Stack mt="xl">
                      <Button type="submit">Continue</Button>
                      {active > 0 && (
                        <Button variant="default" onClick={prevStep}>
                          Go back
                        </Button>
                      )}
                    </Stack>
                  </form>
                </Stepper.Step>
              </Stepper>
            </div>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto" className={classes.rightSide}>
          <Image src={SignInImage} fit="cover" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
