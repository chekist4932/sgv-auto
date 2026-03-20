import { useMemo } from "react";
import { parseCarInfo } from '~/lib/catalog_page/utils'


export const InfoSpecs = ({ rawInfo }) => {
    const specs = useMemo(() => parseCarInfo(rawInfo), [rawInfo]);

    if (!specs.length) return null;

    return (
        <div className="space-y-4 h-full">
            {specs.map((section, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h5 className="text-primary-red font-bold text-sm uppercase tracking-wider mb-3">
                        {section.title}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {section.items.map((item, i) => (
                            <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                                <span className="text-zinc-500 text-xs">{item.key}</span>
                                <span className="text-white text-xs text-right ml-4">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};