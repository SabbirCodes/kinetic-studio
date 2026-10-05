export interface CaseStudy {
  client: string;
  services: string[];
  duration: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "fieldnote-coffee": {
    client: "Fieldnote Coffee",
    services: ["Branding", "Web Design", "Web Development"],
    duration: "10 weeks",
    challenge:
      "Fieldnote sold good coffee through a generic online shop. Customers forgot to reorder, and the brand looked like every other roaster.",
    solution:
      "We built the identity and the site around one idea: coffee arrives just as you run out. A delivery calendar, simple plan controls and a warmer visual voice made subscribing the default choice.",
    results: [
      { value: "+64%", label: "Orders in four months" },
      { value: "2.1x", label: "Subscription signups" },
      { value: "-38%", label: "Churn after month three" },
    ],
  },
  "altura-fitness": {
    client: "Altura Fitness",
    services: ["Performance Marketing", "Landing Pages", "Analytics"],
    duration: "Ongoing, 8 months",
    challenge:
      "Paid social was bringing in clicks but not trials. Each signup cost $38, which made growth unaffordable.",
    solution:
      "We rebuilt tracking first, then tested creative and landing pages weekly. Winning variants were scaled and losing audiences were cut within days, not months.",
    results: [
      { value: "$14", label: "Cost per trial signup" },
      { value: "-63%", label: "Acquisition cost" },
      { value: "3.4x", label: "Return on ad spend" },
    ],
  },
  "halcyon-bank": {
    client: "Halcyon Bank",
    services: ["UX Research", "Web Design", "Web Development"],
    duration: "12 weeks",
    challenge:
      "Opening an account took nine screens, and almost half of applicants gave up before finishing.",
    solution:
      "We interviewed applicants, cut the flow to three clear steps, and rewrote every form label in plain language. The compliance team signed off on the first round.",
    results: [
      { value: "+41%", label: "Completed applications" },
      { value: "3 steps", label: "Down from nine screens" },
      { value: "-52%", label: "Support calls about signup" },
    ],
  },
  "tidewater-travel": {
    client: "Tidewater Travel",
    services: ["SEO", "Content Strategy", "Analytics"],
    duration: "Ongoing, 18 months",
    challenge:
      "The blog was an afterthought with about 8,000 monthly visits and no connection to bookings.",
    solution:
      "We mapped the questions travellers ask before booking, built topic clusters around them, and fixed the technical issues that were holding rankings back.",
    results: [
      { value: "120k", label: "Monthly organic visits" },
      { value: "15x", label: "Traffic growth" },
      { value: "#1", label: "Booking channel by revenue" },
    ],
  },
};