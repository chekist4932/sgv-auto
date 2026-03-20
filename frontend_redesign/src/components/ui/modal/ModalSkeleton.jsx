export const ModalSkeleton = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#11131B] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative animate-pulse">
            {/* Header Skeleton */}
            <div className="p-6 flex justify-between items-start">
                <div className="space-y-3 w-full">
                    <div className="h-8 bg-white/10 rounded-md w-1/3"></div>
                    <div className="flex gap-3">
                        <div className="h-6 bg-white/10 rounded-md w-24"></div>
                        <div className="h-6 bg-white/10 rounded-md w-48"></div>
                    </div>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 px-6 pb-6 pt-4">
                {/* Image Gallery Skeleton */}
                <div className="space-y-4">
                    <div className="aspect-video bg-white/5 rounded-lg w-full"></div>
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-video bg-white/5 rounded-md"></div>
                        ))}
                    </div>
                </div>

                {/* Info Skeleton */}
                <div className="space-y-6">
                    <div className="h-24 bg-white/5 rounded-lg w-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-white/5 rounded w-full"></div>
                        <div className="h-4 bg-white/5 rounded w-5/6"></div>
                        <div className="h-4 bg-white/5 rounded w-4/6"></div>
                    </div>
                    <div className="h-12 bg-white/10 rounded-full w-full mt-auto"></div>
                </div>
            </div>
        </div>
    </div>
);