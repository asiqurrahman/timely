"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import AppContainer from "@/components/organisms/AppContainer";
import { Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const GlobalNavBarWrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid grey;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .nav-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .site-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      img {
        width: 35px;
        height: 35px;
      }

      p {
        font-family: "Rubik Doodle Triangles";
        font-size: 28px;
      }
    }

    .logged-in-view {
      .avatar-icon {
        width: 42px;
        height: 42px;
      }
    }
  }
`;

const GlobalNavBar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <GlobalNavBarWrapper>
      <AppContainer>
        <div className="nav-container">
          <div className="site-logo">
            <img src="/images/site-logo.png" alt="test" />
            <p>Timely</p>
          </div>
          {user ? (
            <div className="logged-in-view">
              <Avatar
                name={user.name}
                src={user.photoURL}
                size="md"
                className="avatar-icon"
                onClick={handleSignOut}
              />
            </div>
          ) : (
            <div className="auth-actions">
              <Button colorScheme="blue" size="md" onClick={handleSignIn}>
                Log in{" "}
              </Button>
            </div>
          )}

          {/* <ul className="flex">
            <li className="p-2 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/about">About</Link>
            </li>

            {!user ? null : (
              <li className="p-2 cursor-pointer">
                <Link href="/profile">Profile</Link>
              </li>
            )}
          </ul>

          {loading ? null : !user ? (
            <ul className="flex">
              <li onClick={handleSignIn} className="p-2 cursor-pointer">
                Login
              </li>
              <li onClick={handleSignIn} className="p-2 cursor-pointer">
                Sign up
              </li>
            </ul>
          ) : (
            <div>
              <p>Welcome, {user.displayName}</p>
              <p className="cursor-pointer" onClick={handleSignOut}>
                Sign out
              </p>
            </div>
          )} */}
        </div>
      </AppContainer>
    </GlobalNavBarWrapper>
  );
};

export default GlobalNavBar;
