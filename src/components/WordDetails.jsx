import { useState } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../services/watchlist.service.js";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Volume2 } from "lucide-react";

function WordDetails({ word }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const playAudio = () => {
    if (!word.audio) return;

    const audio = new Audio(word.audio);
    audio.play();
  };

  const handleWatchlistToggle = async () => {
    try {
      if (isBookmarked) {
        await removeFromWatchlist(word.id);
        setIsBookmarked(false);
      } else if (!isBookmarked) {
        await addToWatchlist(word.id);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error(`Error toggling watchlist: ${error.message}`);
    }
  };

  return (
    <Card className="h-fit rounded-none sm:rounded-lg sm:m-4 md:mt-4">
      <CardContent className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold capitalize">{word.word}</h1>
              {word.audio && (
                <Button size="icon" variant="outline" onClick={playAudio}>
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{word.partOfSpeech}</Badge>

              {word.translations?.hi && (
                <Badge variant="secondary">Hindi: {word.translations.hi}</Badge>
              )}
            </div>
          </div>

          <button
            size="icon"
            variant="none"
            className=""
            onClick={() => handleWatchlistToggle()}
          >
            <Bookmark
              className="size-6"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>

        <Separator />

        {/* Definition */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">Definition</h2>
          <p className="text-muted-foreground">{word.definition}</p>
        </section>
        <Separator />
        {/* Examples */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">Examples</h2>

          {word.examples?.length ? (
            <ul className="list-disc space-y-2 pl-5">
              {word.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No examples available.</p>
          )}
        </section>

        <Separator />

        {/* Synonyms */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">Synonyms</h2>

          {word.synonyms?.length ? (
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((synonym) => (
                <Badge key={synonym} variant="outline">
                  {synonym}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No synonyms available.</p>
          )}
        </section>

        <Separator />

        {/* Antonyms */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">Antonyms</h2>

          {word.antonyms?.length ? (
            <div className="flex flex-wrap gap-2">
              {word.antonyms.map((antonym) => (
                <Badge key={antonym} variant="destructive">
                  {antonym}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No antonyms available.</p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}

export default WordDetails;
