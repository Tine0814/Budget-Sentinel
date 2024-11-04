import { QueryClient, QueryClientProvider } from "react-query";
// import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { HeaderTitleContextProvider } from "@/core/context/HeaderTitleContext";
import { AtomToast } from "@/components";
import {
  AuthProvider,
  ThemeToggleContextProvider,
  ToastProvider,
} from "@/core/context";

interface Props {}

const GlobalLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  // const theme = useTheme();
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <AtomToast autoClose={5000} hideProgressBar={false} />
          <HeaderTitleContextProvider>
            {/* <ThemeProvider theme={theme}> */}
            <ThemeToggleContextProvider>{children}</ThemeToggleContextProvider>
            {/* </ThemeProvider> */}
          </HeaderTitleContextProvider>
        </QueryClientProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default GlobalLayout;
