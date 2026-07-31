import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import WordDetails from "../components/WordDetails.jsx";
import WatchlistDetails from "../components/WatchlistDetails.jsx";
import { getWords } from "../services/word.service.js";
import { getWatchlist } from "../services/watchlist.service.js";

function WordsPage() {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [currentTab, setCurrentTab] = useState("home");
  const { register, handleSubmit } = useForm({});

  const handleSearch = async ({ word }) => {
    try {
      setLoading(true);
      setCurrentTab("home");

      const { data } = await getWords(word);
      if (data && data.words.length > 0) {
        setWord(data.words[0]);
      }
    } catch (error) {
      console.error(error.message || "Word not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showWatchlist = async () => {
    try {
      setLoading(true);
      setCurrentTab("watchlist");

      const { data } = await getWatchlist();

      const watchlistWordsList = data.watchlist.map(({ word }) => {
        return word;
      });

      setWatchlist(watchlistWordsList.reverse());
    } catch (error) {
      console.error(
        error.message || "Failed to fetch watchlist. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-muted pb-8">
      <div className="w-full md:w-3xl mx-auto">
        <div className=" p-4 bg-white rounded-none sm:rounded-lg sm:mx-4 sm:my-2 border">
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="flex items-center justify-center gap-1"
          >
            <Input
              type="text"
              placeholder="Search for a word"
              className="focus:border-0 px-4"
              {...register("word", { required: true })}
            />
            <Button type="submit" className="ml-2 px-4 sm:px-8 sm:py-4">
              Search
            </Button>
          </form>
        </div>
        <div className=" p-4 border-t-0 sm:border-t bg-white rounded-none sm:rounded-lg sm:mx-4 border">
          <Button
            variant={currentTab === "home" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setCurrentTab("home")}
          >
            Home
          </Button>
          <Button
            variant={currentTab === "watchlist" ? "default" : "outline"}
            className="mr-2"
            onClick={() => showWatchlist()}
          >
            Watchlist
          </Button>
        </div>
        {loading && (
          <div className=" w-full min-h-[50vh] flex items-center justify-center mt-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {currentTab === "home" && word && !loading ? (
          <WordDetails word={word} />
        ) : null}
        {currentTab === "watchlist" && !loading ? (
          <WatchlistDetails watchlist={watchlist} />
        ) : null}
      </div>
    </section>
  );
}

export default WordsPage;
