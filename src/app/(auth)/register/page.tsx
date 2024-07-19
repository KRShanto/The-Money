import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import SubmitButton from "./SubmitButton";
import Password from "@/components/form/Password";
import Links from "@/components/form/Links";
import Link from "next/link";
import Or from "@/components/form/Or";
import Google from "@/components/form/Google";

export default function Page() {
  return (
    <>
      <Form title="Register Account" fullStyle>
        <Input label="Your Name" type="text" name="name" required />
        <Input label="Your Email" type="email" name="email" required />
        <Password label="Your Password" name="password" />
        <SubmitButton />

        <Links>
          <Link href="/login">Login Account</Link>
        </Links>

        <Or />

        <Google />
      </Form>
    </>
  );
}
