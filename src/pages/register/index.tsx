import { Text } from "@/components/text";
import { AuthPage } from "@refinedev/antd";

export const Register = () => {
  return (
    <AuthPage title={<Text size="lg">Admin Dasher App</Text>} type="register" />
  );
};
