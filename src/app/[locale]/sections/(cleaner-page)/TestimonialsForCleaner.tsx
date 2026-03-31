import AnimatedButton from "@/components/ui/animated-button"
import { IMAGE } from "@/constant/image.index"
import Image from "next/image"
import { useTranslations } from 'next-intl'

function TestimonialsForCleaner() {
    const t = useTranslations('testimonialsForCleaner');

    return (
        <div className="bg-linear-to-b py-12 from-[#0088FF] to-[#180047]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    <Image src={IMAGE.testimonials} alt="Testimonials" width={1200} height={600} className="w-full h-auto" />
                </div>
                <div className="xl:-mt-16 flex items-center justify-center flex-col space-y-2">
                    <div className="text-center">
                        <div className="text-center text-white">{t('testimonials')}</div>
                        <h2 className="text-3xl font-semibold text-center text-white">{t('title')}</h2>
                        <p className="text-sm text-slate-300 mt-2 pb-8 text-center">{t('subtitle')}</p>
                    </div>
                    <AnimatedButton buttonText={t('joinAsHost')} variant="secondary" />
                </div>
            </div>
        </div>
    )
}

export default TestimonialsForCleaner