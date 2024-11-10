import React, { useEffect, useState } from "react";
import FooterLayout from "./FooterLayout";
import Cookie from "js-cookie";
import { useToast } from "@chakra-ui/react";

const ProtectedLayout = ({ children }) => {
  const toast = useToast();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const token = Cookie.get("access_Token");
      if (!token) {
        setSessionExpired(true);

        Cookie.remove("access_Token");

        toast({
          title: "Sesi habis.",
          description: "Sesi Anda sudah habis. Silakan Masuk kembali.",
          status: "warning",
          duration: 1000,
          isClosable: true,
          position: "bottom-right",
        });

        setTimeout(() => {
          window.location.href = "/masuk";
        }, 1000);
      }
    };

    const interval = setInterval(checkSession, 2000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <>
      <div className="content-container">{children}</div>
      <FooterLayout />
    </>
  );
};

export default ProtectedLayout;
