import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet } from "react-router"
import IntroSplash from "../Components/Intro/IntroSplash"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IntroSplash duration={2000} logoSrc="/images/intro_logo.png" />
      <Outlet />
    </QueryClientProvider>
  )
}