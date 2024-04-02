import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const AuthorCard = ({ author }) => {
  const { authorId: id, authorName, authorPic } = author;

  return (
    <Card className="transition-all duration-300 ease-in-out hover:border-slate-500 hover:shadow-lg">
      <CardHeader className="flex flex-col items-center gap-4 md:flex-row">
        <Avatar className="h-32 w-32">
          <AvatarFallback className="uppercase">
            {authorName?.slice(0, 2)}
          </AvatarFallback>
          <AvatarImage src={authorPic} className="rounded-full" />
        </Avatar>

        <div>
          <h1 className="mb-2">{authorName}</h1>
          <CardDescription className="text-base">
            View all blogs by{" "}
            <Link to={`/author/${id}`} className="underline">
              {authorName}
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AuthorCard;
