import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getWords } from "../services/word.service.js";
import PageLoader from "../components/PageLoader.jsx";
import WordDetails from "../components/WordDetails.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function WordsPage() {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(null);
  const { register, handleSubmit } = useForm({});
  const { word: searchWord } = useParams();
  const navigate = useNavigate();

  const handleSearch = ({ word }) => {
    setWord(null);
    navigate(`/${word}`);
  };

  useEffect(() => {
    getWords(searchWord)
      .then(({ data }) => {
        setWord(data.words[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchWord]);

  if (loading) {
    return <PageLoader />;
  }

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
        {word ? <WordDetails word={word} /> : <div>Word not found</div>}
      </div>
    </section>
  );
}

export default WordsPage;
