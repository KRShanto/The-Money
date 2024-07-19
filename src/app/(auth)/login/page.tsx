import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SubmitButton from "./SubmitButton";
import Password from "@/components/form/Password";
import Or from "@/components/form/Or";
import Google from "@/components/form/Google";
import Links from "@/components/form/Links";
import Link from "next/link";
import ForgotLink from "./ForgotLink";

export default function Page() {
  return (
    <Form title="Login Account" fullStyle>
      <Input label="Your Email" type="email" name="email" />
      <Password label="Your Password" name="password" />
      <SubmitButton />

      <Links>
        <ForgotLink />
        <Link href="/register">Create Account</Link>
      </Links>

      <Or />

      <Google />
    </Form>
  );
}
