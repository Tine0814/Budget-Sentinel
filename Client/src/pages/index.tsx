import { LoginFormBlock, PublicLayout } from "@/components";
import { AuthGuard } from "@/core/routing";

export default function Home() {
  return (
    <AuthGuard>
      <LoginFormBlock />
    </AuthGuard>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
