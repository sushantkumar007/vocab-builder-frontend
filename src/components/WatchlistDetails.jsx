import { useState } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../services/watchlist.service.js";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Bookmark } from "lucide-react";

function WatchlistDetails({ watchlist }) {
  const WatchlistCard = ({ word }) => {
    const [isBookmarked, setIsBookmarked] = useState(true);

    const playAudio = (word) => {
      if (!word.audio) return;

      const audio = new Audio(word.audio);
      audio.play();
    };

    const handleWatchlistToggle = async () => {
      setIsBookmarked((prev) => !prev);
      try {
        if (isBookmarked) {
          await removeFromWatchlist(word.id);
        } else if (!isBookmarked) {
          await addToWatchlist(word.id);
        }
      } catch (error) {
        console.log(`Error removing from watchlist: ${error.message}`);
      }
    };

    return (
      <Card className="h-fit rounded-sm sm:rounded-lg md:mt-4">
        <CardContent className="">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold capitalize">{word.word}</h1>
                {word.audio && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => playAudio(word)}
                  >
                    <Volume2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="mt-4 flex  gap-2">
                <Badge>{word.partOfSpeech}</Badge>
                {word.translations?.hi && (
                  <Badge variant="secondary">
                    Hindi: {word.translations.hi}
                  </Badge>
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
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="px-4 py-2">
      {watchlist && watchlist.length > 0 ? (
        <ul className="">
          {watchlist.map((word) => (
            <li key={word.id} className="mb-2">
              <WatchlistCard word={word} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No words in watchlist.</p>
      )}
    </div>
  );
}

export default WatchlistDetails;
