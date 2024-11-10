import { useEffect } from "react";
import { useRouter } from "next/router";
import { oAuthLogin } from "@/module/auth/aoauthLogin";

const LoginRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await oAuthLogin();
      if (userData) {
        console.log(userData);
      }
    };

    fetchUsers();
  }, [router]);

  return <div>Loading...</div>;
};

export default LoginRedirect;
