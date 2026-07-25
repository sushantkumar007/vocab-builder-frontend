import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Volume2 } from "lucide-react";

function WordDetails({ word }) {
  const playAudio = () => {
    if (!word.audio) return;

    const audio = new Audio(word.audio);
    audio.play();
  };

  return (
    <Card className="h-fit rounded-none sm:rounded-2xl sm:m-4 md:mt-4">
      <CardContent className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold capitalize">{word.word}</h1>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{word.partOfSpeech}</Badge>

              {word.translations?.hi && (
                <Badge variant="secondary">Hindi: {word.translations.hi}</Badge>
              )}
            </div>
          </div>

          {word.audio && (
            <Button size="icon" variant="outline" onClick={playAudio}>
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
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
