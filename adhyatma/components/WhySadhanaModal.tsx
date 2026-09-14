"use client";

import React from "react";

interface WhySadhanaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Falling leaves background, same effect used behind other modals on the site
const FallingLeavesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes fallingLeaf {
          0% { transform: translate(0, -10vh) rotate(0deg) scale(0.8); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translate(100px, 100vh) rotate(720deg) scale(1.2); opacity: 0; }
        }
      `}</style>

      {[...Array(15)].map((_, i) => {
        const size = (i % 3) * 10 + 15;
        const left = (i * 7.5) % 100;
        const duration = (i % 5) * 4 + 15;
        const delay = (i % 4) * 3;

        return (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-amber-400 to-amber-600/50 rounded-tl-full rounded-br-full rounded-tr-sm rounded-bl-sm blur-[2px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: "-10%",
              animation: `fallingLeaf ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default function WhySadhanaModal({
  isOpen,
  onClose,
}: WhySadhanaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      {/* Falling leaves behind everything, across the whole blurred backdrop */}
      <FallingLeavesBackground />

      <div className="bg-[#FAF7F2] border border-stone-300 rounded-3xl max-w-2xl w-full shadow-2xl relative z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-8 md:px-10 pt-8 pb-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-900">
            Why Sadhana?
          </h3>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-8 md:px-10 py-6 overflow-y-auto text-stone-700 leading-relaxed space-y-4 text-[15px] md:text-base">
          <p>I&apos;m Srijan.</p>

          <p>
            I&apos;m building Adhyatma because I feel there is something our
            generation needs , not another notification, another productivity
            hack, or another place to endlessly scroll, Trust me it would change
            everything.
          </p>

          <p>Something quieter.</p>

          <p>Something that brings us back to ourselves.</p>

          <p>
            We live in a world where a phone can tell us what happened on the
            other side of the planet in seconds, yet sometimes we don&apos;t
            know what is happening inside us.
          </p>

          <p>
            We can speak to hundreds of people, but struggle to sit alone with
            our own thoughts, 2 min with us feele like like 100 years.
          </p>

          <p>
            We wake up to notifications, spend our days jumping between screens,
            conversations, deadlines and distractions, and go to sleep with a
            mind that is still running.
          </p>

          <p>
            And somewhere between all this noise, there is a part of us that
            simply wants to be still.
          </p>

          <p>
            That is where <strong className="text-amber-900">Sadhana</strong>{" "}
            begins.
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            Not another habit. A return.
          </h4>

          <p>Think of your mind like a lake.</p>

          <p>
            When the wind keeps blowing, the surface is restless. You can see
            movement everywhere, but you cannot see what lies beneath.
          </p>

          <p>Our lives can feel the same.</p>

          <p>
            Thoughts become the wind.
            <br />
            Notifications become the ripples.
            <br />
            Worries become the waves.
          </p>

          <p>Sadhana doesn&apos;t ask you to stop living in the world.</p>

          <p>It simply gives the lake a few moments of stillness.</p>

          <p>
            And when the water becomes quiet, something beautiful happens —{" "}
            <strong className="text-amber-900">
              you begin to see clearly.
            </strong>
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            A mantra is more than a word.
          </h4>

          <p>Imagine carrying a small lamp through a dark room.</p>

          <p>The lamp doesn&apos;t change the room.</p>

          <p>It simply gives you enough light to see where you are going.</p>

          <p>A mantra can become that lamp.</p>

          <p>
            With repetition, <strong className="text-amber-900">japa</strong>{" "}
            gives the wandering mind somewhere to return.
            <br />
            With <strong className="text-amber-900">meditation</strong>, we
            learn to sit with ourselves instead of constantly escaping
            ourselves.
            <br />
            With <strong className="text-amber-900">pranayama</strong>, we
            discover something we carry every second but rarely notice — the
            breath.
          </p>

          <p>Three simple practices.</p>

          <p>
            Yet together, they can create a space within you that the outside
            world cannot easily disturb.
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            Sadhana is not about becoming someone else.
          </h4>

          <p>It is about remembering who you are beneath all the noise.</p>

          <p>You don&apos;t need to become a monk.</p>

          <p>You don&apos;t need to disappear into the mountains.</p>

          <p>You don&apos;t need an hour of perfect silence every morning.</p>

          <p>Perhaps it is five minutes before college.</p>

          <p>Perhaps it is a few rounds of japa before sleep.</p>

          <p>
            Perhaps it is simply closing your eyes and taking ten conscious
            breaths when the day feels overwhelming.
          </p>

          <p>
            Because spirituality doesn&apos;t always arrive with temple bells
            and incense.
          </p>

          <p>
            Sometimes, it arrives quietly —{" "}
            <strong className="text-amber-900">
              in one breath, one mantra, one moment of awareness.
            </strong>
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            And consistency matters.
          </h4>

          <p>A single drop of water seems insignificant.</p>

          <p>But drop after drop, it can fill a vessel.</p>

          <p>A single day of meditation may not transform your life.</p>

          <p>Neither will one morning of japa.</p>

          <p>But return to it tomorrow.</p>

          <p>And the day after.</p>

          <p>And again.</p>

          <p>
            That is <strong className="text-amber-900">sadhana</strong>.
          </p>

          <p>Not perfection.</p>

          <p>
            <strong className="text-amber-900">Returning.</strong>
          </p>

          <p>
            Just as an athlete trains the body every day, sadhana trains
            something far more subtle — the ability to steady the mind, become
            aware of the self, and remain grounded through the changing seasons
            of life.
          </p>

          <p>Some days you will feel peaceful.</p>

          <p>Some days your mind will refuse to sit still.</p>

          <p>Some days you will forget altogether.</p>

          <p>That&apos;s okay.</p>

          <p>The path was never about never falling away.</p>

          <p>
            <strong className="text-amber-900">
              It was always about returning.
            </strong>
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            Why Adhyatma?
          </h4>

          <p>
            I wanted to create a place where spirituality doesn&apos;t feel
            distant, complicated, or reserved for another generation.
          </p>

          <p>
            A place where someone discovering their first mantra feels as
            welcome as someone who has been practising for years.
          </p>

          <p>Where ancient wisdom can meet a modern life.</p>

          <p>
            Where technology doesn&apos;t become another source of distraction —
            but a gentle reminder to pause.
          </p>

          <p>Adhyatma is my attempt to build that little space.</p>

          <p>
            A space to{" "}
            <strong className="text-amber-900">
              remember the breath. remember the mantra. remember the stillness.
              and perhaps, slowly, remember yourself.
            </strong>
          </p>

          <p>Because maybe the journey we keep searching for outside...</p>

          <p>
            <strong className="text-amber-900">
              was waiting quietly within us all along.
            </strong>
          </p>

          <h4 className="text-lg font-bold text-stone-900 pt-2">
            Begin where you are.
          </h4>

          <p>No perfect morning required.</p>

          <p>No special place required.</p>

          <p>Just a willingness to pause.</p>

          <p>Take a breath.</p>

          <p>And begin.</p>

          <p>
            <strong className="text-amber-900">
              That is enough for today.
            </strong>
          </p>
        </div>

        {/* Sticky footer button */}
        <div className="px-8 md:px-10 py-6 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-full bg-[#2B231D] text-white font-medium text-lg hover:bg-stone-800 transition"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  );
}
