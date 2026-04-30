import { useState } from "react";
import { Building, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Donate = () => {
  const { content } = useSiteContent();
  const donate = content.donate;
  const [amount, setAmount] = useState<number | "">(donate.presets[1] ?? donate.presets[0] ?? 10000);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(donate.accountNumber);
    setCopied(true);
    toast.success("Account number copied", {
      description: "Paste it into your banking app to complete your gift.",
    });
    setStatus("Account number copied to clipboard.");
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!amount || Number(amount) < 500) {
      toast.error("Please enter at least NGN 500 to pledge");
      setStatus("Donation pledge failed: amount must be at least NGN 500.");
      return;
    }

    const formatted = `NGN ${Number(amount).toLocaleString()}`;
    toast.success(`Pledge received: ${formatted}`, {
      description: "Complete your gift via bank transfer using the details on the left.",
    });
    setStatus(`Pledge of ${formatted} recorded. Please complete the bank transfer.`);
  };

  return (
    <section id="donate" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">{donate.eyebrow}</div>
            <h2 className="h-section text-4xl leading-tight text-foreground lg:text-5xl">{donate.heading}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{donate.description}</p>

            <div className="mt-10 border border-border bg-card p-7">
              <div className="flex items-center gap-3 text-foreground">
                <Building className="h-5 w-5 text-primary" />
                <div className="h-section text-xl">Bank Details</div>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Account Name</dt>
                  <dd className="font-medium text-foreground">{donate.accountName}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Bank</dt>
                  <dd className="font-medium text-foreground">{donate.bankName}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Account Number</dt>
                  <dd className="flex items-center gap-3">
                    <span className="font-medium tracking-wider text-foreground">{donate.accountNumber}</span>
                    <button onClick={handleCopy} aria-label="Copy account number" className="text-primary hover:text-primary-deep">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-border bg-card p-8 lg:col-span-7 lg:p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Choose an amount</div>
            <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
              {donate.presets.map((preset) => {
                const active = amount === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`h-12 border text-sm font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/60"
                    }`}
                  >
                    NGN {preset.toLocaleString()}
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="custom">
                Custom amount (NGN)
              </label>
              <Input
                id="custom"
                type="number"
                min={500}
                value={amount}
                onChange={(event) => setAmount(event.target.value === "" ? "" : Number(event.target.value))}
                className="mt-3 h-12 rounded-sm"
                placeholder="Enter amount"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Full Name</label>
                <Input className="mt-3 h-12 rounded-sm" placeholder="Your name" required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email or Phone</label>
                <Input className="mt-3 h-12 rounded-sm" placeholder="you@example.com" required />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-8 h-13 w-full rounded-sm bg-rally py-4 text-sm font-semibold tracking-wide text-destructive-foreground hover:bg-rally/90"
            >
              Pledge {amount ? `NGN ${Number(amount).toLocaleString()}` : "Donation"}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">{donate.pledgeNote}</p>
            <p role="status" aria-live="polite" className="sr-only">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
