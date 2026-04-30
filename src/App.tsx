import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage.tsx"));
const LeadershipPage = lazy(() => import("./pages/LeadershipPage.tsx"));
const ObjectivesPage = lazy(() => import("./pages/ObjectivesPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const JoinPage = lazy(() => import("./pages/JoinPage.tsx"));
const DonatePage = lazy(() => import("./pages/DonatePage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const RouteLoadingFallback = () => (
  <div className="container-editorial flex min-h-[40vh] items-center justify-center py-16 text-sm text-muted-foreground">
    Loading...
  </div>
);

const App = () => (
  <SiteContentProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Suspense fallback={<RouteLoadingFallback />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </SiteContentProvider>
);

export default App;
