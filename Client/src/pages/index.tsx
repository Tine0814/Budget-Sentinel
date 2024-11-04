import { LoginFormBlock } from "@/components";
import PublicLayout from "@/components/templates/PublicLayout";

export default function Home() {
  return (
    <>
      <LoginFormBlock />
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
