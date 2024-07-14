import { Text } from "@/components/text";
import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={<Text size="lg">Admin Dasher App</Text>}
      formProps={{
        initialValues: {
          email: "michael.scott@dundermifflin.com",
          password: "demodemo",
        },
      }}
    />
  );
};
