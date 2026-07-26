import { useState } from "react";
import { getWords } from "../services/word.service.js";
import WordDetails from "../components/WordDetails.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

function WordsPage() {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm({});

  console.log(error);

  const handleSearch = async ({ word }) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getWords(word);
      if (data && data.words.length > 0) {
        setWord(data.words[0]);
      }
    } catch (error) {
      setError(error.message || "Word not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-muted pb-8">
      <div className="w-full md:w-3xl mx-auto">
        <div className=" p-4 bg-white rounded-none sm:rounded-2xl sm:mx-4 border">
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
        <div></div>
        {loading && (
          <div className=" w-full min-h-[50vh] flex items-center justify-center mt-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {word && !loading ? <WordDetails word={word} /> : null}
      </div>
    </section>
  );
}

export default WordsPage;
