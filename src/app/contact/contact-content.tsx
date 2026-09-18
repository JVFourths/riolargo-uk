"use client";

import { m } from "motion/react";
import { Mail } from "lucide-react";
import { Reveal, rise, revealTransition } from "@/components/motion-config";
import { CONTACT_EMAIL } from "@/lib/endpoints";

const topics = [
  {
    title: "About the oils",
    body: "Which label suits what you cook, how to store it, how long it keeps.",
    subject: "A question about Rio Largo olive oil",
  },
  {
    title: "About an order",
    body: "Orders are placed with Sidwell's, so have your order number to hand.",
    subject: "My Rio Largo order",
  },
  {
    title: "Wholesale",
    body: "Want to stock Rio Largo in your shop, restaurant or deli? Tell us about the business.",
    subject: "Rio Largo wholesale enquiry",
  },
];

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactContent() {
  return (
    <div className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container-page">
        <m.header
          initial="hidden"
          animate="visible"
          variants={rise}
          transition={revealTransition}
        >
          <h1 className="h1">
            Write to us, <span className="italic text-fox">we write back</span>
          </h1>
          <p className="lede mt-8">
            Rio Largo is looked after in the UK by Sidwell&apos;s. Email them and
            a person will reply.
          </p>
          <a href={mailto("Rio Largo olive oil")} className="btn btn-primary mt-10 gap-2">
            <Mail size={18} strokeWidth={1.75} aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </m.header>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="border-b border-rule">
              {topics.map((topic) => (
                <li
                  key={topic.title}
                  className="flex flex-col gap-3 border-t border-rule py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div>
                    <h2 className="font-display text-2xl font-semibold leading-tight">
                      {topic.title}
                    </h2>
                    <p className="mt-2 max-w-md text-ink-muted">{topic.body}</p>
                  </div>
                  <a href={mailto(topic.subject)} className="link shrink-0 font-semibold">
                    Email us
                    <span className="sr-only"> {topic.title.toLowerCase()}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <dl className="border-b border-rule">
              <div className="border-t border-rule py-6">
                <dt className="label text-leaf">In the UK</dt>
                <dd className="mt-2 text-ink-muted">
                  Sidwell&apos;s
                  <br />
                  124 City Road
                  <br />
                  London, EC1V 2NX
                </dd>
              </div>
              <div className="border-t border-rule py-6">
                <dt className="label text-leaf">The estate</dt>
                <dd className="mt-2 text-ink-muted">
                  Rio Largo Olive Estate
                  <br />
                  Scherpenheuwel Valley, Breede River
                  <br />
                  Western Cape, South Africa
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
