"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import AppContainer from "@/components/organisms/AppContainer";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

import ProjectFeed from "./ProjectFeed";

interface User {
  name: string;
}

const DashBoardWrapper = styled.div`
  margin-top: 3rem;

  .main-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .home-title {
    font-size: 40px;

    .title {
      font-family: "Poppins", sans-serif;
    }
  }
`;

const DashBoard = () => {
  const { user } = UserAuth();

  if (!user) {
    // Handle the case where 'user' is not available, maybe redirect to login?
    return <div>Loading...</div>;
  }

  return (
    <DashBoardWrapper>
      <AppContainer className="main-container">
        <div className="home-title">
          <Heading as="h2" size="lg" className="title">
            Welcome back {user.name} 👋
          </Heading>
        </div>
        <ProjectFeed />
      </AppContainer>
    </DashBoardWrapper>
  );
};

export default DashBoard;
