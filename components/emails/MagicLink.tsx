import { encrypt } from "@/lib/auth";
import { Button, Html, Body, Text } from "@react-email/components";
import * as React from "react";

export const MagicLink = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const jwt = await encrypt({ email }, "1h");
  const link = `${process.env.SERV_URL}/checkEmail/${jwt}`;

  return (
    <Html>
      <Body>
        <Text>Hello {name}</Text>
        <Button
          href={link}
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        >
          Click me
        </Button>
      </Body>
    </Html>
  );
};

export default MagicLink;
