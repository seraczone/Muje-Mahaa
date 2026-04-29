import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const LGAS = [
  "Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona",
  "Lafia", "Nasarawa", "Nasarawa Eggon", "Obi", "Toto", "Wamba",
];

const joinSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100, "Name too long"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?234|0)[0-9]{10}$/, "Enter a valid Nigerian phone number")
    .max(20),
  lga: z.string().min(1, "Select your local government"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type Errors = Partial<Record<keyof z.infer<typeof joinSchema>, string>>;

export const Join = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lga, setLga] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { name: string; lga: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    // Simulate submission
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setConfirmed({ name: result.data.name, lga: result.data.lga });
    toast.success("Welcome to MUJE MAHA", {
      description: `Thank you, ${result.data.name.split(" ")[0]}. Our ${result.data.lga} coordinator will reach out shortly.`,
    });

    // Reset form fields
    setName("");
    setPhone("");
    setLga("");
    setConsent(false);
  };

  return (
    <section id="join" className="bg-secondary/40 py-24 lg:py-32 border-y border-border">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Join the Movement</div>
            <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
              Stand with Nasarawa. Add your name to the movement.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              MUJE MAHA is built by everyday citizens. Register as a supporter and
              your local coordinator will be in touch with how to get involved in
              your community.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-foreground/80">
              {[
                "Receive briefings from your LGA coordinator",
                "Volunteer at rallies and town halls",
                "Help mobilise voters in your ward",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            {confirmed ? (
              <div
                role="status"
                aria-live="polite"
                className="border border-primary/30 bg-card p-8 lg:p-10"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="h-section text-2xl mt-5 text-foreground">
                  You're in, {confirmed.name.split(" ")[0]}.
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Your registration for <strong className="text-foreground">{confirmed.lga}</strong> LGA has been received.
                  A coordinator will reach out within 48 hours.
                </p>
                <Button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="mt-7 bg-primary hover:bg-primary-deep text-primary-foreground rounded-sm h-11 px-6 text-sm font-semibold"
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
                  <div id="join-form-title" className="h-section text-xl">Supporter Registration</div>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label htmlFor="join-name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Full name
                    </label>
                    <Input
                      id="join-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "join-name-err" : undefined}
                      className="mt-3 h-12 rounded-sm"
                      placeholder="e.g. Aisha Mohammed"
                    />
                    {errors.name && (
                      <p id="join-name-err" className="mt-2 text-xs text-rally">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="join-phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Phone number
                    </label>
                    <Input
                      id="join-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={20}
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "join-phone-err" : undefined}
                      className="mt-3 h-12 rounded-sm"
                      placeholder="08012345678"
                    />
                    {errors.phone && (
                      <p id="join-phone-err" className="mt-2 text-xs text-rally">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="join-lga" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Local government
                    </label>
                    <select
                      id="join-lga"
                      value={lga}
                      onChange={(e) => setLga(e.target.value)}
                      aria-invalid={!!errors.lga}
                      aria-describedby={errors.lga ? "join-lga-err" : undefined}
                      className="mt-3 h-12 w-full rounded-sm border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select your LGA</option>
                      {LGAS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    {errors.lga && (
                      <p id="join-lga-err" className="mt-2 text-xs text-rally">{errors.lga}</p>
                    )}
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-3">
                  <Checkbox
                    id="join-consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "join-consent-err" : undefined}
                    className="mt-0.5"
                  />
                  <label htmlFor="join-consent" className="text-sm text-foreground/80 leading-relaxed cursor-pointer">
                    I agree to be contacted by MUJE MAHA coordinators about events,
                    voter education and volunteer opportunities.
                  </label>
                </div>
                {errors.consent && (
                  <p id="join-consent-err" className="mt-2 text-xs text-rally">{errors.consent}</p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 w-full h-12 bg-primary hover:bg-primary-deep text-primary-foreground rounded-sm text-sm font-semibold tracking-wide disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Register as Supporter"}
                </Button>
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Your details are kept private and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
