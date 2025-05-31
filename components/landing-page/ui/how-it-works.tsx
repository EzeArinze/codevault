import { how_it_works } from "@/utils/constants/landing-page-constants";

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple & Efficient
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              CodeVault streamlines your workflow in just a few simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {how_it_works.map((works) => {
            return (
              <div
                className="flex flex-col items-center space-y-4"
                key={works.id}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  {works.id}
                </div>
                <h3 className="text-xl font-bold">{works.title}</h3>
                <p className="text-center text-muted-foreground">
                  {works.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
