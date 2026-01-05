"use client";

import { useState } from "react";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import { Separator } from "~/app/_components/ui/separator";
import { Search } from "lucide-react";
import type { Card } from "~/types/card";
import { motion, AnimatePresence } from "motion/react";

const allCards: Card[] = [
  // TODO: load from backend
  { id: 1, name: "Fire Dragon", mana: 5, image: "/cards/fire-dragon.jpg" },
  { id: 2, name: "Water Spirit", mana: 3, image: "/cards/water-spirit.jpg" },
  { id: 3, name: "Earth Golem", mana: 6, image: "/cards/earth-golem.jpg" },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 4,
    name: `Card ${i + 4}`,
    mana: i,
    image: `/cards/placeholder-${(i % 5) + 1}.jpg`,
  })),
];

export default function DeckBuilderClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deckName, setDeckName] = useState("My Awesome Deck");
  const [deckCards, setDeckCards] = useState<typeof allCards>([]);
  const [deckCardCounts, setDeckCardCounts] = useState<Record<number, number>>(
    {},
  );

  const filteredCards = allCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addToDeck = (card: Card) => {
    // Simple limit: max 60 cards, allow duplicates if your game rules permit
    if (deckCards.length >= 60) return;

    // Max duplicates limited to 3
    const currentCount = deckCardCounts[card.id] ?? 0;
    if (currentCount >= 3) {
      // TODO: add shake animation to tell the user that reached the max amount of cards with that id instad of console log, plus, an alert message on the top of the screen
      console.log("already has 3");
      return;
    }

    setDeckCards([...deckCards, card]);
    setDeckCardCounts({ ...deckCardCounts, [card.id]: currentCount + 1 });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-4">
        {/* Left Sidebar - Card Collection */}
        <aside className="border-r border-purple-900 bg-black/20 lg:col-span-1">
          <div className="sticky top-0 z-10 border-b border-purple-900 bg-inherit p-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-purple-700 bg-purple-900/30 pl-10 focus:border-purple-500"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-88px)]">
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-2">
              {filteredCards.map((card) => (
                <Button
                  key={card.id}
                  variant="ghost"
                  className="h-auto p-2 transition-all hover:bg-purple-800/50"
                  onClick={() => addToDeck(card)}
                >
                  <div className="relative aspect-3/4 w-full">
                    <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-purple-600 bg-gray-800 text-xs">
                      <div className="text-center">
                        <div className="font-bold">{card.name}</div>
                        <div className="text-purple-400">Mana: {card.mana}</div>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Deck Area */}
        <main className="p-6 lg:col-span-3 lg:p-12">
          <div className="mx-auto max-w-5xl">
            {/* Deck Name */}
            <div className="mb-8 flex flex-row gap-2">
              <Input
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="border-none bg-transparent p-2 font-bold underline-offset-4 focus:underline focus:ring-0"
                placeholder="Enter deck name..."
                style={{ fontSize: "2rem" }}
              />
              <p
                className={`align-bottom text-lg text-nowrap ${deckCards.length < 40 ? "text-gray-400" : ""}`}
              >
                {deckCards.length} / 60 cards
              </p>
            </div>

            <Separator className="mb-8 bg-purple-800" />

            {/* Deck Grid - 5 columns on large screens */}
            {deckCards.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <p className="mb-4 text-2xl">Your deck is empty</p>
                <p>Click cards on the left to add them to your deck</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <AnimatePresence mode="popLayout">
                  {Object.entries(deckCardCounts).map(([cardIdStr, count]) => {
                    const cardId = Number(cardIdStr);
                    // Find the card object from allCards (or from deckCards — both work)
                    const card =
                      allCards.find((c) => c.id === cardId) ??
                      deckCards.find((c) => c.id === cardId);

                    if (!card) return null;

                    return (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ opacity: 0, rotate: -15, y: 100, x: -50 }}
                        animate={{ opacity: 1, rotate: 0, y: 0, x: 0 }}
                        exit={{ opacity: 1, scale: 0.8, y: -30 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        className="group relative"
                        // Click removes ONE copy
                        onClick={() => {
                          const cardId = card.id;
                          const currentCount = deckCardCounts[cardId] ?? 0;
                          const newCount = currentCount - 1;

                          if (currentCount <= 0) return; // safety guard

                          // Find and remove one instance from the deckCards array
                          const index = deckCards.findIndex(
                            (c) => c.id === card.id,
                          );

                          if (index === -1) return;

                          setDeckCards(deckCards.filter((_, i) => i !== index));

                          // Update counts
                          setDeckCardCounts((prev) => {
                            if (newCount <= 0) {
                              const newCounts = { ...prev };
                              delete newCounts[card.id];
                              return newCounts;
                            }
                            return {
                              ...prev,
                              [card.id]: newCount,
                            };
                          });
                        }}
                      >
                        <div className="aspect-3/4 cursor-pointer rounded-lg border-2 border-purple-700 bg-gray-900 transition-all hover:border-red-600">
                          <div className="flex h-full flex-col items-center justify-center p-2">
                            <div className="line-clamp-2 text-center text-sm font-semibold">
                              {card.name}
                            </div>
                            <div className="mt-1 text-xs text-purple-400">
                              Mana: {card.mana}
                            </div>
                          </div>

                          {/* Count Badge - only show if > 1 */}
                          {count > 1 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.4,
                                scale: {
                                  type: "spring",
                                  visualDuration: 0.4,
                                  bounce: 0.5,
                                },
                              }}
                              className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-800/90 text-sm font-bold text-white shadow-lg"
                            >
                              x{count}
                            </motion.div>
                          )}

                          {/* Remove Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-900/70 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="font-bold text-white">Remove</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Save Deck Button (TODO: wire this to tRPC later) */}
            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-purple-700 px-12 hover:bg-purple-600"
              >
                Save Deck
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
