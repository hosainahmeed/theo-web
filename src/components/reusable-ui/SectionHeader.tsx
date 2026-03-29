
interface SectionHeaderProps {
    tag?: string;
    title?: string;
    subTitle?: string;
    tagColor?: string;
    titleColor?: string;
    subTitleColor?: string;
    pillBackground?: string;
    pillBorderColor?: string;
    highlightText?: string;
    className?: string;
}

function SectionHeader({
    tag,
    title = '',
    subTitle = '',
    tagColor = '#0088FF',
    titleColor = '#154098',
    subTitleColor = 'rgba(0,0,0,0.4)',
    pillBackground = 'rgba(0,136,255,0.06)',
    pillBorderColor = 'rgba(0,136,255,0.22)',
    highlightText,
    className = '',
}: SectionHeaderProps) {
    const renderTitle = () => {
        if (!title) return null;
        
        if (highlightText) {
            const parts = title.split(new RegExp(`(${highlightText})`, 'gi'));
            return (
                <h1 className="text-2xl font-e sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: titleColor }}>
                    {parts.map((part, index) => 
                        part.toLowerCase() === highlightText.toLowerCase() ? (
                            <span key={index} style={{ color: tagColor }}>
                                {part}
                            </span>
                        ) : (
                            part
                        )
                    )}
                </h1>
            );
        }
        
        return (
            <h1 className="text-2xl font-e sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: titleColor }}>
                {title}
            </h1>
        );
    };

    return (
        <div className={`text-center mb-12 ${className}`}>
            {tag && (
                <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border"
                    style={{
                        background: pillBackground,
                        borderColor: pillBorderColor,
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: tagColor }}
                        aria-hidden="true"
                    />
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: tagColor }}>
                        {tag}
                    </span>
                </div>
            )}
            {renderTitle()}
            {subTitle && (
                <p className="text-black/40 max-w-2xl text-sm md:text-base mx-auto" style={{ color: subTitleColor }}>
                    {subTitle}
                </p>
            )}
        </div>
    );
}

export default SectionHeader;