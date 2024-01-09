"use client";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";

export default withAuthenticator(function Home({
  signOut,
  user,
}: WithAuthenticatorProps) {
  return <div>Hello {user?.username}</div>;
});
