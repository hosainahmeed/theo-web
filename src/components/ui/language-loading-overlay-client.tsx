"use client"
import {useLanguageContext} from "@/contexts/language-context";
import LanguageLoadingOverlay from "@/components/ui/language-loading-overlay";

export default function LanguageLoadingOverlayClient() {
  const {isLanguageLoading} = useLanguageContext();
  
  return <LanguageLoadingOverlay isLoading={isLanguageLoading} />;
}
