import React from "react";
import Layout from "@theme/Layout";
import IDDFramework from "../components/IDDFramework";

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Intent-Driven Development"
      description="A Post-Scrum Operating System for AI-Native Teams"
    >
      <IDDFramework />
    </Layout>
  );
}
