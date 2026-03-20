import { useMemo } from "react";
import { parseCarInfo } from '~/lib/catalog_page/utils'


export const InfoSpecs = ({ rawInfo }) => {
    const specs = useMemo(() => parseCarInfo(rawInfo), [rawInfo]);

    if (!specs || specs.length === 0) return null;

    return (
        <div className="space-y-4">
            {specs.map((section, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    {section.title && (
                        <h5 className="text-primary-red font-bold text-xs uppercase tracking-wider mb-3 opacity-80">
                            {section.title}
                        </h5>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {section.items.map((item, i) => (
                            <div
                                key={i}
                                className={`flex pb-1 border-b border-white/5 ${item.key ? "justify-between" : "justify-start"
                                    }`}
                            >
                                {item.key && (
                                    <span className="text-zinc-500 text-[11px] leading-relaxed mr-2">
                                        {item.key}
                                    </span>
                                )}
                                <span className={`text-white text-[11px] leading-relaxed ${!item.key ? "before:content-['•'] before:mr-2 before:text-primary-red" : "text-right"
                                    }`}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};