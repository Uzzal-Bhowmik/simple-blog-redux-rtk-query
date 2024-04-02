import { Angry, Flame, Frown, Heart, ThumbsUp } from "lucide-react";
import { useAddReactionMutation } from "../redux/slices/blogsApiSlice";

const reactionIcons = {
  like: <ThumbsUp color="blue" />,
  love: <Heart color="#d12828" />,
  fire: <Flame color="orange" />,
  sad: <Frown color="tomato" />,
  angry: <Angry color="red" />,
};

const Reactions = ({ blog }) => {
  const { reactions } = blog;
  const [addReaction] = useAddReactionMutation();

  const handleAddReaction = async (reactionName) => {
    const updatedReactions = {
      ...reactions,
      [reactionName]: reactions[reactionName] + 1,
    };
    const updatedBlog = { ...blog, reactions: updatedReactions };

    try {
      await addReaction(updatedBlog);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center gap-6">
      {Object.keys(reactions).map((reactionName) => (
        <button
          key={reactionName}
          className="flex items-center gap-2"
          onClick={() => handleAddReaction(reactionName)}
        >
          <span>{reactionIcons[reactionName]}</span>
          <span className="text-base font-medium">
            {reactions[reactionName]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Reactions;
