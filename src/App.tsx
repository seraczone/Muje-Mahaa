import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminPage from "./pages/AdminPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import AchievementsPage from "./pages/AchievementsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import Index from "./pages/Index.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import LeadershipPage from "./pages/LeadershipPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ObjectivesPage from "./pages/ObjectivesPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/objectives" element={<ObjectivesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SiteContentProvider>
  </QueryClientProvider>
);

export default App;
