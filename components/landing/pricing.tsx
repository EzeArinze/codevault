import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { pricing } from "@/utils/constants/constants";

function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that&apos;s right for you.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          {pricing.map((plan, index) => {
            return (
              <div
                className={`flex flex-col rounded-lg border shadow-sm ${
                  plan.popular ? "bg-primary/5 border-primary/20 relative" : ""
                }`}
                key={index}
              >
                {plan.popular ? (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{plan.plan}</h3>
                  <div className="mt-4 text-4xl font-bold">{plan.price}</div>
                  <p className="mt-2 text-muted-foreground">
                    {plan.price_description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    {plan.start_with}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
