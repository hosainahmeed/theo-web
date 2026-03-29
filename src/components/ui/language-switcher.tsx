"use client"
import { useLanguageContext } from '@/contexts/language-context';
import { locales } from '@/i18n';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setLanguageLoading } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    // Close dropdown
    setIsOpen(false);

    // Show loading overlay
    setLanguageLoading(true);

    // Small delay to ensure overlay is visible
    setTimeout(() => {
      const segments = pathname.split('/');
      segments[1] = newLocale;
      const newPath = segments.join('/');
      router.push(newPath);

      // Hide loading overlay after navigation
      setTimeout(() => {
        setLanguageLoading(false);
      }, 500);
    }, 100);
  };

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      en: 'English',
      fr: 'Français'
    };
    return labels[lang] || lang.toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-105"
      >
        <Globe size={18} />
        <span className="text-sm font-medium hidden sm:block">
          {getLanguageLabel(locale)}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              disabled={lang === locale}
              className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors duration-200 ${lang === locale
                  ? 'bg-blue-50 text-blue-600 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span className="font-medium">{getLanguageLabel(lang)}</span>
              {lang === locale && (
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
