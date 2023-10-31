import { useEffect, useState } from "react";
import { getAll, create } from "@/services/diaryService";
import { format } from "date-fns";
import { TDiary, TVisibility } from "./types/diary";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { cn } from "./lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

const Flights = ({ data }: { data: TDiary[] }) => {
  return (
    <div className="grid grid-cols-3 gap-x-10 gap-y-5">
      {data?.map((item: TDiary) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className={cn("font-black")}>Flight {item.id}</CardTitle>
            <CardDescription className={cn("font-bold")}>
              {format(new Date(item.date), "MMM dd - yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className={cn("text-base")}>Comment</CardTitle>
            <CardDescription>{item.comment}</CardDescription>
          </CardContent>
          <CardFooter className={cn("flex flex-row gap-x-6 text-center")}>
            <div>
              <CardTitle className={cn("text-base")}>Weather</CardTitle>
              <CardDescription>{item.weather}</CardDescription>
            </div>
            <div>
              <CardTitle className={cn("text-base")}>Visibility</CardTitle>
              <CardDescription>{item.visibility}</CardDescription>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export type TWeather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

const NewRecord = () => {
  const [weather, setWeather] = useState<TWeather>();
  const [visibility, setVisibility] = useState<TVisibility>();
  const [date, setDate] = useState<Date>();
  const [comment, setComment] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const submitRecord = () => {
    if (weather && visibility && date && comment) {
      create({
        weather,
        visibility,
        date: date.toISOString(),
        comment,
      }).catch((err) => {
        setError(err.message);
      });
    }
  };

  useEffect(() => {
    if (weather && visibility && date && comment) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [weather, visibility, date, comment]);

  return (
    <div className="py-10">
      {error && (
        <div className="bg-red-500 text-white text-center py-2 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={submitRecord} className="grid grid-cols-5 gap-x-5">
        <Select
          onValueChange={(value) => {
            setVisibility(value as TVisibility);
          }}
        >
          <SelectTrigger
            className={cn("w-[180px] bg-card-foreground text-secondary")}
          >
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="great">Great</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="ok">Ok</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setWeather(value as TWeather);
          }}
        >
          <SelectTrigger
            className={cn("w-[180px] bg-card-foreground text-secondary")}
          >
            <SelectValue placeholder="Weather" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sunny">Sunny</SelectItem>
            <SelectItem value="rainy">Rainy</SelectItem>
            <SelectItem value="cloudy">Cloudy</SelectItem>
            <SelectItem value="stormy">Stormy</SelectItem>
            <SelectItem value="windy">Windy</SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => {
            setDate(new Date(e.target.value));
          }}
          className={cn("w-[180px] bg-card-foreground text-secondary")}
          type="date"
          name="date"
          placeholder="Date"
        />
        <Input
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className={cn("w-[180px] bg-card-foreground text-secondary")}
          type="text"
          name="comment"
          placeholder="Comment"
        />
        <Button
          className={cn(
            !isValid && "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
          )}
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

function App() {
  const [data, setData] = useState<TDiary[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAll();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Expected result to be an array, but received:", result);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center min-h-screen justify-center ">
      <div className="w-1/2">
        <h1 className="text-4xl font-black py-4 underline">Flight Diary</h1>
        <NewRecord />
        <Flights data={data} />
      </div>
    </div>
  );
}

export default App;
