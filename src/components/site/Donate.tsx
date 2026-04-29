import { useState } from "react";
import { Building, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PRESETS = [5000, 10000, 25000, 50000, 100000];

export const Donate = () => {
  const [amount, setAmount] = useState<number | "">(10000);
  const [copied, setCopied] = useState(false);

  const [status, setStatus] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText("0123456789");
    setCopied(true);
    toast.success("Account number copied", { description: "Paste it into your banking app to complete your gift." });
    setStatus("Account number copied to clipboard.");
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) < 500) {
      toast.error("Please enter at least ₦500 to pledge");
      setStatus("Donation pledge failed: amount must be at least ₦500.");
      return;
    }
    const formatted = `₦${Number(amount).toLocaleString()}`;
    toast.success(`Pledge received: ${formatted}`, {
      description: "Complete your gift via bank transfer using the details on the left.",
    });
    setStatus(`Pledge of ${formatted} recorded. Please complete the bank transfer.`);
  };

  return (
    <section id="donate" className="bg-background py-24 lg:py-32">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Support the Movement</div>
            <h2 className="h-section text-4xl lg:text-5xl text-foreground leading-tight">
              Power our mission. Fund the future of Nasarawa.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Your contribution funds grassroots organising, voter education and direct
              community impact across all 13 LGAs.
            </p>

            <div className="mt-10 border border-border bg-card p-7">
              <div className="flex items-center gap-3 text-foreground">
                <Building className="h-5 w-5 text-primary" />
                <div className="h-section text-xl">Bank Details</div>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Account Name</dt>
                  <dd className="font-medium text-foreground">MUJE MAHA Initiative</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Bank</dt>
                  <dd className="font-medium text-foreground">First Bank of Nigeria</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-muted-foreground">Account Number</dt>
                  <dd className="flex items-center gap-3">
                    <span className="font-medium text-foreground tracking-wider">0123456789</span>
                    <button
                      onClick={handleCopy}
                      aria-label="Copy account number"
                      className="text-primary hover:text-primary-deep"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 border border-border bg-card p-8 lg:p-10"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Choose an amount</div>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {PRESETS.map((p) => {
                const active = amount === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className={`h-12 text-sm font-semibold border transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:border-primary/60"
                    }`}
                  >
                    ₦{p.toLocaleString()}
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="custom">
                Custom amount (₦)
              </label>
              <Input
                id="custom"
                type="number"
                min={500}
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-3 h-12 rounded-sm"
                placeholder="Enter amount"
              />
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
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
              className="mt-8 w-full h-13 py-4 bg-rally hover:bg-rally/90 text-destructive-foreground rounded-sm text-sm font-semibold tracking-wide"
            >
              Pledge {amount ? `₦${Number(amount).toLocaleString()}` : "Donation"}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Secure pledge — confirm via bank transfer using the details provided.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
