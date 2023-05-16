const CommentCard = ({ comment }) => {
  return (
    <>
      <div className="flex flex-col p-3 mt-2 mb-2 border border-solid border-purple-300 w-96 h-16 rounded-lg">
        <div id="" className="text-gray-600 h-16 text-xs text-clamp">
          {comment}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
