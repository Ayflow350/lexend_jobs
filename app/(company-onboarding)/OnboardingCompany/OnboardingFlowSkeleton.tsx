import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyOnboardingFlowSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
      {/* Top Banner Skeleton */}
      <Skeleton className="h-[37px] w-full" />

      <main className="flex-grow flex flex-col items-center justify-start pt-8 sm:pt-10 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl xl:max-w-5xl">
          {/* Progress Bar and Step Counter Skeleton */}
          <div className="mb-10 md:mb-16">
            <div className="flex justify-between items-center mb-2.5">
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-1 w-full" />
          </div>

          {/* Main Content Area Skeleton */}
          <div className="min-h-[400px] md:min-h-[450px]">
            {/* This mirrors the two-column layout of many of your steps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
              {/* Left Column: Guidance Text */}
              <div className="space-y-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-4/5" />
              </div>

              {/* Right Column: Form Inputs */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-11 w-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="sticky bottom-0 bg-white dark:bg-card border-t border-border p-4 shadow-sm">
        <div className="container mx-auto max-w-4xl xl:max-w-5xl flex justify-between items-center">
          <Skeleton className="h-11 w-24" />
          <Skeleton className="h-11 w-40" />
        </div>
      </footer>
    </div>
  );
}
