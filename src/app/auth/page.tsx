"use client";
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import config from '../../amplifyconfiguration.json';

Amplify.configure(config);

export default withAuthenticator(function Home({
  signOut,
  user,
}: WithAuthenticatorProps) {
  return <div>Hello {user?.username}</div>;
});
