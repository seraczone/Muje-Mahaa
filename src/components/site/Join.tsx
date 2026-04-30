import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const joinSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100, "Name too long"),
  phone: z.string().trim().regex(/^(\+?234|0)[0-9]{10}$/, "Enter a valid Nigerian phone number").max(20),
  lga: z.string().min(1, "Select your local government"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type Errors = Partial<Record<keyof z.infer<typeof joinSchema>, string>>;

export const Join = () => {
  const { content } = useSiteContent();
  const join = content.join;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lga, setLga] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { name: string; lga: string }>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const result = joinSchema.safeParse({ name, phone, lga, consent });
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please correct the highlighted fields");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setConfirmed({ name: result.data.name, lga: result.data.lga });
    toast.success("Welcome to Muje Maha Support Group", {
      description: `Thank you, ${result.data.name.split(" ")[0]}. Our ${result.data.lga} coordinator will reach out shortly.`,
    });

    setName("");
    setPhone("");
    setLga("");
    setConsent(false);
  };

  return (
    <section id="join" className="border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div className="container-editorial">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">{join.eyebrow}</div>
            <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{join.heading}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{join.description}</p>

            <ul className="mt-8 space-y-4 text-sm text-foreground/80">
              {join.benefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            {confirmed ? (
              <div role="status" aria-live="polite" className="border border-primary/30 bg-card p-8 lg:p-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-5 h-section text-2xl text-foreground">You're in, {confirmed.name.split(" ")[0]}.</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Your registration for <strong className="text-foreground">{confirmed.lga}</strong> LGA has been received.
                  A coordinator will reach out within 48 hours.
                </p>
                <Button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="mt-7 h-11 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-deep"
                >
                  Register another supporter
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-border bg-card p-8 lg:p-10"
                aria-labelledby="join-form-title"
              >
                <div className="flex items-center gap-3 text-foreground">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <div id="join-form-title" className="h-section text-xl">
                    Supporter Registration
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="join-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Full name
                    </label>
                    <Input
                      id="join-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={100}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "join-name-err" : undefined}
                      className="mt-3 h-12 rounded-sm"
                      placeholder="e.g. Aisha Mohammed"
                    />
                    {errors.name && <p id="join-name-err" className="mt-2 text-xs text-rally">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="join-phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Phone number
                    </label>
                    <Input
                      id="join-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      maxLength={20}
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "join-phone-err" : undefined}
                      className="mt-3 h-12 rounded-sm"
                      placeholder="08012345678"
                    />
                    {errors.phone && <p id="join-phone-err" className="mt-2 text-xs text-rally">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="join-lga" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Local government
                    </label>
                    <select
                      id="join-lga"
                      value={lga}
                      onChange={(event) => setLga(event.target.value)}
                      aria-invalid={!!errors.lga}
                      aria-describedby={errors.lga ? "join-lga-err" : undefined}
                      className="mt-3 h-12 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select your LGA</option>
                      {join.lgas.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.lga && <p id="join-lga-err" className="mt-2 text-xs text-rally">{errors.lga}</p>}
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-3">
                  <Checkbox
                    id="join-consent"
                    checked={consent}
                    onCheckedChange={(value) => setConsent(value === true)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "join-consent-err" : undefined}
                    className="mt-0.5"
                  />
                  <label htmlFor="join-consent" className="cursor-pointer text-sm leading-relaxed text-foreground/80">
                    I agree to be contacted by Muje Maha Support Group coordinators about events, voter education and volunteer opportunities.
                  </label>
                </div>
                {errors.consent && <p id="join-consent-err" className="mt-2 text-xs text-rally">{errors.consent}</p>}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 h-12 w-full rounded-sm bg-primary text-sm font-semibold tracking-wide text-primary-foreground hover:bg-primary-deep disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Register as Supporter"}
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">{join.privacyText}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
