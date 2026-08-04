import { useState, useEffect } from "react";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlist.service.js";

// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Volume2, ChevronLeft } from "lucide-react";

function CategoriesDetails({ categories }) {
  const [showWords, setShowWords] = useState("");
  const [showCategories, setShowCategories] = useState(true);

  const WordCard = ({ word, category }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const playAudio = (word) => {
      if (!word.audio) return;

      const audio = new Audio(word.audio);
      audio.play();
    };

    useEffect(() => {
      const checkIfBookmarked = async () => {
        try {
          const { data } = await getWatchlist();

          const isWordInWatchlist = data.watchlist.some(
            ({ word: wordFromWatchlist }) => {
              return word.id === wordFromWatchlist.id;
            },
          );

          setIsBookmarked(isWordInWatchlist);
        } catch (error) {
          console.error(`Error checking watchlist: ${error.message}`);
        }
      };

      checkIfBookmarked();
    });

    const handleWatchlistToggle = async (word) => {
      setIsBookmarked((prev) => !prev);
      try {
        if (isBookmarked) {
          await removeFromWatchlist(word.id);
        } else if (!isBookmarked) {
          await addToWatchlist(word.id);
        }
      } catch (error) {
        console.error(`Error from watchlist: ${error.message}`);
      }
    };

    return (
      <Card
        className={`h-fit rounded-sm sm:rounded-lg mb-2 md:mt-4 ${showWords === category.id ? "block" : "hidden"}`}
        key={word.id}
      >
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
              onClick={() => handleWatchlistToggle(word)}
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

  const CategoryCard = ({ category }) => {
    const handleCategoryClick = (id) => {
      setShowCategories(false);
      setShowWords(id);
    };

    return (
      <>
        <Card
          className={`w-full rounded-lg my-2 ${showCategories ? "block" : "hidden"}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <CardHeader>
            <CardTitle className="capitalize">
              <h1 className="text-2xl font-bold capitalize">{category.name}</h1>
            </CardTitle>
          </CardHeader>
        </Card>

        {category.words &&
          category.words.map((word) => (
            <WordCard word={word} category={category} />
          ))}
      </>
    );
  };

  return (
    <div className="px-4">
      <div className="w-full flex justify-end">
        {showWords && (
          <Button
            variant="outline"
            onClick={() => {
              setShowWords("");
              setShowCategories(true);
            }}
            className="mt-2 mb-4"
          >
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>
      {categories && categories.length > 0 ? (
        <ul className="">
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No words in categories.</p>
      )}
    </div>
  );
}

export default CategoriesDetails;
